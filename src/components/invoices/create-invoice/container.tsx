import { useEffect, useState } from "react";
import CreateInvoiceView from "./view";
import { IDraftInvoice, TDraftInvoice } from "interfaces/invoices";
import { getUuid } from "helpers/common";
import { useCommonStore } from "stores/common.store";
import { addInvoices } from "services/invoices";
import { Alert } from "antd";
import { useToastContext } from "components/toast";

interface ICreateInvoiceContainer {}

const defaultDraftInvoice = {
  id: getUuid(),
  documentNumber: "",
  prepared: "",
  documentType: "",
  contractor: "",
  format: "",
  bankAccount: "",
  invoiceDate: "",
  dueDate: "",
  payment: "",
  checked: false
};

const CreateInvoiceContainer = ({}: ICreateInvoiceContainer) => {
  const { setDraftInvoices, draftInvoices } = useCommonStore();
  const { showToast } = useToastContext();
  const [draftInvoice, setDraftInvoice] =
    useState<IDraftInvoice>(defaultDraftInvoice);
  const [draftsChecked, setDraftsChecked] = useState<IDraftInvoice[]>();

  const handleSubmitSaveDraft = () => {
    setDraftInvoices(
      draftInvoices ? [...draftInvoices, draftInvoice] : [draftInvoice]
    );
    setDraftInvoice({ ...defaultDraftInvoice, id: getUuid() });
  };
  const handleActiveDraft = (id: string, checked: boolean) => {
    const currentDraft = draftInvoices?.find((draft) => draft.id === id);
    if (!currentDraft) return;
    if (checked) {
      if (draftsChecked?.length) {
        setDraftsChecked([
          ...draftsChecked,
          { ...currentDraft, checked: true }
        ]);
      } else {
        setDraftsChecked([{ ...currentDraft, checked: true }]);
      }
    } else {
      if (!draftsChecked?.length) return;
      const hasDraft = draftsChecked?.find((draft) => draft.id === id);
      if (hasDraft) {
        const newDraft = draftsChecked.filter((draft) => draft.id !== id);
        setDraftsChecked(newDraft);
      }
    }
  };

  const onSaveSubmit = async () => {
    try {
      if (!draftsChecked) return;
      await draftsChecked.forEach((draft) => addInvoices({ invoices: draft }));
      setDraftsChecked([]);
      const newDraftInvoice =
        draftInvoices?.filter((draft) => draft.checked === true) || [];
      setDraftInvoices(newDraftInvoice);
      showToast({
        variant: "success",
        content: `Save success!`
      });
    } catch (error) {
      showToast({
        variant: "failed",
        content: `Save failed!`
      });
    }
  };

  return (
    <CreateInvoiceView
      onSubmitSaveDraft={handleSubmitSaveDraft}
      handleFormInvoice={(key: TDraftInvoice, value) => {
        setDraftInvoice((prev: IDraftInvoice) => {
          return { ...prev, [key]: value };
        });
      }}
      onSaveSubmit={onSaveSubmit}
      handleActiveDraft={handleActiveDraft}
      activeSaveBtn={!!draftsChecked?.length}
    />
  );
};

export default CreateInvoiceContainer;
