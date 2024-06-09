import { DatePicker, DatePickerProps } from "antd";

type TDatePicker = {
  onChange: DatePickerProps["onChange"];
  placeholder?: string;
  style?: React.CSSProperties;
};

const DatePickerCustom: React.FC<TDatePicker> = ({
  onChange,
  placeholder,
  style,
  ...props
}) => {
  return (
    <DatePicker
      onChange={onChange}
      placeholder={placeholder}
      style={style}
      {...props}
    />
  );
};

export default DatePickerCustom;
