import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue
} from "react-hook-form";

export type TRHForm = {
  register: UseFormRegister<any>;
  getValues: UseFormGetValues<any>;
  setValue: UseFormSetValue<any>;
};
