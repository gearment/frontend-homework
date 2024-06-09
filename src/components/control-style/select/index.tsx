import { Select } from "antd";
import { SelectCustomStyled } from "./styled";

type TSelectCustom = {
  defaultValue?: string;
  handleChange: (value: any) => void;
  options: IOptions[];
  style?: React.CSSProperties;
  placeholder?: string;
};

type IOptions = {
  value: string;
  label: string;
  disable?: boolean;
};

const SelectCustom: React.FC<TSelectCustom> = ({
  defaultValue,
  handleChange,
  options,
  style,
  placeholder,
  ...props
}) => {
  return (
    <SelectCustomStyled
      placeholder={placeholder}
      defaultValue={defaultValue}
      style={style}
      onChange={handleChange}
      options={options}
      {...props}
    />
  );
};

export default SelectCustom;
