import { ISidebarItems } from "interfaces/invoices";
import { useState } from "react";
import {
  ChildItemWrapperStyled,
  GroupSidebarContentStyled,
  GroupWrapperItemStyled,
  ItemIconStyled,
  ItemTitleStyled
} from "./styled";
import classNames from "classnames";
import { ReactComponent as ChevUpIcon } from "assets/icons/chev-up-icon.svg";
import { ReactComponent as ChevDownIcon } from "assets/icons/chev-down-icon.svg";
import { useCommonStore } from "stores/common.store";

interface IGroupSidebarContent {
  item: ISidebarItems;
}

const GroupSidebarContent = ({ item }: IGroupSidebarContent) => {
  const [active, setActive] = useState(false);
  const { setSelectTab, selectTab } = useCommonStore();
  return (
    <GroupSidebarContentStyled>
      <GroupWrapperItemStyled
        className={classNames("group-wrapper", {
          "has-child": !!item?.items?.length,
          "active-sidebar-item": item.selectTab === selectTab
        })}
        onClick={() => {
          setActive(!active);
          setSelectTab(item.selectTab || null);
        }}
      >
        <div className="item-icon-wrapper">
          <ItemIconStyled>
            <item.icon />
          </ItemIconStyled>
          <ItemTitleStyled>{item.title}</ItemTitleStyled>
        </div>
        {item?.items && (active ? <ChevUpIcon /> : <ChevDownIcon />)}
      </GroupWrapperItemStyled>
      {item?.items && (
        <ChildItemWrapperStyled
          className={classNames("child-item-wrapper", { open: active })}
        >
          {item.items.map((item) => (
            <GroupWrapperItemStyled
              key={item.id}
              className={classNames("group-wrapper", {
                "active-sidebar-item": item.selectTab === selectTab
              })}
              onClick={() => setSelectTab(item.selectTab || null)}
            >
              <ItemIconStyled>
                <item.icon />
              </ItemIconStyled>
              <ItemTitleStyled>{item.title}</ItemTitleStyled>
            </GroupWrapperItemStyled>
          ))}
        </ChildItemWrapperStyled>
      )}
    </GroupSidebarContentStyled>
  );
};

export default GroupSidebarContent;
