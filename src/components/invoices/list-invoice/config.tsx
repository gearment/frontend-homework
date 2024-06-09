import SelectCustom from "components/control-style/select";
import {
  ApplyBtnWrapperStyled,
  DropdownStyled,
  InvoiceAllConfStyled,
  InvoiceAllLeftConfStyled,
  MoreBtnWrapperStyled
} from "./styled";
import DatePickerCustom from "components/control-style/date-picker";
import React, { useState } from "react";
import { FilterFilled } from "@ant-design/icons";
import { MenuProps } from "antd";
import { Switch } from "@mui/material";
import CheckBtnCustom from "components/control-style/checkbox";

const LeftConfigStyle = {
  width: "140px"
};

const InvoiceAllConfig = () => {
  return (
    <InvoiceAllConfStyled className="InvoiceAllConfStyled">
      <InvoiceAllLeftConfStyled>
        <SelectCustom
          placeholder="All contractors"
          handleChange={() => {}}
          style={LeftConfigStyle}
          options={[{ value: "option 1", label: "option 1" }]}
        />
        <SelectCustom
          placeholder="VAT"
          handleChange={() => {}}
          style={LeftConfigStyle}
          options={[{ value: "option 1", label: "option 1" }]}
        />
        <DatePickerCustom
          onChange={(date, dateString) => {}}
          placeholder="From"
          style={LeftConfigStyle}
        />
        <DatePickerCustom
          onChange={(date, dateString) => {}}
          placeholder="To"
          style={LeftConfigStyle}
        />
        <SelectCustom
          placeholder="All statuses"
          handleChange={() => {}}
          style={LeftConfigStyle}
          options={[{ value: "option 1", label: "option 1" }]}
        />
      </InvoiceAllLeftConfStyled>

      <MoreBtn open />
    </InvoiceAllConfStyled>
  );
};

type TMoreBtn = {
  open: boolean;
};

const items: MenuProps["items"] = [
  {
    key: "created",
    label: "Created",
    type: "group",
    className: "group-custom-class",
    children: [
      {
        key: "created-all",
        label: "All",
        icon: (
          <CheckBtnCustom
            isOn={false}
            onChange={(checked) => {
              console.log("onClick checkbox", checked);
            }}
          />
        )
      },
      {
        key: "one-day",
        label: "One day ago",
        icon: (
          <CheckBtnCustom
            isOn={false}
            onChange={(checked) => {
              console.log("onClick checkbox", checked);
            }}
          />
        )
      },
      {
        key: "one-week",
        label: "One week ago",
        icon: (
          <CheckBtnCustom
            isOn={false}
            onChange={(checked) => {
              console.log("onClick checkbox", checked);
            }}
          />
        )
      },
      {
        key: "one-month",
        label: "One month ago",
        icon: (
          <CheckBtnCustom
            isOn={false}
            onChange={(checked) => {
              console.log("onClick checkbox", checked);
            }}
          />
        )
      },
      {
        key: "one-year",
        label: "One year +",
        icon: (
          <CheckBtnCustom
            isOn={false}
            onChange={(checked) => {
              console.log("onClick checkbox", checked);
            }}
          />
        )
      }
    ]
  },
  {
    key: "vat",
    label: "Vat",
    type: "item",
    className: "ant-dropdown-menu-item-group-title",
    icon: (
      <Switch
        defaultChecked
        onChange={() => {
          console.log("Switch");
        }}
      />
    ),
    style: { display: "flex", flexDirection: "row-reverse" }
  },
  {
    key: "prepared-by",
    label: "Prepared by",
    type: "group",
    children: [
      {
        key: "all",
        label: "All",
        icon: (
          <CheckBtnCustom
            isOn={false}
            onChange={(checked) => {
              console.log("onClick checkbox", checked);
            }}
          />
        )
      },
      {
        key: "merry-spencer",
        label: "Merry Spencer",
        icon: (
          <CheckBtnCustom
            isOn={false}
            onChange={(checked) => {
              console.log("onClick checkbox", checked);
            }}
          />
        )
      }
    ]
  },
  {
    key: "filter-btn",
    type: "item",
    className: "filter-btn-ants",
    icon: (
      <ApplyBtnWrapperStyled
        type="primary"
        onClick={() => {
          console.log("apply filter");
        }}
      >
        Apply Filters
      </ApplyBtnWrapperStyled>
    ),
    style: { display: "flex", flexDirection: "row-reverse" }
  }
];

const MoreBtn: React.FC<TMoreBtn> = ({ open }) => {
  const [moreOptions, setMoreOptions] = useState(false);
  if (!open) return <React.Fragment />;
  return (
    <DropdownStyled
      menu={{ items }}
      placement="bottomLeft"
      trigger={["click"]}
      className="DropdownStyled"
      open={moreOptions}
    >
      <MoreBtnWrapperStyled
        icon={<FilterFilled />}
        iconPosition="end"
        onClick={() => setMoreOptions(!moreOptions)}
      >
        More
      </MoreBtnWrapperStyled>
    </DropdownStyled>
  );
};

export { InvoiceAllConfig };
