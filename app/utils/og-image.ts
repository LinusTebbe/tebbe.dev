import type {Languages} from "#shared/types/languages";

interface OgItemBase {
  dateStart: string
  dateEnd: string
  tags?: string[]
}

export type SlugOgData =
  | { kind: 'page' }
  | { kind: 'project', item: OgItemBase & { title: string, description?: string }, categories: SkillCategory[] }
  | { kind: 'experience', item: OgItemBase & { role: string, company: string }, categories: SkillCategory[] }
  | { kind: 'education', item: OgItemBase & { degree: string, institution: string }, categories: SkillCategory[] }

export function defineSlugOgImage(data: SlugOgData | null, locale: Languages) {
  if (!data || data.kind === 'page') return

  const { item } = data
  const shared = {
    dateRange: formatDateRange({ dateStart: item.dateStart, dateEnd: item.dateEnd }, locale),
    tags: resolveTagNames(item.tags ?? [], data.categories).slice(0, 6),
  }

  if (data.kind === 'project') {
    defineOgImage('Project', { title: data.item.title, description: data.item.description ?? '', ...shared })
    return
  }

  if (data.kind === 'experience') {
    defineOgImage('Experience', { role: data.item.role, company: data.item.company, ...shared })
    return
  }

  defineOgImage('Education', { degree: data.item.degree, institution: data.item.institution, ...shared })
}
