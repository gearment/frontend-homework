import { Header } from "components/header";
import { Sidebar } from "components/sidebar";
import React, { useEffect, useState } from "react";
import { MicroInvoiceContentStyled, MicroInvoiceWrapperStyled } from "./styled";
import MainContentSidebar from "components/sidebar/main-content-sidebar";

type MicroInvoiceContainerProps = {
  open?: boolean;
};

const MicroInvoiceContainer: React.FC<MicroInvoiceContainerProps> = ({
  open
}) => {
  return (
    <MicroInvoiceWrapperStyled>
      <Sidebar />
      <MicroInvoiceContentStyled>
        <Header />
        <MainContentSidebar />
      </MicroInvoiceContentStyled>
    </MicroInvoiceWrapperStyled>
  );
};

export default MicroInvoiceContainer;
