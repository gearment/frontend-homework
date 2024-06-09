import { COLORS } from "constants/style";
import styled from "styled-components";

const DefaultWrapperStyled = styled.div`
  * {
    font-family: Arial;
    font-size: 13px;
    --t-font-family: Inter, Arial;
    --t-color: #00127f;
  }

  .flex-grow-1 {
    flex-grow: 1;
  }

  .flex-center {
    align-items: center;
    justify-content: center;
  }

  .active-tag {
    background-color: ${COLORS.BLUE_STANDARD[800]};
    border-radius: 4px;
  }

  .active-sidebar-item {
    background-color: #132f6f;
    color: #fff;
    border-radius: 8px;
  }

  .disable-btn {
    opacity: 0.5;
    pointer-events: none;
  }
`;

const MicroInvoiceWrapperStyled = styled(DefaultWrapperStyled)`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

const MicroInvoiceContentStyled = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export { MicroInvoiceWrapperStyled, MicroInvoiceContentStyled };
