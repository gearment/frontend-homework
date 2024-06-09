import { Input } from "antd";
import React, { useRef } from "react";
import { ValidationRule } from "react-hook-form";
import { TRHForm } from "types/react-hook-form";

interface BasicInputProps {
  placeholder?: string;
  variant?: "filled" | "outlined" | "borderless";
  onBlur: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
}

const BasicInput: React.FC<BasicInputProps> = ({
  placeholder,
  variant,
  onBlur,
  ...props
}) => {
  const ref = useRef<any>();
  return (
    <Input
      ref={ref}
      placeholder={placeholder}
      variant={variant}
      onBlur={(event: React.FocusEvent<HTMLInputElement, Element>) =>
        onBlur(event)
      }
      {...props}
    />
  );
};

interface THRInputProps {
  id: string;
  required?: boolean;
  pattern?: ValidationRule<RegExp>;
  maxLength?: number;
}

const THRInput: React.FC<
  THRInputProps &
    Pick<TRHForm, "register"> &
    Pick<BasicInputProps, "placeholder" | "variant">
> = ({
  placeholder,
  variant,
  register,
  id,
  required = false,
  pattern,
  maxLength
}) => {
  const { onChange, onBlur, ...rest } = register(id, {
    required,
    pattern,
    maxLength
  });
  return (
    <BasicInput
      placeholder={placeholder}
      variant={variant}
      onBlur={onBlur}
      {...rest}
    />
  );
};

export { BasicInput, THRInput };
