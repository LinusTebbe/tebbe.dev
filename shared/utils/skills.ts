export interface SkillItem {
  slug: string
  name: string
}

export interface SkillCategory {
  name: string
  items: SkillItem[]
}

export function resolveTagNames(tags: string[], categories: SkillCategory[]): string[] {
  return resolveTagItems(tags, categories).map(item => item.name)
}

export function resolveTagItems(tags: string[], categories: SkillCategory[]): SkillItem[] {
  const bySlug = new Map(categories.flatMap(category => category.items).map(item => [item.slug, item]))
  return tags.map(tag => bySlug.get(tag) ?? { slug: tag, name: tag })
}
