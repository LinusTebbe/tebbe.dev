import type {Languages} from "#shared/types/languages";

export interface DateRange {
    dateStart: string
    dateEnd: string
}

export function formatDateRange(range: DateRange, locale: Languages): string {
    if (range.dateStart === range.dateEnd) return range.dateStart;

    const dateEnd = range.dateEnd === '9999-99'
        ? (locale === 'en' ? 'Present' : 'Heute')
        : range.dateEnd;
    return `${range.dateStart} - ${dateEnd}`;
}