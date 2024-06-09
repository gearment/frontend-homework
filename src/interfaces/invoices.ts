import { NavItemEnum } from "constants/common";
import { FunctionComponent, SVGProps } from "react";

export interface ISidebarItem {
  id: string;
  icon: FunctionComponent<
    SVGProps<SVGSVGElement> & { title?: string | undefined }
  >;
  title: string;
  selectTab?: NavItemEnum;
}

export interface ISidebarItems extends ISidebarItem {
  items?: ISidebarItem[];
}

export interface ISidebarGroup {
  group: string;
  items: ISidebarItems[];
}

export enum FieldType {
  DATE = "DATE",
  DROPDOWN = "DROPDOWN",
  INPUT = "INPUT",
  CHECKBOX = "CHECKBOX"
}

export interface IFieldsConfig {
  type: FieldType;
  placeholder?: string;
  options?: string[];
}

export interface IInvoiceTags {
  key: string;
  name: string;
  fieldsConfig?: () => JSX.Element;
}

export interface IInvoices {
  id: string;
  builledTo: string;
  invoiceDate: String;
  status: string;
  VAT: boolean;
}

export interface IDraftInvoice {
  id: string;
  documentNumber: string;
  documentType: string;
  prepared: string;
  contractor: string;
  format: string;
  bankAccount: string;
  invoiceDate: string;
  dueDate: string;
  payment: string;
  checked?: boolean;
}

export type TDraftInvoice = keyof IDraftInvoice;
