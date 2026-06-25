const DEFAULT_LOCALE = 'en'

/**
 * `route.path` still contains the `@nuxtjs/i18n` URL prefix (e.g. `/de/projects/foo`)
 * since the module rewrites the browser URL, not the content paths. Content collections
 * are split per locale with the prefix already stripped (see content.config.ts), so we
 * need the prefix-free path to query them.
 */
export function useUnlocalizedPath() {
  const route = useRoute()
  const { locale } = useI18n()

  return computed(() => {
    if (locale.value === DEFAULT_LOCALE) return route.path
    const prefix = `/${locale.value}`
    if (route.path === prefix) return '/'
    if (route.path.startsWith(`${prefix}/`)) return route.path.slice(prefix.length)
    return route.path
  })
}
