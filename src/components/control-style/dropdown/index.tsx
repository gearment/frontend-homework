import { Dropdown } from "antd";
import React from "react";

type TDropdownMenuCustom = {
  open: boolean;
  children: React.ReactNode;
};

const DropdownMenuCustom: React.FC<TDropdownMenuCustom> = ({
  open,
  children
}) => {
  if (!open) return <React.Fragment />;
  return <Dropdown>{children}</Dropdown>;
};

export default DropdownMenuCustom;
