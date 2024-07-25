import { Assign, ConvertToNullableString, IBaseFilter } from '@/types';

export enum EPaymentMethod {
    'COD' = 'COD',
    'BANK' = 'BANK',
    'VISA' = 'VISA',
}

export enum EInvoiceStatus {
    'Paid' = 'Paid',
    'Not-Paid' = 'Not-Paid',
    'Late' = 'Late',
    'Draft' = 'Draft',
}

export enum EInvoiceType {
    'Edit' = 'Edit',
    'InProcess' = 'InProcess',
    'Draft' = 'Draft',
}

export interface IInvoiceDetail {
    name: string;
    quantity: number;
    unit: string;
    price: number;
    total?: number;
}

export interface IInvoice {
    id: string;
    billedTo: string;
    invoiceDate?: string;
    dueDate?: string;
    paymentMethod: EPaymentMethod | string;
    vat?: boolean;
    status: EInvoiceStatus | string;
    type?: EInvoiceType | string;
    note?: string;
    details: IInvoiceDetail[];
}

export type TInvoicePayload = Assign<
    Partial<IInvoice>,
    {
        billedTo: string;
    }
>;

export type TInvoiceFilterParams = IBaseFilter<IInvoice> & {
    billTo?: string;
    vat?: boolean;
    status?: string;
    fromDate?: string;
    toDate?: string;
    type?: string;
};

export type TInvoiceFilterValues = ConvertToNullableString<TInvoiceFilterParams> & {
    date: any;
};

export type TInvoiceFormValues = Assign<
    Partial<IInvoice>,
    {
        billedTo: string;
        invoiceDate?: any;
        dueDate?: any;
    }
>;
