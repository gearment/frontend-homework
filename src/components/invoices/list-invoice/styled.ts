import { Button, Dropdown } from "antd";
import styled from "styled-components";

const InvoicesWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: stretch;
  height: 100%;
`;

const CommonContainerStyled = styled.div`
  background-color: #fff;
  margin-right: 24px;
  height: 260px;
  overflow-y: scroll;
  background: #fff;
`;

const TableConfigInvoicesStyled = {
  CONTAINER: styled(CommonContainerStyled)`
    border-radius: 12px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
  `,
  CONFIG_TAGS: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  CONFIG_FIELDS: styled.div``,
  TAGS: styled.div`
    display: flex;
    gap: 24px;
    font-size: 16px !important;
    align-items: center;
  `,
  TAG: styled.div`
    padding: 8px 6px;
    cursor: pointer;
    color: var(--t-color);

    &:hover {
      background-color: #f2f3fc;
      border-radius: 4px;
    }
  `,
  CREATE_INVOICES_BTN: styled(Button)`
    background: linear-gradient(
      90deg,
      rgba(44, 78, 209, 1) 0%,
      rgba(23, 50, 170, 1) 47%,
      rgba(1, 19, 128, 1) 100%
    );
  `
};

const TableDataInvoicesStyled = {
  CONTAINER: styled(CommonContainerStyled)`
    height: 500px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    padding: 0 16px 16px 16px;
  `
};

const InvoiceAllConfStyled = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InvoiceAllLeftConfStyled = styled.div`
  display: flex;
  gap: 12px;
`;

const MoreBtnWrapperStyled = styled(Button)`
  border: none !important;
  background: #f2f3fc !important;
  color: var(--t-color) !important;
  &:hover {
    opacity: 0.7;
  }
`;

const ApplyBtnWrapperStyled = styled(Button)`
  width: 100%;
  background-color: #2c4ed1;
  &:hover {
    opacity: 0.7;
  }
`;

const DropdownStyled = styled(Dropdown)`
  ul {
    width: 240px;
  }
`;

const TableContentStyled = styled.div``;

const TableWrapperStyled = styled.table``;

const TableStyled = {
  TABLE: styled.table`
    border-collapse: collapse;
    width: 100%;
  `,
  THEAD: styled.thead`
    position: sticky;
    top: 0;
    background-color: #fff;
    z-index: 4;
    height: 60px;
  `,
  TR: styled.tr`
    height: 50px;
    width: 100%;
    border-bottom: 1px solid #ccc;

    :first-child {
      text-align: center;
    }
  `,
  TH: styled.th`
    color: var(--t-color);
  `,
  TD: styled.td`
    color: var(--t-color);
  `
};

const InvoiceHeaderStyle = styled.th`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const TableRowStyle = styled.tr``;

const TableTitleControl = styled.div`
  display: flex;
  gap: 4px;
  cursor: pointer;
  width: fit-content;
  color: var(--t-color);
`;

const ExportControlStyled = styled.div`
  display: flex;
  gap: 4px;
  width: fit-content;
`;

export {
  InvoicesWrapperStyled,
  TableConfigInvoicesStyled,
  TableDataInvoicesStyled,
  InvoiceAllConfStyled,
  MoreBtnWrapperStyled,
  ApplyBtnWrapperStyled,
  DropdownStyled,
  InvoiceAllLeftConfStyled,
  TableWrapperStyled,
  InvoiceHeaderStyle,
  TableRowStyle,
  TableContentStyled,
  TableTitleControl,
  TableStyled,
  ExportControlStyled
};
