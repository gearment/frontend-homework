'use client';
import invoiceApi from '@/apis/invoice';
import Form from '@/components/site/invoice/Form';
import { API_KEY, INVOICE_PATH } from '@/data';
import { useConfirmModal } from '@/hooks/use-confirm';
import { useNotify } from '@/hooks/use-notify';
import { TInvoiceFormValues, TInvoicePayload } from '@/types';
import { getIdAndAction } from '@/utils';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type TInvoiceDetailProps = {
    id?: string | string[];
};
function InvoiceDetail({ id }: TInvoiceDetailProps) {
    const { detail_id, action } = getIdAndAction(id);
    const notify = useNotify();
    const confirmModal = useConfirmModal();
    const router = useRouter();

    const {
        mutate: getDetail,
        data,
        isPending,
    } = useMutation({
        mutationKey: [API_KEY.invoiceDetail, detail_id],
        mutationFn: () => invoiceApi.getInvoiceByID(detail_id),
        onError: () => {
            router.replace(INVOICE_PATH);
        },
    });

    const { mutate: createInvoice, isPending: isCreating } = useMutation({
        mutationFn: invoiceApi.createInvoice,
        onSuccess: () => {
            notify.destroy();
            confirmModal.success({
                onOk: () => router.push(INVOICE_PATH),
            });
        },
        onError: (error: any) => {
            notify.destroy();
            confirmModal.error({ content: error?.message });
        },
    });

    const { mutate: updateInvoice, isPending: isUpdating } = useMutation({
        mutationFn: invoiceApi.updateInvoice,
        onSuccess: () => {
            notify.destroy();
            confirmModal.success({
                onOk: () => router.push(INVOICE_PATH),
            });
        },
        onError: (error: any) => {
            notify.destroy();
            confirmModal.error({ content: error?.message });
        },
    });

    const handleAdd = (data: TInvoiceFormValues) => {
        const payload = getInvoicePayload(data);
        notify.loading();
        createInvoice(payload);
    };

    const handleUpdate = (data: TInvoiceFormValues) => {
        const payload = getInvoicePayload(data);
        notify.loading();
        updateInvoice({ id: detail_id, payload });
    };

    useEffect(() => {
        if (action === 'update' && id) getDetail();
    }, [action, getDetail, id]);

    return <Form action={action} data={data?.data} loading={(action === 'update' && isPending) || isCreating || isUpdating} onSuccess={action === 'create' ? handleAdd : handleUpdate} />;
}

export default InvoiceDetail;

const getInvoicePayload = (data: TInvoiceFormValues): TInvoicePayload => {
    return {
        ...data,
    };
};
