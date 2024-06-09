import { createContext } from "react";

export interface GlobalProps {}

export interface IGlobalAppContext {
  common?: {
    globalProps?: GlobalProps;
  };
}

export interface IAppContext {
  appContext: IGlobalAppContext;
  setAppContext: (values: IGlobalAppContext) => void;
}

export const defaultState: IAppContext = {
  appContext: {
    common: {}
  },
  // eslint-disable-next-line no-empty-pattern
  setAppContext: ({}) => {}
};

export const AppContext = createContext<IAppContext>({ ...defaultState });
