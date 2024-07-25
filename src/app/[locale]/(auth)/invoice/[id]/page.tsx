'use client';
import dynamic from 'next/dynamic';

const InvoiceDetail = dynamic(() => import('@/sites/invoice/InvoiceDetail'));

type TProps = {
    params: {
        id: string;
    };
};

export default function Page({ params: { id } }: TProps) {
    return <InvoiceDetail id={id} />;
}
