import {
  GroupWrapperStyled,
  SidebarContent,
  SidebarHelperWapperStyled,
  SidebarTitleWrapper,
  SidebarWrapperStyled
} from "./styled";
import { ReactComponent as MicroIcon } from "assets/icons/microIcon.svg";
import GroupSidebarContent from "./group-sidebar-content";
import { SIDEBAR_LIST, SIDEBAR_TITLE } from "constants/common";

interface ISidebarView {}

const SidebarView = ({}: ISidebarView) => {
  return (
    <SidebarWrapperStyled className="d-flex">
      <SidebarTitleWrapper className="d-flex">
        <MicroIcon />
        <div className="title">{SIDEBAR_TITLE}</div>
      </SidebarTitleWrapper>
      <SidebarContent>
        {SIDEBAR_LIST.map((group) => (
          <GroupWrapperStyled key={group.group}>
            <div className="group-title">{group.group}</div>
            {group.items.map((item) => (
              <GroupSidebarContent item={item} key={item.id} />
            ))}
          </GroupWrapperStyled>
        ))}
      </SidebarContent>
      <SidebarHelperWapperStyled></SidebarHelperWapperStyled>
    </SidebarWrapperStyled>
  );
};

export default SidebarView;
