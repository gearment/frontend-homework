import { Suspense, useState } from "react";
import {
  AppContext,
  IGlobalAppContext,
  defaultState
} from "./contexts/app.context";
import { GlobalLoading } from "components/loading";
import { MicroInvoice } from "components/micro-invoice";
import "./App.css";
import { UtilsStyled } from "styleds/utils.styled";
import ToastProvider from "components/toast";

function App() {
  const [appContext, setAppContext] = useState<IGlobalAppContext>(
    defaultState.appContext
  );

  return (
    <AppContext.Provider
      value={{
        appContext,
        setAppContext: setAppContext
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
        rel="stylesheet"
      />
      <ToastProvider>
        <Suspense fallback={<GlobalLoading showLoading />}>
          <UtilsStyled />
          <MicroInvoice />
        </Suspense>
      </ToastProvider>
    </AppContext.Provider>
  );
}

export default App;
