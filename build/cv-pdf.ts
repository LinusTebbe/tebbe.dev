import pdfMake from 'pdfmake'
import type { Languages } from '../shared/types/languages'
import type { SkillCategory } from '../shared/utils/skills'
import { resolveTagNames, filterCategoriesByEntries } from '../shared/utils/skills'
import { formatDateRange } from '../shared/utils/date-range'

export interface CvProject {
  title: string
  description?: string
  link?: string
  repo?: string
  dateStart: string
  dateEnd: string
  tags?: string[]
  featuredInCv?: boolean
}

export interface CvExperience {
  role: string
  company: string
  sideGig?: boolean
  dateStart: string
  dateEnd: string
  highlights?: string[]
  tags?: string[]
}

export interface CvEducation {
  degree: string
  institution: string
  dateStart: string
  dateEnd: string
  highlights?: string[]
  tags?: string[]
}

export interface CvProfile {
  headline: string
  summary: string
  languages?: { name: string, level: string }[]
  openToWork?: string[]
}

export interface CvInput {
  locale: Languages
  t: (key: string) => string
  profile: CvProfile
  experience: CvExperience[]
  education: CvEducation[]
  projects: CvProject[]
  categories: SkillCategory[]
  photo: { image: string, width: number } | null
  cv: {
    name: string
    email: string
    website: string
    github: string
    linkedin: string
    phone?: string
    address?: string
    birthDate?: string
  }
}

function makeDivider() {
  return {
    canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 0.5, lineColor: '#cccccc' }],
    margin: [0, 12, 0, 12],
  }
}

export async function renderCvPdf(input: CvInput): Promise<Buffer> {
  const { locale, t, profile, experience, education, projects, categories, photo, cv } = input

  const featuredProjects = projects.filter(project => project.featuredInCv)
  const skillCategories = filterCategoriesByEntries(categories, projects, experience, education)

  const projectsUrl = locale === 'de' ? `${cv.website}/de#projects` : `${cv.website}/#projects`

  const birthDateLabel = cv.birthDate
    ? (() => {
        const formatted = new Intl.DateTimeFormat(locale === 'de' ? 'de-DE' : 'en-US', {
          day: '2-digit', month: '2-digit', year: 'numeric',
        }).format(new Date(cv.birthDate))
        return locale === 'de' ? `Geburtsdatum: ${formatted}` : `Date of birth: ${formatted}`
      })()
    : null

  const contactItems = [cv.email, cv.phone, cv.address, birthDateLabel, cv.website, cv.github, cv.linkedin]
    .filter(Boolean) as string[]

  const infoStack = {
    stack: [
      { text: cv.name, style: 'name' },
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
      { text: [{ text: `${item.role} · ${item.company}`, bold: true }, ...(item.sideGig ? [{ text: ` (${t('home.sideGig')})`, bold: false, color: '#555555', fontSize: 9.5 }] : [])], margin: [0, 8, 0, 0], headlineLevel: 2 },
      { text: formatDateRange({ dateStart: item.dateStart, dateEnd: item.dateEnd }, locale), color: '#555555', fontSize: 9.5 },
      ...((item.highlights ?? []).length ? [{ ul: item.highlights, margin: [0, 2, 0, 0] }] : []),
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
      title: `${cv.name} – CV`,
      author: cv.name,
      subject: profile.headline,
      keywords,
    },
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

  return pdfMake.createPdf(docDefinition).getBuffer()
}
