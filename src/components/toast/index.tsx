import React, {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState
} from "react";
import { createPortal } from "react-dom";

import { ReactComponent as BellIconSvg } from "assets/icons/bell.svg";
import { ReactComponent as CircleCheckIconSvg } from "assets/icons/circle-check.svg";
import { ReactComponent as CircleCloseIconSvg } from "assets/icons/circle-close.svg";
import { ReactComponent as CircleInfoIconSvg } from "assets/icons/circle-info.svg";
import { ReactComponent as CloseIconSvg } from "assets/icons/close.svg";
import { ReactComponent as WarningIconSvg } from "assets/icons/warning.svg";
import {
  ToastCloseStyled,
  ToastIconStyled,
  ToastStyled,
  ToastTextStyled
} from "./styles";
import { Typography } from "antd";

export type TToastVariant =
  | "default"
  | "success"
  | "warning"
  | "failed"
  | "info";

interface IToastProps {
  variant: TToastVariant;
  content: string;
  onClose?: () => void;
}

interface IShowToastParams {
  variant?: TToastVariant;
  content: string;
  duration?: number;
}

type ToastContextType = {
  showToast: (object: IShowToastParams) => void;
};

export const ToastContext = createContext<ToastContextType>({
  showToast: () => {}
});

export const useToastContext = () => useContext(ToastContext);

const Toast: FC<IToastProps> = ({ variant, content, onClose }) => {
  function renderIcon() {
    switch (variant) {
      case "success":
        return <CircleCheckIconSvg />;
      case "warning":
        return <WarningIconSvg />;
      case "failed":
        return <CircleCloseIconSvg />;
      case "info":
        return <CircleInfoIconSvg />;
      default:
        return <BellIconSvg />;
    }
  }
  return (
    <ToastStyled variant={variant}>
      <ToastIconStyled>{renderIcon()}</ToastIconStyled>
      <ToastTextStyled>
        <Typography>{content}</Typography>
      </ToastTextStyled>
      <ToastCloseStyled variant={variant} onClick={onClose}>
        <CloseIconSvg />
      </ToastCloseStyled>
    </ToastStyled>
  );
};

type ToastProviderProps = {
  children: ReactNode;
};

const ToastProvider: FC<ToastProviderProps> = ({ children }) => {
  const [toast, setToast] = useState<IToastProps | null>(null);

  const showToast = useCallback(
    ({
      variant = "default",
      content = "",
      duration = 3000
    }: {
      variant: TToastVariant;
      content: string;
      duration?: number;
    }) => {
      setToast({ variant, content });
      setTimeout(() => {
        setToast(null);
      }, duration);
    },
    []
  );

  const toastContextValue = React.useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={toastContextValue as any}>
      {children}
      {toast &&
        createPortal(
          <Toast
            variant={toast.variant}
            content={toast.content}
            onClose={() => setToast(null)}
          />,
          document.body
        )}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
