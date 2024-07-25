'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import { PropsWithChildren, useEffect } from 'react';

import { ModalProvider } from '@/contexts';
import { useAuthActions } from '@/stores/auth-store';

const client = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

function ClientProvider({ children }: PropsWithChildren) {
    const { init } = useAuthActions();

    useEffect(() => {
        init();
    }, [init]);

    return (
        <QueryClientProvider client={client}>
            <ReactQueryStreamedHydration>
                <ModalProvider>{children}</ModalProvider>
            </ReactQueryStreamedHydration>
        </QueryClientProvider>
    );
}

export default ClientProvider;
