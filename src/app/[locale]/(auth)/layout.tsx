'use client';
const MainLayout = dynamic(() => import('@/components/layouts/MainLayout'), {
    ssr: false,
});

import { App } from 'antd';
import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react';

function Layout({ children }: PropsWithChildren) {
    return (
        <App>
            <MainLayout>{children}</MainLayout>
        </App>
    );
}

export default Layout;
