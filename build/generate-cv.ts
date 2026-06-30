import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises'
import { extname, join } from 'node:path'
import { load as parseYaml } from 'js-yaml'
import pdfMake from 'pdfmake'
import { renderCvPdf } from './cv-pdf'
import type { CvEducation, CvExperience, CvInput, CvProfile, CvProject } from './cv-pdf'
import type { SkillCategory } from '../shared/utils/skills'
import type { Languages } from '../shared/types/languages'

interface RuntimeConfig {
  cvPhone?: string
  cvAddress?: string
  cvBirthDate?: string
  public: {
    cvName: string
    cvEmail: string
    cvWebsite: string
    cvGithub: string
    cvLinkedIn: string
  }
}

const LOCALES: Languages[] = ['en', 'de']

function configureFonts(rootDir: string) {
  const fontsDir = join(rootDir, 'node_modules/pdfmake/fonts/Roboto')
  pdfMake.setFonts({
    Roboto: {
      normal: join(fontsDir, 'Roboto-Regular.ttf'),
      bold: join(fontsDir, 'Roboto-Medium.ttf'),
      italics: join(fontsDir, 'Roboto-Italic.ttf'),
      bolditalics: join(fontsDir, 'Roboto-MediumItalic.ttf'),
    },
  })
  pdfMake.setLocalAccessPolicy(path => path.startsWith(fontsDir))
  pdfMake.setUrlAccessPolicy(() => false)
}

async function loadPhoto(rootDir: string, photoPath: string): Promise<{ image: string, width: number } | null> {
  try {
    const absolutePath = join(rootDir, 'public', photoPath.replace(/^\//, ''))
    const ext = extname(absolutePath).toLowerCase()
    const buffer = await readFile(absolutePath)
    const mime = ext === '.png' ? 'image/png' : 'image/jpeg'
    return { image: `data:${mime};base64,${buffer.toString('base64')}`, width: 165 }
  } catch {
    return null
  }
}

function parseFrontmatter(raw: string): Record<string, unknown> {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return {}
  return (parseYaml(match[1] ?? '') as Record<string, unknown>) ?? {}
}

async function readCollection(dir: string): Promise<Record<string, unknown>[]> {
  let files: string[]
  try {
    files = (await readdir(dir)).filter(name => name.endsWith('.md'))
  } catch {
    return []
  }
  return Promise.all(files.map(async name => parseFrontmatter(await readFile(join(dir, name), 'utf8'))))
}

const byDateDesc = (a: { dateEnd: string, dateStart: string }, b: { dateEnd: string, dateStart: string }) =>
  b.dateEnd.localeCompare(a.dateEnd) || b.dateStart.localeCompare(a.dateStart)

function makeTranslator(messages: Record<string, unknown>) {
  return (key: string): string => {
    const value = key.split('.').reduce<unknown>((node, part) => (node as Record<string, unknown>)?.[part], messages)
    return typeof value === 'string' ? value : key
  }
}

async function buildLocale(rootDir: string, locale: Languages, config: RuntimeConfig): Promise<CvInput> {
  const contentDir = join(rootDir, 'content', locale)

  const [profileRaw, experienceRaw, educationRaw, projectsRaw, skillsRaw, messagesRaw] = await Promise.all([
    readFile(join(contentDir, 'profile.md'), 'utf8'),
    readCollection(join(contentDir, 'experience')),
    readCollection(join(contentDir, 'education')),
    readCollection(join(contentDir, 'projects')),
    readFile(join(contentDir, 'skills.yml'), 'utf8'),
    readFile(join(rootDir, 'i18n', 'locales', `${locale}.json`), 'utf8'),
  ])

  const profile = parseFrontmatter(profileRaw) as unknown as CvProfile
  const categories = ((parseYaml(skillsRaw) as { categories?: SkillCategory[] })?.categories) ?? []

  const experience = (experienceRaw as unknown as (CvExperience & { featured?: boolean })[])
    .sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false) || byDateDesc(a, b))
  const education = (educationRaw as unknown as CvEducation[]).sort(byDateDesc)
  const projects = (projectsRaw as unknown as CvProject[]).sort(byDateDesc)

  return {
    locale,
    t: makeTranslator(JSON.parse(messagesRaw)),
    profile,
    experience,
    education,
    projects,
    categories,
    photo: await loadPhoto(rootDir, '/images/me.jpg'),
    cv: {
      name: config.public.cvName,
      email: config.public.cvEmail,
      website: config.public.cvWebsite,
      github: config.public.cvGithub,
      linkedin: config.public.cvLinkedIn,
      phone: config.cvPhone || undefined,
      address: config.cvAddress || undefined,
      birthDate: config.cvBirthDate || undefined,
    },
  }
}

export async function generateCvPdfs(rootDir: string, config: RuntimeConfig): Promise<void> {
  configureFonts(rootDir)
  const outDir = join(rootDir, 'server', 'assets', 'cv')
  await mkdir(outDir, { recursive: true })

  for (const locale of LOCALES) {
    const input = await buildLocale(rootDir, locale, config)
    if (!input.profile?.headline) throw new Error(`CV profile for "${locale}" is missing or invalid`)
    const pdf = await renderCvPdf(input)
    await writeFile(join(outDir, `${locale}.pdf`), pdf)
  }
}
