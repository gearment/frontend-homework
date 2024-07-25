'use client';
import dynamic from 'next/dynamic';

const InvoiceDetail = dynamic(() => import('@/sites/invoice/InvoiceDetail'));

function Page() {
    return <InvoiceDetail />;
}

export default Page;
