import { AntdRegistry } from '@ant-design/nextjs-registry';
import type { Metadata } from 'next';
import './global.css';

export const metadata: Metadata = {
    title: 'Micro Invoices',
    description: 'Micro Invoices',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <AntdRegistry>{children}</AntdRegistry>;
}
