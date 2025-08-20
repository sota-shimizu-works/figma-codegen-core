import { TextNode } from "../types/node-element";
import { cn } from "../utils/cn";

export function parseTextNode(node: any): TextNode {
  const lineHeightValue =
    typeof node.style?.lineHeightPercentFontSize === "number"
      ? node.style.lineHeightPercentFontSize / 100
      : typeof node.style?.lineHeightPx === "number" &&
          typeof node.style?.fontSize === "number"
        ? node.style.lineHeightPx / node.style.fontSize
        : undefined;

  const style: Record<string, any> = {};
  const tw: string[] = [];

  if (typeof node.style?.fontSize === "number") {
    style.fontSize = node.style.fontSize;
    tw.push(`text-[${node.style.fontSize}px]`);
  }

  if (typeof node.style?.fontWeight === "number") {
    style.fontWeight = node.style.fontWeight;
    tw.push(`font-[${node.style.fontWeight}]`);
  }

  if (typeof lineHeightValue === "number") {
    const lineHeight = Math.round(lineHeightValue * 100) / 100;
    style.lineHeight = lineHeight;
    tw.push(`leading-[${lineHeight}]`);
  }

  if (typeof node.style?.fontFamily === "string") {
    style.fontFamily = node.style.fontFamily;
    const fontFamily = node.style.fontFamily.replace(/'/g, "\\'");
    tw.push(`font-['${fontFamily}']`);
  }

  if (node.fills?.[0]?.color) {
    style.color = rgbaFromColor(node.fills[0].color);
    tw.push(`text-[${style.color.replace(/\s/g, "")}]`);
  }

  const tailwindClasses = tw.length ? cn(...tw) : undefined;

  return {
    type: "text",
    content: node.characters ?? "",
    style,
    ...(tailwindClasses ? { tailwindClasses } : {}),
  };
}

function rgbaFromColor(c: any): string {
  const r = Math.round(c.r * 255);
  const g = Math.round(c.g * 255);
  const b = Math.round(c.b * 255);
  const a = c.a !== undefined ? c.a : 1;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
