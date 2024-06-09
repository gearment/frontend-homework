import { REACT_APP_DOMAIN_API } from "constants/common";
import { customFetch } from "helpers/custom-fetch";
import { IDraftInvoice } from "interfaces/invoices";

export const getListInvoices = async () => {
  try {
    const res = await customFetch(`${REACT_APP_DOMAIN_API}/invoices`, {
      method: "GET"
    });
    console.log("data", res);
    if (res) return res;
  } catch (error) {
    console.log("[Err] getListInvoices", error);
  }
};

export const addInvoices = async ({
  invoices
}: {
  invoices: IDraftInvoice;
}) => {
  try {
    const res = await customFetch(`${REACT_APP_DOMAIN_API}/invoices`, {
      method: "POST",
      body: JSON.stringify(invoices)
    });
    console.log("data", res);
    if (res) return res;
  } catch (error) {
    console.log("[Err] getListInvoices", error);
  }
};
