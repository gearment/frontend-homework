import { invoicesData } from 'constant/invoices.constant';
import React, { ReactNode, useMemo, useState } from 'react';
import { Invoice, InvoiceItem } from 'types/Invoices.type';

interface InvoicesContextType {
  invoices: Invoice[];
  invoiceItems: InvoiceItem[];
  updateInvoices: (invoice: Invoice[]) => void;
  updateInvoiceItem: (invoiceItem: InvoiceItem[]) => void;
  addInvoice: (invoice: Invoice) => void;
  addInvoiceItem: (invoiceItem: InvoiceItem) => void;
}

type InvoicesProviderProps = {
  children: ReactNode;
};

const InvoicesContext = React.createContext<InvoicesContextType>(
  {} as InvoicesContextType
);

export const InvoicesProvider: React.FC<InvoicesProviderProps> = ({
  children
}) => {
  const [invoices, setInvoices] = useState<Invoice[]>(invoicesData);
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);

  const updateInvoices = (data: Invoice[]) => {
    setInvoices(data);
  };

  const addInvoice = (data: Invoice) => {
    const _invoices = [...invoices];
    _invoices.push(data);
    setInvoices(_invoices);
  };

  const addInvoiceItem = (data: InvoiceItem) => {
    const _invoiceItems = [...invoiceItems];
    _invoiceItems.push(data);
    setInvoiceItems(_invoiceItems);
  };

  const updateInvoiceItem = (data: InvoiceItem[]) => {
    setInvoiceItems(data);
  }

  const value = useMemo(
    () => ({
      invoices,
      invoiceItems,
      updateInvoices,
      updateInvoiceItem,
      addInvoice,
      addInvoiceItem
    }),
    [addInvoice, invoices, updateInvoices, addInvoiceItem, invoiceItems]
  );

  return (
    <InvoicesContext.Provider value={value as any}>
      {children}
    </InvoicesContext.Provider>
  );
};

export function useInvoices() {
  return React.useContext(InvoicesContext);
}

export default InvoicesContext;
