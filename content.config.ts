import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const locales = ['en', 'de'] as const
type Locale = typeof locales[number]

const projectSchema = z.object({
  dateStart: z.string(),
  dateEnd: z.string(),
  tags: z.array(z.string()).default([]),
  featuredInCv: z.boolean().default(false),
  link: z.string().optional(),
  repo: z.string().optional(),
})

const experienceSchema = z.object({
  company: z.string(),
  role: z.string(),
  location: z.string().optional(),
  dateStart: z.string(),
  dateEnd: z.string(),
  featured: z.boolean().default(false),
  sideGig: z.boolean().default(false),
  description: z.string().optional(),
  highlights: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  projects: z.array(z.string()).default([]),
})

const educationSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  fieldOfStudy: z.string().optional(),
  dateStart: z.string(),
  dateEnd: z.string(),
  highlights: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  projects: z.array(z.string()).default([]),
})

const skillsSchema = z.object({
  categories: z.array(z.object({
    name: z.string(),
    items: z.array(z.object({
      slug: z.string(),
      name: z.string(),
    })),
  })),
})

// phone/address/birthDate are intentionally NOT content fields — they'd sit
// in plain text in this (likely public) git repo. They're sourced from
// server-only env vars instead (see runtimeConfig.cvPhone/cvAddress/cvBirthDate
// in nuxt.config.ts) and only ever reach the key-gated PDF, never the page.
const profileSchema = z.object({
  headline: z.string(),
  summary: z.string(),
  languages: z.array(z.object({
    name: z.string(),
    level: z.string(),
  })).default([]),
  openToWork: z.array(z.string()).default([]),
})

// General pages (home, about, ...): one markdown file per top-level route.
function pages(locale: Locale) {
  return defineCollection({
    type: 'page',
    source: { include: `${locale}/*.md`, prefix: '/' },
  })
}

// Project detail pages: long-form markdown body + structured frontmatter.
function projects(locale: Locale) {
  return defineCollection({
    type: 'page',
    source: { include: `${locale}/projects/**`, prefix: '/projects' },
    schema: projectSchema,
  })
}

// Work experience entries: structured records, no rendered page.
function experience(locale: Locale) {
  return defineCollection({
    type: 'page',
    source: { include: `${locale}/experience/**`, prefix: '/experience' },
    schema: experienceSchema,
  })
}

function education(locale: Locale) {
  return defineCollection({
    type: 'page',
    source: { include: `${locale}/education/**`, prefix: '/education' },
    schema: educationSchema,
  })
}

// Canonical skill/tag taxonomy, grouped by category. `slug` is referenced
// from the `tags` field of projects/experience/education in every locale.
function skills(locale: Locale) {
  return defineCollection({
    type: 'data',
    source: { include: `${locale}/skills.yml` },
    schema: skillsSchema,
  })
}

// Personal data + summary used to render the on-site CV and the generated PDF.
function profile(locale: Locale) {
  return defineCollection({
    type: 'data',
    source: { include: `${locale}/profile.md` },
    schema: profileSchema,
  })
}

export default defineContentConfig({
  collections: {
    pages_en: pages('en'),
    pages_de: pages('de'),
    projects_en: projects('en'),
    projects_de: projects('de'),
    experience_en: experience('en'),
    experience_de: experience('de'),
    education_en: education('en'),
    education_de: education('de'),
    skills_en: skills('en'),
    skills_de: skills('de'),
    profile_en: profile('en'),
    profile_de: profile('de'),
  },
})
