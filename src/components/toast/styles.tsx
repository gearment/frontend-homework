import styled from "styled-components";

import { TToastVariant } from ".";
import { CommonColors } from "constants/style";

export const ToastStyled = styled.div<{ variant: TToastVariant }>`
  position: fixed;
  z-index: 999999;
  left: 50%;
  top: 50px;
  transform: translate(-50%, 0);
  padding: 16px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  min-width: 320px;
  box-sizing: border-box;
  max-width: 100%;
  background-color: ${({ variant }) => {
    switch (variant) {
      case "success":
        return CommonColors.Green[500];
      case "warning":
        return CommonColors.Yellow[500];
      case "failed":
        return CommonColors.Red[500];
      case "info":
        return CommonColors.Primary[500];
      case "default":
        return CommonColors.Neutral[900];
    }
  }};
  color: ${({ variant }) => {
    switch (variant) {
      case "success":
      case "failed":
      case "info":
      case "default":
        return CommonColors.Mono.White;
      case "warning":
        return CommonColors.Neutral[900];
    }
  }};
`;
export const ToastTextStyled = styled.div`
  flex-grow: 1;
  padding: 0 24px 0 8px;
`;
export const ToastIconStyled = styled.div`
  flex-shrink: 0;
`;

export const ToastCloseStyled = styled.div<{ variant: TToastVariant }>`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  cursor: pointer;
  opacity: 0.5;

  path {
    fill: ${({ variant }) => {
      switch (variant) {
        case "success":
        case "default":
        case "failed":
        case "info":
          return CommonColors.Mono.White;
        case "warning":
          return CommonColors.Neutral[900];
      }
    }};
  }
`;
