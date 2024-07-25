import { locales } from '@/data';

export const getDefaultAdditional = (locale: string, key = 'value') => ({
    key: locale,
    [key]: '',
});

export const defaultAdditional = locales.map((locale) => getDefaultAdditional(locale));
