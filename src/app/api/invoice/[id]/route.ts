// app/api/invoices/[id]/route.ts
import { INVOICE_BASE_URL } from '@/data/common/api-key/invoice';
import { getInvoiceById, updateInvoice, deleteInvoice } from '@/data/fake-data';

export async function GET(req: Request) {
    const id = req.url.split(`${INVOICE_BASE_URL}/`)[1];
    const invoice = getInvoiceById(id);
    if (invoice) {
        return Response.json({
            data: invoice,
        });
    } else {
        return Response.json({ message: 'Invoice not found' }, { status: 404 });
    }
}

export async function PUT(req: Request) {
    const id = req.url.split(`${INVOICE_BASE_URL}/`)[1];
    const updatedInvoiceData = await req.json();
    const updatedInvoice = updateInvoice(id, updatedInvoiceData);
    if (updatedInvoice) {
        return Response.json(updatedInvoice);
    } else {
        return Response.json({ message: 'Invoice not found' }, { status: 404 });
    }
}

export async function DELETE(req: Request) {
    const id = req.url.split(`${INVOICE_BASE_URL}/`)[1];
    const deletedInvoice = deleteInvoice(id);
    if (deletedInvoice) {
        return Response.json(deletedInvoice);
    } else {
        return Response.json({ message: 'Invoice not found' }, { status: 404 });
    }
}
