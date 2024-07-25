// pages/api/invoices/index.ts
import { createInvoice, getInvoices } from '@/data/fake-data';

export async function GET() {
    return Response.json({
        data: { items: getInvoices() },
    });
}

export async function POST(req: Request) {
    const invoice = await req.json();
    const newInvoice = createInvoice(invoice);
    return Response.json(newInvoice, { status: 201 });
}
