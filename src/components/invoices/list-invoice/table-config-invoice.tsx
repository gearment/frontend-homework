import { useEffect, useState } from "react";
import { TableConfigInvoicesStyled } from "./styled";
import { IInvoiceTags } from "interfaces/invoices";
import { INVOICE_TAGS, NavItemEnum } from "constants/common";
import classNames from "classnames";
import { ReactComponent as AddCircle } from "assets/icons/add-circle.svg";
import { GradientButton } from "components/control-style/button/gradient-btn";
import { useCommonStore } from "stores/common.store";

const TableConfigInvoices = () => {
  const [tags, setTags] = useState<IInvoiceTags[]>(INVOICE_TAGS);
  const [currentTag, setCurrentTag] = useState<IInvoiceTags | null>();
  const { setSelectTab } = useCommonStore();

  useEffect(() => {
    if (tags.length > 0) {
      setCurrentTag(tags[0]);
    }
  }, []);

  return (
    <TableConfigInvoicesStyled.CONTAINER className="TableConfigInvoicesStyled">
      <TableConfigInvoicesStyled.CONFIG_TAGS>
        <TableConfigInvoicesStyled.TAGS>
          {tags.map((tag) => (
            <TableConfigInvoicesStyled.TAG
              key={tag.key}
              className={classNames({
                "active-tag": tag.key === currentTag?.key
              })}
              onClick={() => setCurrentTag(tag)}
            >
              {tag.name}
            </TableConfigInvoicesStyled.TAG>
          ))}
        </TableConfigInvoicesStyled.TAGS>
        <GradientButton
          type="primary"
          size="large"
          icon={<AddCircle />}
          colors={["#284CCC", "#00127F"]}
          name="Create a new invoices"
          onClick={() => setSelectTab(NavItemEnum.CREATE_NEW_INVOICE)}
        />
      </TableConfigInvoicesStyled.CONFIG_TAGS>
      <TableConfigInvoicesStyled.CONFIG_FIELDS>
        {currentTag?.fieldsConfig && <currentTag.fieldsConfig />}
      </TableConfigInvoicesStyled.CONFIG_FIELDS>
    </TableConfigInvoicesStyled.CONTAINER>
  );
};

export default TableConfigInvoices;
