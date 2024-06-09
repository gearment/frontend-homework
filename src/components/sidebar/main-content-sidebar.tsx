import { useCommonStore } from "stores/common.store";
import { NavItemEnum } from "constants/common";
import { InVoiceContentStyled, InvoiceWrapperStyled } from "./styled";
import { ListInvoice } from "components/invoices/list-invoice";
import { CreateInvoice } from "components/invoices/create-invoice";
import { DraftInvoice } from "components/invoices/draft-invoice";
import HomePage from "components/home";

interface IMainContentSidebar {}

const MainContentSidebar = ({}: IMainContentSidebar) => {
  const { selectTab } = useCommonStore();

  const renderInvoiceView = () => {
    switch (selectTab) {
      case NavItemEnum.LIST_INVOICE:
        return <ListInvoice />;

      case NavItemEnum.CREATE_NEW_INVOICE:
        return <CreateInvoice />;

      case NavItemEnum.DRAFT:
        return <DraftInvoice />;

      default:
        return <HomePage />;
    }
  };
  return (
    <InvoiceWrapperStyled>
      <InVoiceContentStyled>{renderInvoiceView()}</InVoiceContentStyled>
    </InvoiceWrapperStyled>
  );
};

export default MainContentSidebar;
