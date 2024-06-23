export type Invoice = {
    invoiceId: string;
    billedTo: string;
    invoiceDate: string;
    dueDate: string;
    status: string;
    vat: number;
    invoiceItems: InvoiceItem[];
    description: string;
}

export type InvoiceItem = {
    id: string;
    name: string;
    quantity: number;
    unit: string;
    unitPrice: number;
    caculatedPrice: number;
    tax: number;
}