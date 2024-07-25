import { IDataSource, IInvoice, IMainResponse, IMainResponseAffected, IMainUpdatePayload, IPaginationParams, TInvoiceFilterParams, TInvoicePayload } from '@/types';
import { getBeURL, networkHandler } from '@/utils';
import { AxiosRequestConfig } from 'axios';

function getInvoices(params: IPaginationParams & TInvoiceFilterParams, config?: AxiosRequestConfig) {
    return networkHandler.get<IMainResponse<IDataSource<IInvoice>>>(getBeURL('invoiceIndex'), { params, ...config }).then((rp) => rp.data);
}

function getInvoiceByID(id: number | string) {
    return networkHandler.get<IMainResponse<IInvoice>>(getBeURL('invoiceDetail', { id })).then((rp) => rp.data);
}

function createInvoice(payload: TInvoicePayload) {
    return networkHandler.post<IMainResponse<IInvoice>>(getBeURL('invoiceCreate'), { ...payload }).then((rp) => rp.data);
}

function updateInvoice(payload: IMainUpdatePayload<TInvoicePayload>) {
    const { id, payload: payload_ } = payload;
    return networkHandler.put<IMainResponse<IInvoice>>(getBeURL('invoiceUpdate', { id }), { ...payload_ }).then((rp) => rp.data);
}

function deleteInvoice(id: number | string) {
    return networkHandler.delete<IMainResponse<IMainResponseAffected>>(getBeURL('invoiceDelete', { id })).then((rp) => rp.data);
}

const invoiceApi = { getInvoices, getInvoiceByID, createInvoice, updateInvoice, deleteInvoice };

export default invoiceApi;
