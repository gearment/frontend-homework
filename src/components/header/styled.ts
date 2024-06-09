import styled from "styled-components";

const HeaderWrapperStyled = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderTitle = styled.div`
  font-size: 24px;
  color: var(--t-color);
  cursor: default;
  font-weight: 600;
`;

const ControlHeaderWrapper = styled.div``;

export { HeaderWrapperStyled, HeaderTitle, ControlHeaderWrapper };
