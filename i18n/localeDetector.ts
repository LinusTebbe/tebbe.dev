export default defineI18nLocaleDetector((event, config) => {
    const query = tryQueryLocale(event, { lang: '' }) // disable locale default value with `lang` option
    if (query) {
        return query.toString()
    }

    const cookie = tryCookieLocale(event, { lang: '', name: 'i18n_locale' }) // disable locale default value with `lang` option
    if (cookie) {
        return cookie.toString()
    }
    const locales = Object.keys(event.context.i18n.messages)
    const languageParts = event.path.split('/').map(part => part.split('.')).flat().filter(path => locales.includes(path))
    if (languageParts.length === 0) {
        return config.defaultLocale
    }

    return languageParts.at(-1) ?? config.defaultLocale
})