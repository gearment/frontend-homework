import { BasicInput } from "components/control-style/input";
import { CreateInvoiceFieldsRow, CreateInvoiceFieldsWrapper } from "./styled";
import { ICreateInvoiceFields } from "./interface";
import SelectCustom from "components/control-style/select";
import classNames from "classnames";
import { HTML_ELEMENTS } from "constants/common";
import DatePickerCustom from "components/control-style/date-picker";

const CreateInvoiceFields = ({ handleFormInvoice }: ICreateInvoiceFields) => {
  return (
    <CreateInvoiceFieldsWrapper
      className={classNames("d-flex flex-column gap-16")}
    >
      <CreateInvoiceFieldsRow>
        <BasicInput
          placeholder="Document number"
          variant="filled"
          onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) =>
            handleFormInvoice("documentNumber", e.target.value)
          }
          {...{
            style: { maxWidth: "33%" },
            className: `flex-grow-1 w-auto ${HTML_ELEMENTS.CLASS.INPUT_CUSTOM} ${HTML_ELEMENTS.CLASS.PLACE_HOLDER_CUSTOM_CLASS}`
          }}
        />
        <SelectCustom
          placeholder="Document type"
          handleChange={(value) => {
            handleFormInvoice("documentType", value);
          }}
          options={[
            { value: "Document", label: "Document" },
            { value: "PDF", label: "PDF" }
          ]}
          {...{ style: { maxWidth: "33%" }, className: "flex-grow-1" }}
        />
        <SelectCustom
          placeholder="Prepared"
          handleChange={(value) => {
            handleFormInvoice("prepared", value);
          }}
          options={[
            { value: "option 1", label: "option 1" },
            { value: "option 2", label: "option 2" }
          ]}
          {...{
            style: { maxWidth: "33%" },
            className: `flex-grow-1 ${HTML_ELEMENTS.CLASS.PLACE_HOLDER_CUSTOM_CLASS}`
          }}
        />
      </CreateInvoiceFieldsRow>
      <CreateInvoiceFieldsRow>
        <SelectCustom
          placeholder="Contractor"
          handleChange={(value) => {
            handleFormInvoice("contractor", value);
          }}
          options={[
            { value: "Contractor 1", label: "Contractor 1" },
            { value: "Contractor 2", label: "Contractor 2" },
            { value: "Contractor 3", label: "Contractor 3" }
          ]}
          {...{ style: { maxWidth: "33%" }, className: "flex-grow-1" }}
        />
        <SelectCustom
          placeholder="Format"
          handleChange={(value) => {
            handleFormInvoice("format", value);
          }}
          options={[
            { value: "Format 1", label: "Format 1" },
            { value: "Format 2", label: "Format 2" },
            { value: "Format 3", label: "Format 3" }
          ]}
          {...{ style: { maxWidth: "33%" }, className: "flex-grow-1" }}
        />
        <SelectCustom
          placeholder="Bank account"
          handleChange={(value) => {
            handleFormInvoice("bankAccount", value);
          }}
          options={[
            { value: "Bank account 1", label: "Bank account 1" },
            { value: "Bank account 2", label: "Bank account 2" },
            { value: "Bank account 3", label: "Bank account 3" }
          ]}
          {...{ style: { maxWidth: "33%" }, className: "flex-grow-1" }}
        />
      </CreateInvoiceFieldsRow>
      <CreateInvoiceFieldsRow>
        <DatePickerCustom
          onChange={(date, dateString) => {
            handleFormInvoice("invoiceDate", dateString.toString());
          }}
          placeholder="Invoice date"
          {...{ style: { maxWidth: "33%" }, className: "flex-grow-1" }}
        />
        <DatePickerCustom
          onChange={(date, dateString) => {
            handleFormInvoice("dueDate", dateString.toString());
          }}
          placeholder="Due date"
          {...{
            style: { maxWidth: "33%" },
            className: `flex-grow-1 ${HTML_ELEMENTS.CLASS.PLACE_HOLDER_CUSTOM_CLASS}`
          }}
        />
        <SelectCustom
          placeholder="Payment"
          handleChange={(value) => {
            handleFormInvoice("payment", value);
          }}
          options={[
            { value: "Payment 1", label: "Payment 1" },
            { value: "Payment 2", label: "Payment 2" },
            { value: "Payment 3", label: "Payment 3" }
          ]}
          {...{ style: { maxWidth: "33%" }, className: "flex-grow-1" }}
        />
      </CreateInvoiceFieldsRow>
    </CreateInvoiceFieldsWrapper>
  );
};

export default CreateInvoiceFields;
