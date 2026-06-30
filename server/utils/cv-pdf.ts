import { readFile } from 'node:fs/promises'
import { extname, join } from 'node:path'
import type { H3Event } from 'h3'
import pdfMake from 'pdfmake'

const fontsDir = join(process.cwd(), 'node_modules/pdfmake/fonts/Roboto')

const fonts = {
  Roboto: {
    normal: join(fontsDir, 'Roboto-Regular.ttf'),
    bold: join(fontsDir, 'Roboto-Medium.ttf'),
    italics: join(fontsDir, 'Roboto-Italic.ttf'),
    bolditalics: join(fontsDir, 'Roboto-MediumItalic.ttf'),
  },
}

pdfMake.setFonts(fonts)
// Fonts are read from a fixed, trusted path on disk; everything else (remote
// URLs, other local files) stays denied since docDefinition content is built
// entirely from our own content data.
pdfMake.setLocalAccessPolicy(path => path.startsWith(fontsDir))
pdfMake.setUrlAccessPolicy(() => false)

export function assertCvAccess(event: H3Event) {
  if (process.env.NODE_ENV !== 'production') return
  const expectedKey = useRuntimeConfig(event).cvAccessKey
  const providedKey = getQuery(event).key
  console.log({
    expectedKey,
    providedKey,
  })
  if (!expectedKey || providedKey !== expectedKey) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
}

async function loadPhoto(photoPath?: string): Promise<{ svg: string, width: number } | { image: string, width: number } | null> {
  if (!photoPath) return null
  try {
    const absolutePath = join(process.cwd(), 'public', photoPath.replace(/^\//, ''))
    const ext = extname(absolutePath).toLowerCase()
    const buffer = await readFile(absolutePath)
    const mime = ext === '.png' ? 'image/png' : 'image/jpeg'
    return { image: `data:${mime};base64,${buffer.toString('base64')}`, width: 165 }
  } catch (e) {
    console.log(e)
    return null
  }
}

// Returns a new object each call — pdfmake mutates content nodes during layout.
function makeDivider() {
  return {
    canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 0.5, lineColor: '#cccccc' }],
    margin: [0, 12, 0, 12],
  }
}

export async function buildCvPdf(event: H3Event, locale: 'en' | 'de'): Promise<Buffer> {
  const [profile, experience, education, skills, projects, t] = await Promise.all([
    queryCollection(event, `profile_${locale}`).first(),
    queryCollection(event, `experience_${locale}`).order('featured', 'DESC').order('dateEnd', 'DESC').order('dateStart', 'DESC').all(),
    queryCollection(event, `education_${locale}`).order('dateEnd', 'DESC').order('dateStart', 'DESC').all(),
    queryCollection(event, `skills_${locale}`).first(),
    queryCollection(event, `projects_${locale}`).order('dateEnd', 'DESC').order('dateStart', 'DESC').all(),
    useTranslation(event),
  ])

  const featuredProjects = projects.filter(project => project.featuredInCv)
  const skillCategories = filterCategoriesByEntries(skills?.categories ?? [], projects, experience, education)

  if (!profile) {
    throw createError({ statusCode: 404, statusMessage: 'CV profile not found' })
  }

  const categories = skills?.categories ?? []
  const photo = await loadPhoto('/images/me.jpg')

  // Phone/address/birthDate live only in server-only runtimeConfig (env vars),
  // never in the content tree — see the comment on profileSchema for why.
  const config = useRuntimeConfig(event)
  const { cvPhone, cvAddress, cvBirthDate } = config
  const { cvEmail, cvWebsite, cvGithub, cvLinkedIn, cvName } = config.public

  const projectsUrl = locale === 'de' ? `${cvWebsite}/de#projects` : `${cvWebsite}/#projects`

  const birthDateLabel = cvBirthDate
    ? (() => {
        const formatted = new Intl.DateTimeFormat(locale === 'de' ? 'de-DE' : 'en-US', {
          day: '2-digit', month: '2-digit', year: 'numeric',
        }).format(new Date(cvBirthDate))
        return locale === 'de' ? `Geburtsdatum: ${formatted}` : `Date of birth: ${formatted}`
      })()
    : null

  const contactItems = [cvEmail, cvPhone, cvAddress, birthDateLabel, cvWebsite, cvGithub, cvLinkedIn]
    .filter(Boolean) as string[]

  const infoStack = {
    stack: [
      { text: cvName, style: 'name' },
      { text: profile.headline, style: 'headline' },
      ...contactItems.map(item => ({ text: item, style: 'contact' })),
    ],
  }

  const header = { columns: [infoStack, { ...photo, margin: [0, 0, 0, 0] }], columnGap: 16 }

  const content: Record<string, unknown>[] = [
    header,
    makeDivider(),

    { text: t('cv.summary'), style: 'sectionTitle', headlineLevel: 1 },
    { text: profile.summary, margin: [0, 6, 0, 0] },

    ...((profile.openToWork ?? []).length ? [
      makeDivider(),
      { text: t('cv.openToWork'), style: 'sectionTitle', headlineLevel: 1 },
      { text: resolveTagNames(profile.openToWork ?? [], categories).join(', '), margin: [0, 6, 0, 0] },
    ] : []),
    makeDivider(),

    { text: t('home.experience'), style: 'sectionTitle', headlineLevel: 1 },
    ...experience.flatMap(item => [
      // Date stacked under the title (not right-aligned alongside it): a
      // left/right two-column line reads correctly on screen, but PDF text
      // extraction (pdftotext, and most ATS parsers) groups repeated
      // right-aligned runs into their own "column" and pulls them out of
      // order — verified by extracting this file with pdftotext.
      { text: [{ text: `${item.role} · ${item.company}`, bold: true }, ...(item.sideGig ? [{ text: ` (${t('home.sideGig')})`, bold: false, color: '#555555', fontSize: 9.5 }] : [])], margin: [0, 8, 0, 0], headlineLevel: 2 },
      { text: formatDateRange({ dateStart: item.dateStart, dateEnd: item.dateEnd }, locale), color: '#555555', fontSize: 9.5 },
      ...((item.highlights ?? []).length ? [{ ul: item.highlights, margin: [0, 2, 0, 0] }] : []),
      // ...((item.tags ?? []).length ? [{ text: resolveTagNames((item.tags ?? []), categories).join(', '), color: '#555555', fontSize: 9, margin: [0, 2, 0, 0] }] : []),
    ]),
    makeDivider(),

    { text: t('home.education'), style: 'sectionTitle', headlineLevel: 1 },
    ...education.flatMap(item => [
      { text: `${item.degree} · ${item.institution}`, bold: true, margin: [0, 8, 0, 0], headlineLevel: 2 },
      { text: formatDateRange({ dateStart: item.dateStart, dateEnd: item.dateEnd }, locale), color: '#555555', fontSize: 9.5 },
      ...((item.highlights ?? []).length ? [{ ul: item.highlights, margin: [0, 2, 0, 0] }] : []),
    ]),

    ...(featuredProjects.length > 0 ? [
      makeDivider(),
      {
        text: [
          { text: t('home.projects') },
          { text: `   ${t('cv.projectsHint')} `, bold: false, fontSize: 9.5, color: '#555555' },
          { text: projectsUrl, link: projectsUrl, bold: false, fontSize: 9.5, color: '#1a4f8b', decoration: 'underline' },
        ],
        style: 'sectionTitle',
        headlineLevel: 1,
      },
      ...featuredProjects.flatMap(item => [
        { text: [{ text: item.title, bold: true }, ...(item.link ? [{ text: ` · ${item.link}`, bold: false, color: '#555555' }] : (item.repo ? [{ text: ` · ${item.repo}`, bold: false, color: '#555555' }] : []))], margin: [0, 8, 0, 0], headlineLevel: 2 },
        { text: formatDateRange({ dateStart: item.dateStart, dateEnd: item.dateEnd }, locale), color: '#555555', fontSize: 9.5 },
        ...(item.description ? [{ text: item.description, margin: [0, 2, 0, 0] }] : []),
        ...((item.tags ?? []).length ? [{ text: resolveTagNames((item.tags ?? []), categories).join(', '), color: '#555555', fontSize: 9, margin: [0, 2, 0, 0] }] : []),
      ]),
    ] : []),

    makeDivider(),
    { text: t('home.skills'), style: 'sectionTitle', headlineLevel: 1 },
    ...skillCategories.map(category => ({
      text: [
        { text: `${category.name}: `, bold: true },
        category.items.map(item => item.name).join(', '),
      ],
      margin: [0, 4, 0, 0],
    })),
    makeDivider(),

    { text: t('home.languages'), style: 'sectionTitle', headlineLevel: 1 },
    { text: (profile.languages ?? []).map(language => `${language.name} — ${language.level}`).join('   ·   '), margin: [0, 6, 0, 0] },
  ]

  const keywords = skillCategories.flatMap(category => category.items.map(item => item.name)).join(', ')

  const docDefinition = {
    info: {
      title: `${cvName} – CV`,
      author: cvName,
      subject: profile.headline,
      keywords,
    },
    // Move a heading to the next page rather than leaving it stranded at the
    // bottom with no content following it.
    pageBreakBefore: (currentNode: { headlineLevel?: number }, nodeContainer: { getFollowingNodesOnPage(): { headlineLevel?: number }[] }) => {
      return currentNode.headlineLevel !== undefined && nodeContainer.getFollowingNodesOnPage().filter(page => page.headlineLevel === undefined).length === 0
    },
    pageMargins: [40, 40, 40, 40],
    defaultStyle: { font: 'Roboto', fontSize: 10.5, lineHeight: 1.3 },
    styles: {
      name: { fontSize: 20, bold: true },
      headline: { fontSize: 12, color: '#555555', margin: [0, 2, 0, 6] },
      contact: { fontSize: 9.5, color: '#555555', margin: [0, 0, 0, 2] },
      sectionTitle: { fontSize: 13, bold: true },
    },
    content,
  }

  const pdfDoc = pdfMake.createPdf(docDefinition)
  return pdfDoc.getBuffer()
}
