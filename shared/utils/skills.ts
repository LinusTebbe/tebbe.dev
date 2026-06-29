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

export function filterCategoriesByTags(categories: SkillCategory[], tags: string[]): SkillCategory[] {
  return categories
    .map(category => ({ ...category, items: category.items.filter(item => tags.includes(item.slug)) }))
    .filter(category => category.items.length > 0)
}

export function filterCategoriesByEntries(
  categories: SkillCategory[],
  ...entryGroups: { tags?: string[] }[][]
): SkillCategory[] {
  return filterCategoriesByTags(categories, entryGroups.flat().flatMap(entry => entry.tags ?? []))
}
