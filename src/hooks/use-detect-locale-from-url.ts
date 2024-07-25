'use client';

import { localeConfig } from '@/data';

export const useDetectLocaleFormURL = (url: string, defaultLocale: string): string => {
    const locale = Object.values(localeConfig)?.find((item) => url.startsWith(item.key));
    return locale?.key ?? defaultLocale;
};
