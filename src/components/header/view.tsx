import React from "react";
import {
  ControlHeaderWrapper,
  HeaderTitle,
  HeaderWrapperStyled
} from "./styled";

interface IHeaderView {}

const HeaderView = ({}: IHeaderView) => {
  return (
    <HeaderWrapperStyled>
      <HeaderTitle>Invoices</HeaderTitle>
      <ControlHeaderWrapper></ControlHeaderWrapper>
    </HeaderWrapperStyled>
  );
};

export default HeaderView;
