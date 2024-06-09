import CreateInvoiceDraft from "./draft";
import CreateInvoiceFields from "./fields";
import CreateInvoiceFooter from "./footer";
import { CreateInvoiceWrapperStyled } from "./styled";
import { ICreateInvoiceView } from "./interface";

const CreateInvoiceView = ({
  onSubmitSaveDraft,
  handleFormInvoice,
  handleActiveDraft,
  activeSaveBtn,
  onSaveSubmit
}: ICreateInvoiceView) => {
  return (
    <CreateInvoiceWrapperStyled>
      <CreateInvoiceFields handleFormInvoice={handleFormInvoice} />
      <CreateInvoiceDraft handleActiveDraft={handleActiveDraft} />
      <CreateInvoiceFooter
        onSubmitSaveDraft={onSubmitSaveDraft}
        activeSaveBtn={activeSaveBtn}
        onSaveSubmit={onSaveSubmit}
      />
    </CreateInvoiceWrapperStyled>
  );
};

export default CreateInvoiceView;
