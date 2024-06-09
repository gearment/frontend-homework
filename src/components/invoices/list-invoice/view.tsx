import PageItems from "./page-item";
import { InvoicesWrapperStyled } from "./styled";
import TableConfigInvoices from "./table-config-invoice";
import { TableDataInvoices } from "./table-data-invoices";

interface IListInvoiceView {
  open?: boolean;
}

const ListInvoiceView = ({ open }: IListInvoiceView) => {
  return (
    <InvoicesWrapperStyled>
      <TableConfigInvoices />
      <TableDataInvoices />
      <PageItems />
    </InvoicesWrapperStyled>
  );
};

export default ListInvoiceView;
