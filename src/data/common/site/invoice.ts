import { EInvoiceStatus, EInvoiceType, EPaymentMethod, IOption } from '@/types';

export const contractorOptions: IOption<string>[] = Array(5)
    .fill(1)
    .map((_, index) => ({
        value: `contractor-${index}`,
        label: `Contractor ${index}`,
    }));

export const typeOptions: IOption<string>[] = [
    {
        value: EInvoiceType.Edit,
        label: 'Edit',
    },
    {
        value: EInvoiceType.InProcess,
        label: 'In Process',
    },
    {
        value: EInvoiceType.Draft,
        label: 'Draft',
    },
];

export const statusOptions: IOption<string>[] = [
    {
        value: EInvoiceStatus.Draft,
        label: 'Draft',
        color: 'default',
    },
    {
        value: EInvoiceStatus.Late,
        label: 'Late',
        color: 'warning',
    },
    {
        value: EInvoiceStatus['Not-Paid'],
        label: 'Not-Paid',
        color: 'error',
    },
    {
        value: EInvoiceStatus.Paid,
        label: 'Paid',
        color: 'success',
    },
];

export const statusOptionsObj = statusOptions?.reduce((prev, cur) => ({ ...prev, [cur.value]: cur }), {} as Record<string, IOption<string>>);

export const paymentMethodOptions: IOption<string>[] = [
    {
        value: EPaymentMethod.BANK,
        label: 'Bank',
    },
    {
        value: EPaymentMethod.COD,
        label: 'COD',
    },
    {
        value: EPaymentMethod.VISA,
        label: 'Visa',
    },
];
