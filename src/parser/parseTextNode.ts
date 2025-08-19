import { TextNode } from "../types/node-element";

export function parseTextNode(node: any): TextNode {
  const lineHeightValue =
    typeof node.style?.lineHeightPercentFontSize === "number"
      ? node.style.lineHeightPercentFontSize / 100
      : typeof node.style?.lineHeightPx === "number" &&
          typeof node.style?.fontSize === "number"
        ? node.style.lineHeightPx / node.style.fontSize
        : undefined;

  return {
    type: "text",
    content: node.characters ?? "",
    style: {
      fontSize: node.style?.fontSize,
      fontWeight: node.style?.fontWeight,
      lineHeight:
        typeof lineHeightValue === "number"
          ? Math.round(lineHeightValue * 100) / 100
          : undefined,
      fontFamily: node.style?.fontFamily,
      color: node.fills?.[0]?.color
        ? rgbaFromColor(node.fills[0].color)
        : undefined,
    },
  };
}

function rgbaFromColor(c: any): string {
  const r = Math.round(c.r * 255);
  const g = Math.round(c.g * 255);
  const b = Math.round(c.b * 255);
  const a = c.a !== undefined ? c.a : 1;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
