import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { NavItemEnum } from "constants/common";
import { IDraftInvoice, IInvoices } from "interfaces/invoices";

// define types for state values and actions separately
type State = {
  selectTab: NavItemEnum | null;
  sidebarExpand: boolean;
  params: any;
  invoices: IInvoices[] | null;
  draftInvoices: IDraftInvoice[] | null;
};

type Actions = {
  reset: () => void;
  setSelectTab: (tab: NavItemEnum | null, params?: any) => void;
  setSidebarExpand: (value: boolean) => void;
  setParams: (value: any) => void;
  setInvoices: (value: IInvoices[]) => void;
  setDraftInvoices: (value: IDraftInvoice[]) => void;
};

// define the initial state
const initialState: State = {
  selectTab: null,
  sidebarExpand: false,
  params: {},
  invoices: [],
  draftInvoices: []
};

export const useCommonStore = create<State & Actions>()(
  immer((set) => ({
    ...initialState,
    reset: () => set(initialState),
    setSelectTab: (tab, params) =>
      set((state) => {
        state.selectTab = tab;
        state.params = params;
      }),
    setSidebarExpand: (value: boolean) =>
      set((state) => {
        state.sidebarExpand = value;
      }),
    setParams: (value: any) =>
      set((state) => {
        state.params = value;
      }),
    setInvoices: (value: IInvoices[] | null) =>
      set((state) => {
        state.invoices = value;
      }),
    setDraftInvoices: (value: IDraftInvoice[] | null) =>
      set((state) => {
        state.draftInvoices = value;
      })
  }))
);
