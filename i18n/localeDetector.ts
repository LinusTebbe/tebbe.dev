// Detect based on query, cookie, header
import type {LocaleObject} from "#internal-i18n-types";

export default defineI18nLocaleDetector((event, config) => {
    // try to get locale from query

    const query = tryQueryLocale(event, { lang: '' }) // disable locale default value with `lang` option
    if (query) {
        return query.toString()
    }

    // try to get locale from cookie
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
    // If the locale cannot be resolved up to this point, it is resolved with the value `defaultLocale` of the locale config passed to the function

})