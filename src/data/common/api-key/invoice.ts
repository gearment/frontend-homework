export const INVOICE_BASE_URL = '/invoice';

export const invoiceApiKey = {
    invoiceIndex: `${INVOICE_BASE_URL}`,
    invoiceDetail: `${INVOICE_BASE_URL}/:id`,
    invoiceCreate: `${INVOICE_BASE_URL}`,
    invoiceUpdate: `${INVOICE_BASE_URL}/:id`,
    invoiceDelete: `${INVOICE_BASE_URL}/:id`,
};
