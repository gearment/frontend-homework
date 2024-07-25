'use client';
import dynamic from 'next/dynamic';

const Invoice = dynamic(() => import('@/sites/invoice/Invoice'));

function Page() {
    return <Invoice />;
}

export default Page;
