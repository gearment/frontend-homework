import { Button } from "antd";
import { COLORS } from "constants/style";
import styled from "styled-components";

const CommonWrapper = styled.div`
  background-color: #fff;
  margin-right: 24px;
  border-radius: 12px;
  padding: 16px;
`;

const CreateInvoiceWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  height: 100%;
  position: relative;
`;

const CreateInvoiceFooterWrapper = styled(CommonWrapper)`
  height: 30px;
  overflow-y: scroll;
  justify-content: space-between;
  gap: 12px;
  color: var(--t-color);
  position: absolute;
  bottom: 0;
  width: calc(100% - 56px);
  margin-bottom: 12px;
`;

const CreateInvoiceFieldsWrapper = styled(CommonWrapper)``;

const CreateInvoiceDraftWrapper = styled(CommonWrapper)``;

const CreateInvoiceSaveDraftBtn = styled(Button)`
  border: 1px solid ${COLORS.BLUE_STANDARD[900]};
  color: var(--t-color) !important;

  &:hover {
    border-color: ${COLORS.BLUE_STANDARD[900]} !important;
    opacity: 0.7;
  }
`;

const CreateInvoiceFieldsRow = styled.div`
  display: flex;
  gap: 12px;
`;

const CreateInvoiceInfo = styled.div`
  height: 100%;
  align-items: center;
`;

const CreateInvoiceInfoGroup = styled.div``;

const CreateInvoiceInfoText = styled.div``;

const HorizonStyle = styled.div`
  height: 100%;
  border-right: 2px solid #00127f;
  margin: 0 16px;
`;

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

export {
  CreateInvoiceWrapperStyled,
  CreateInvoiceFooterWrapper,
  CreateInvoiceFieldsWrapper,
  CreateInvoiceDraftWrapper,
  CreateInvoiceSaveDraftBtn,
  CreateInvoiceFieldsRow,
  CreateInvoiceInfo,
  CreateInvoiceInfoGroup,
  CreateInvoiceInfoText,
  HorizonStyle,
  TableStyled
};
