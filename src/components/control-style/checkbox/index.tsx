import { useState } from "react";
import { CheckBoxCustomStyled } from "./styled";

interface CheckBtnCustomProps {
  isOn: boolean;
  onChange: (checked: boolean) => void;
}

const CheckBtnCustom: React.FC<CheckBtnCustomProps> = ({
  isOn = false,
  onChange
}) => {
  const [isChecked, setIsChecked] = useState(isOn);

  const handleChange = () => {
    setIsChecked(!isChecked);
    onChange(!isChecked);
  };

  return (
    <CheckBoxCustomStyled
      type="checkbox"
      checked={isChecked}
      onChange={handleChange}
    />
  );
};

export default CheckBtnCustom;
