import { EInvoiceStatus, EInvoiceType, EPaymentMethod, IInvoice } from '@/types';

const invoices: IInvoice[] = [
    {
        id: '1',
        billedTo: 'Company A',
        invoiceDate: '2024-01-01',
        dueDate: '2024-01-15',
        paymentMethod: EPaymentMethod.BANK,
        vat: true,
        status: EInvoiceStatus.Paid,
        type: EInvoiceType.Draft,
        details: [
            {
                name: 'Product 1',
                quantity: 10,
                unit: 'pcs',
                price: 50,
                total: 500,
            },
            {
                name: 'Product 2',
                quantity: 5,
                unit: 'pcs',
                price: 100,
                total: 500,
            },
        ],
    },
    {
        id: '2',
        billedTo: 'Company B',
        invoiceDate: '2024-02-01',
        dueDate: '2024-02-15',
        paymentMethod: EPaymentMethod.COD,
        vat: true,
        status: EInvoiceStatus['Not-Paid'],
        type: EInvoiceType.Edit,
        details: [
            {
                name: 'Product 3',
                quantity: 8,
                unit: 'pcs',
                price: 75,
                total: 600,
            },
        ],
    },
    {
        id: '3',
        billedTo: 'Company C',
        invoiceDate: '2024-03-01',
        dueDate: '2024-03-15',
        paymentMethod: EPaymentMethod.VISA,
        vat: true,
        status: EInvoiceStatus.Late,
        type: EInvoiceType.Edit,
        details: [
            {
                name: 'Product 4',
                quantity: 12,
                unit: 'pcs',
                price: 40,
                total: 480,
            },
            {
                name: 'Product 5',
                quantity: 7,
                unit: 'pcs',
                price: 120,
                total: 840,
            },
        ],
    },
    {
        id: '4',
        billedTo: 'Company D',
        invoiceDate: '2024-04-01',
        dueDate: '2024-04-15',
        paymentMethod: EPaymentMethod.BANK,
        vat: true,
        status: EInvoiceStatus.Draft,
        type: EInvoiceType.Edit,
        details: [
            {
                name: 'Product 6',
                quantity: 3,
                unit: 'pcs',
                price: 200,
                total: 600,
            },
        ],
    },
    {
        id: '5',
        billedTo: 'Company E',
        invoiceDate: '2024-05-01',
        dueDate: '2024-05-15',
        paymentMethod: EPaymentMethod.COD,
        vat: true,
        status: EInvoiceStatus.Paid,
        type: EInvoiceType.Edit,
        details: [
            {
                name: 'Product 7',
                quantity: 15,
                unit: 'pcs',
                price: 30,
                total: 450,
            },
            {
                name: 'Product 8',
                quantity: 6,
                unit: 'pcs',
                price: 80,
                total: 480,
            },
        ],
    },
    {
        id: '6',
        billedTo: 'Company F',
        invoiceDate: '2024-06-01',
        dueDate: '2024-06-15',
        paymentMethod: EPaymentMethod.VISA,
        vat: true,
        status: EInvoiceStatus['Not-Paid'],
        type: EInvoiceType.Edit,
        details: [
            {
                name: 'Product 9',
                quantity: 20,
                unit: 'pcs',
                price: 25,
                total: 500,
            },
        ],
    },
    {
        id: '7',
        billedTo: 'Company G',
        invoiceDate: '2024-07-01',
        dueDate: '2024-07-15',
        paymentMethod: EPaymentMethod.BANK,
        vat: true,
        status: EInvoiceStatus.Late,
        type: EInvoiceType.Edit,
        details: [
            {
                name: 'Product 10',
                quantity: 9,
                unit: 'pcs',
                price: 55,
                total: 495,
            },
        ],
    },
    {
        id: '8',
        billedTo: 'Company H',
        invoiceDate: '2024-08-01',
        dueDate: '2024-08-15',
        paymentMethod: EPaymentMethod.COD,
        vat: true,
        status: EInvoiceStatus.Draft,
        type: EInvoiceType.Edit,
        details: [
            {
                name: 'Product 11',
                quantity: 4,
                unit: 'pcs',
                price: 150,
                total: 600,
            },
            {
                name: 'Product 12',
                quantity: 10,
                unit: 'pcs',
                price: 60,
                total: 600,
            },
        ],
    },
    {
        id: '9',
        billedTo: 'Company I',
        invoiceDate: '2024-09-01',
        dueDate: '2024-09-15',
        paymentMethod: EPaymentMethod.VISA,
        vat: true,
        status: EInvoiceStatus.Paid,
        type: EInvoiceType.Edit,
        details: [
            {
                name: 'Product 13',
                quantity: 2,
                unit: 'pcs',
                price: 250,
                total: 500,
            },
        ],
    },
    {
        id: '10',
        billedTo: 'Company J',
        invoiceDate: '2024-10-01',
        dueDate: '2024-10-15',
        paymentMethod: EPaymentMethod.BANK,
        vat: true,
        status: EInvoiceStatus['Not-Paid'],
        type: EInvoiceType.Edit,
        details: [
            {
                name: 'Product 14',
                quantity: 5,
                unit: 'pcs',
                price: 100,
                total: 500,
            },
        ],
    },
];

export const getInvoices = () => invoices;

export const getInvoiceById = (id: string) => invoices.find((invoice) => invoice.id === id);

export const createInvoice = (invoice: IInvoice) => {
    invoices.push({ ...invoice, id: String(invoices.length + 1) });
    return invoice;
};

export const updateInvoice = (id: string, updatedInvoice: Partial<IInvoice>) => {
    const index = invoices.findIndex((invoice) => invoice.id === id);
    if (index !== -1) {
        invoices[index] = { ...invoices[index], ...updatedInvoice };
        return invoices[index];
    }
    return null;
};

export const deleteInvoice = (id: string) => {
    const index = invoices.findIndex((invoice) => invoice.id === id);
    if (index !== -1) {
        return invoices.splice(index, 1)[0];
    }
    return null;
};
