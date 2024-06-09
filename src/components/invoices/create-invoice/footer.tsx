import { MoneyCollectOutlined, SnippetsOutlined } from "@ant-design/icons";
import { ICreateInvoiceFooter } from "./interface";
import {
  CreateInvoiceFooterWrapper,
  CreateInvoiceInfo,
  CreateInvoiceInfoGroup,
  CreateInvoiceInfoText,
  CreateInvoiceSaveDraftBtn,
  HorizonStyle
} from "./styled";
import { GradientButton } from "components/control-style/button/gradient-btn";
import classNames from "classnames";

const CreateInvoiceFooter = ({
  onSubmitSaveDraft,
  onSaveSubmit,
  activeSaveBtn
}: ICreateInvoiceFooter) => {
  return (
    <CreateInvoiceFooterWrapper className="d-flex align-items-center">
      <CreateInvoiceInfo className="d-flex">
        <CreateInvoiceInfoGroup className="d-flex gap-8">
          <div className="d-flex gap-4">
            <SnippetsOutlined />
            <CreateInvoiceInfoText>Tax Base</CreateInvoiceInfoText>
          </div>
          <div>0BGN</div>
        </CreateInvoiceInfoGroup>
        <HorizonStyle />
        <CreateInvoiceInfoGroup className="d-flex gap-8">
          <div>%VAT</div>
          <div>0BGN</div>
        </CreateInvoiceInfoGroup>
        <HorizonStyle />
        <CreateInvoiceInfoGroup className="d-flex gap-8">
          <MoneyCollectOutlined />
          <div>Total</div>
          <div>0BGN</div>
        </CreateInvoiceInfoGroup>
      </CreateInvoiceInfo>
      <CreateInvoiceInfo className="d-flex gap-8">
        <GradientButton
          onClick={onSaveSubmit}
          type="primary"
          size="middle"
          style={{ width: "90px" }}
          colors={["#284CCC", "#00127F"]}
          name="Save"
          {...{ className: classNames({ "disable-btn": !activeSaveBtn }) }}
        />
        <CreateInvoiceSaveDraftBtn onClick={onSubmitSaveDraft}>
          Save as a draft
        </CreateInvoiceSaveDraftBtn>
      </CreateInvoiceInfo>
    </CreateInvoiceFooterWrapper>
  );
};

export default CreateInvoiceFooter;
