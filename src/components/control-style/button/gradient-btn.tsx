import { TinyColor } from "@ctrl/tinycolor";
import { Button, ConfigProvider } from "antd";
import { ButtonSize, ButtonType } from "antd/es/button";

type TGradientButton = {
  colors: string[];
  type: Partial<ButtonType>;
  size: Partial<ButtonSize>;
  icon?: React.ReactNode;
  name: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLElement>;
};

const getHoverColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());

const getActiveColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

export const GradientButton: React.FC<TGradientButton> = ({
  colors,
  type,
  size,
  icon,
  name,
  style,
  onClick,
  ...props
}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: `linear-gradient(135deg, ${colors.join(", ")})`,
            colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(
              colors
            ).join(", ")})`,
            colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(
              colors
            ).join(", ")})`,
            lineWidth: 0
          }
        }
      }}
    >
      <Button
        type={type}
        size={size}
        icon={icon}
        style={style}
        onClick={onClick}
        {...props}
      >
        {name}
      </Button>
    </ConfigProvider>
  );
};
