import { CSSProperties } from "react";
import styleds, { createGlobalStyle } from "styled-components";

const styled = Object.assign(styleds, {
  createGlobalStyle
});

const spacesValues = {
  0: "0",
  "4": "4px",
  "8": "8px",
  "16": "16px"
};

const mpValues = {
  ...spacesValues,
  auto: "auto"
};

const utilities: UtilOptions[] = [
  {
    properties: ["position"],
    values: ["static", "relative", "absolute", "fixed", "sticky"]
  },
  {
    class: "overflow",
    properties: ["overflow"],
    values: ["auto", "hidden"]
  },
  {
    class: "d",
    properties: ["display"],
    values: ["auto", "none", "block", "inline", "inline-block", "flex"]
  },
  {
    class: "w",
    properties: ["width"],
    values: {
      "25": "25%",
      "50": "50%",
      "75": "75%",
      "100": "100%",
      "100vh": "100vh",
      auto: "auto"
    }
  },
  {
    class: "h",
    properties: ["height"],
    values: {
      "25": "25%",
      "50": "50%",
      "75": "75%",
      "100": "100%",
      "100vh": "100vh"
    }
  },
  {
    class: "m",
    properties: ["margin"],
    values: mpValues,
    important: true
  },
  {
    class: "mt",
    properties: ["marginTop"],
    values: mpValues,
    important: true
  },
  {
    class: "mb",
    properties: ["marginBottom"],
    values: mpValues,
    important: true
  },
  {
    class: "ms",
    properties: ["marginLeft"],
    values: mpValues,
    important: true
  },
  {
    class: "me",
    properties: ["marginRight"],
    values: mpValues,
    important: true
  },
  {
    class: "p",
    properties: ["padding"],
    values: mpValues,
    important: true
  },
  {
    class: "pt",
    properties: ["paddingTop"],
    values: mpValues,
    important: true
  },
  {
    class: "pb",
    properties: ["paddingBottom"],
    values: mpValues,
    important: true
  },
  {
    class: "ps",
    properties: ["paddingLeft"],
    values: mpValues,
    important: true
  },
  {
    class: "pe",
    properties: ["paddingRight"],
    values: mpValues,
    important: true
  },
  {
    class: "px",
    properties: ["paddingLeft", "paddingRight"],
    values: mpValues,
    important: true
  },
  {
    class: "py",
    properties: ["paddingTop", "paddingBottom"],
    values: mpValues,
    important: true
  },
  {
    class: "gap",
    properties: ["gap"],
    values: spacesValues
  },
  {
    class: "flex",
    properties: ["flexDirection"],
    values: ["column", "column-reverse", "row", "row-reverse"]
  },
  {
    class: "flex",
    properties: ["flex"],
    values: {
      fill: "1 0"
    }
  },
  {
    class: "justify",
    properties: ["justifyContent"],
    values: [
      "space-between",
      "space-around",
      "space-evenly",
      "start",
      "end",
      "center",
      "stretch"
    ]
  },
  {
    class: "align-items",
    properties: ["alignItems"],
    values: ["start", "end", "center", "stretch"]
  },
  {
    class: "text",
    properties: ["textAlign"],
    values: ["left", "center", "right", "justify"]
  },
  {
    class: "text",
    properties: ["color"],
    values: {
      muted: "#828994"
    }
  },
  {
    class: "fw",
    properties: ["fontWeight"],
    values: ["400", "500", "600", "700"],
    important: true
  },
  {
    class: "z",
    properties: ["zIndex"],
    values: ["0", "1", "2"]
  },
  {
    properties: ["textDecoration"],
    values: ["underline", "line-through"]
  },
  {
    class: "border",
    properties: ["borderTop"],
    values: {
      top: "1px solid var(--t-neutral-200)"
    }
  },
  {
    class: "border",
    properties: ["borderBottom"],
    values: {
      bottom: "1px solid var(--t-neutral-200)"
    }
  },
  {
    class: "border",
    properties: ["borderLeft"],
    values: {
      start: "1px solid var(--t-neutral-200)"
    }
  },
  {
    class: "border",
    properties: ["borderRight"],
    values: {
      end: "1px solid var(--t-neutral-200)"
    }
  }
];

export const UtilsStyled = styled.createGlobalStyle`
  ${utilities.map((ops) => {
    const mapValue = (key: string, val: string) => {
      const className = [".", ops.class ? `${ops.class}-` : "", key].join("");
      const properties = ops.properties
        .map((p) => p.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`))
        .map((prop) => `${prop}: ${val}${ops.important ? " !important" : ""};`)
        .join("");

      return `${className} { ${properties} }`;
    };

    if (Array.isArray(ops.values))
      return ops.values.map((val) => mapValue(val, val));

    return Object.entries(ops.values).map(([key, val]) => mapValue(key, val));
  })}
`;

// ======================================================================================

type UtilOptions = {
  properties: Array<keyof CSSProperties>;
  values: string[] | Record<string, string>;
  class?: string;
  important?: boolean;
};
