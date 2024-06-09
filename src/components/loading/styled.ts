import { styled } from "styled-components";

export const LoadingWrapper = styled.div<{
  $show?: boolean;
  size?: number;
  $showOverlay?: boolean;
}>`
  display: ${(props) => (props.$show ? "block" : "none")};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99999999999;
  width: ${(props) => (props.size ? `${props.size}px` : "100%")};
  height: ${(props) => (props.size ? `${props.size}px` : "100%")};
  overflow: hidden;
  position: absolute;
  inset: 0;
  background: ${(props) => (props.$showOverlay ? "#fff" : undefined)};
  opacity: ${(props) => (props.$showOverlay ? "0.3" : undefined)};
`;

export const Spinner = styled.div<{ size?: number }>`
  position: relative;
  top: calc(50% - ${(props) => (props.size ? `${props.size}px` : "30px")});
  left: calc(50% - ${(props) => (props.size ? `${props.size}px` : "30px")});
  display: inline-block;
  width: ${(props) => (props.size ? `${props.size}px` : "60px")};
  height: ${(props) => (props.size ? `${props.size}px` : "60px")};
`;
