import { COLORS } from "constants/style";
import styled from "styled-components";

const SidebarWrapperStyled = styled.div`
  width: 20%;
  position: relative;
  top: 0;
  flex-direction: column;
  align-items: stretch;
`;

const SidebarTitleWrapper = styled.div`
  display: flex;
  height: 56px;
  align-items: center;
  gap: 8px;
  padding-left: 12px;

  .title {
    font-size: 18px;
    font-weight: 800;
    color: ${COLORS.BLUE_STANDARD[900]};
  }
`;

const SidebarContent = styled.div`
  height: 100%;
  margin: 8px 24px;
`;

const SidebarHelperWapperStyled = styled.div``;

const GroupWrapperStyled = styled.div`
  .group-title {
    margin: 8px 0;
    font-size: 12px;
    font-weight: 600;
    color: ${COLORS.BLUE_STANDARD[900]};
  }
`;

const ItemIconStyled = styled.div`
  height: 24px;
`;

const ItemTitleStyled = styled.div`
  font-size: 16px !important;
`;

const GroupWrapperItemStyled = styled.div`
  margin: 8px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 8px 6px;
  color: ${COLORS.BLUE_STANDARD[900]};
  cursor: pointer;

  &:hover {
    border-radius: 6px;
    color: ${COLORS.DEFAULT.WHITE};
    background-color: ${COLORS.BLUE_STANDARD[900]};
  }
`;

const ChildItemWrapperStyled = styled.div`
  display: none;
`;

const GroupSidebarContentStyled = styled.div`
  .has-child {
    flex-direction: row;
    justify-content: space-between;
  }
  .item-icon-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .open {
    display: block;
  }
  .item-level-2 {
    padding-left: 32px;
  }
  .child-item-wrapper {
    padding-left: 32px;
  }
`;

const InvoiceWrapperStyled = styled.div`
  background-color: ${COLORS.BLUE_STANDARD[200]};
  height: 100%;
  border-top-left-radius: 20px;
  padding: 24px 0 0 24px;
`;

const InVoiceContentStyled = styled.div`
  height: 100%;
`;

export {
  SidebarWrapperStyled,
  SidebarTitleWrapper,
  SidebarContent,
  SidebarHelperWapperStyled,
  GroupWrapperStyled,
  ItemIconStyled,
  ItemTitleStyled,
  GroupWrapperItemStyled,
  ChildItemWrapperStyled,
  GroupSidebarContentStyled,
  InvoiceWrapperStyled,
  InVoiceContentStyled
};
