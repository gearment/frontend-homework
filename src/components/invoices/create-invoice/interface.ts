import { TDraftInvoice } from "interfaces/invoices";

export interface ICreateInvoiceFooter {
  onSubmitSaveDraft: () => void;
  onSaveSubmit: () => void;
  activeSaveBtn: boolean;
}

export interface ICreateInvoiceFields {
  handleFormInvoice: (key: TDraftInvoice, value: string) => void;
}

export interface ICreateInvoiceDraft {
  handleActiveDraft: (id: string, checked: boolean) => void;
}

export interface ICreateInvoiceView
  extends ICreateInvoiceFooter,
    ICreateInvoiceFields,
    ICreateInvoiceDraft {}
