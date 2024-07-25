import Preload from '@/components/shared/preload/Preload';
import ProgressBarProvider from '@/components/shared/ProcessBar';
import ClientProvider from '@/contexts/ClientProvider';
import { NextIntlClientProvider } from 'next-intl';
import { Asap as FontSans } from 'next/font/google';
import { notFound } from 'next/navigation';

export const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
});

const timeZone = 'Asia/Bangkok';

export default async function RootLayout({ children, params: { locale } }: { children: React.ReactNode; params: { locale: string } }) {
    let messages;
    try {
        messages = (await import(`../../../messages/${locale}.json`)).default;
    } catch (error) {
        notFound();
    }

    return (
        <html lang={locale}>
            <body>
                <Preload />
                <ClientProvider>
                    <NextIntlClientProvider locale={locale} messages={messages} timeZone={timeZone}>
                        <ProgressBarProvider>{children}</ProgressBarProvider>
                    </NextIntlClientProvider>
                </ClientProvider>
            </body>
        </html>
    );
}
