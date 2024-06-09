import { DraftInvoicesWrapperStyled } from "./styled";

interface IDraftInvoiceView {
  open?: boolean;
}

const DraftInvoiceView = ({ open }: IDraftInvoiceView) => {
  return (
    <DraftInvoicesWrapperStyled>DraftInvoiceView</DraftInvoicesWrapperStyled>
  );
};

export default DraftInvoiceView;
