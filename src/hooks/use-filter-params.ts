'use client';
import { qsParse, qsStringify } from '@/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useFilterParams = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const onRefreshParams = () => {
        router.push(pathname);
    };

    const onPushParams = (newQuery: any) => {
        const lastQuery = qsParse(searchParams);
        const query = qsStringify({
            ...lastQuery,
            ...newQuery,
        });
        router.push(`${pathname}?${query}`);
    };

    return {
        onRefreshParams,
        onPushParams,
    };
};
