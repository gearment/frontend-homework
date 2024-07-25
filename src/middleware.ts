import { LOCALE_EN, locales } from '@/data';
import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const handleI18nRouting = createMiddleware({
        locales: locales,
        defaultLocale: LOCALE_EN,
        localeDetection: false,
    });

    return handleI18nRouting(request);
}

export const config = {
    // Skip all paths that should not be internationalized. This example skips
    // certain folders and all pathnames with a dot (e.g. favicon.ico)
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
