import React from "react";
import { HTML_ELEMENTS } from "constants/common";
import { ReactComponent as RippleSVG } from "assets/icons/ripple.svg";
import { LoadingWrapper, Spinner } from "./styled";

type GlobalLoadingProps = {
  showLoading?: boolean;
  size?: number;
  disableLoadingIcon?: boolean;
  showOverlay?: boolean;
};

const GlobalLoadingContainer: React.FC<GlobalLoadingProps> = ({
  showLoading,
  size,
  disableLoadingIcon,
  showOverlay = false
}) => {
  return (
    <LoadingWrapper
      className={HTML_ELEMENTS.CLASS.GLOBAL_LOADING}
      id={HTML_ELEMENTS.ID.GLOBAL_LOADING}
      $show={showLoading}
      size={size}
      $showOverlay={showOverlay}
    >
      <Spinner>
        {!disableLoadingIcon && <RippleSVG width={60} height={60} />}
      </Spinner>
    </LoadingWrapper>
  );
};

export default GlobalLoadingContainer;
