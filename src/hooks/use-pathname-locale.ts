import { getPathNameWithoutLocale } from '@/utils';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';

export const usePathNameLocale = () => {
    const pathname = usePathname();
    const locale = useLocale();
    return getPathNameWithoutLocale(pathname, locale);
};
