import { getListInvoices } from "services/invoices";
import ListInvoiceView from "./view";
import { useEffect } from "react";
import { useCommonStore } from "stores/common.store";

interface IListInvoiceContainer {}

const ListInvoiceContainer = ({}: IListInvoiceContainer) => {
  const { setInvoices } = useCommonStore();
  async function fetchListInvoice() {
    const data = await getListInvoices();
    if (data) {
      setInvoices(data);
    }
  }
  useEffect(() => {
    fetchListInvoice();
  }, []);
  return <ListInvoiceView />;
};

export default ListInvoiceContainer;
