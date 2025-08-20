import { FrameNode, BoxNode } from "../types/node-element";
import { cn } from "../utils/cn";

export function parseFrameNode(node: any): FrameNode | BoxNode {
  const name = node.name ?? "";
  if (
    name.startsWith("page:") ||
    name.startsWith("layout:") ||
    name.startsWith(":page") ||
    name.startsWith(":layout")
  ) {
    return { type: "frame" };
  }

  const style: Record<string, any> = {};
  const tw: string[] = [];
  if (node.fills?.[0]?.color) {
    style.backgroundColor = rgbaFromColor(node.fills[0].color);
    tw.push(`bg-[${style.backgroundColor.replace(/\s/g, "")}]`);
  }

  if (node.layoutMode === "HORIZONTAL") {
    style.display = "flex";
    style.flexDirection = "row";
    tw.push("flex", "flex-row");
  }

  if (node.layoutMode === "GRID") {
    style.display = "grid";
    tw.push("grid");
    if (typeof node.gridColumnCount === "number") {
      style.gridTemplateColumns = `repeat(${node.gridColumnCount}, 1fr)`;
      tw.push(`grid-cols-${node.gridColumnCount}`);
    }
    if (typeof node.gridRowGap === "number") {
      style.gridRowGap = node.gridRowGap;
      tw.push(`gap-y-[${node.gridRowGap}px]`);
    }
    if (typeof node.gridColumnGap === "number") {
      style.gridColumnGap = node.gridColumnGap;
      tw.push(`gap-x-[${node.gridColumnGap}px]`);
    }
  }

  if (typeof node.paddingTop === "number") {
    style.paddingTop = node.paddingTop;
    tw.push(`pt-[${node.paddingTop}px]`);
  }
  if (typeof node.paddingRight === "number") {
    style.paddingRight = node.paddingRight;
    tw.push(`pr-[${node.paddingRight}px]`);
  }
  if (typeof node.paddingBottom === "number") {
    style.paddingBottom = node.paddingBottom;
    tw.push(`pb-[${node.paddingBottom}px]`);
  }
  if (typeof node.paddingLeft === "number") {
    style.paddingLeft = node.paddingLeft;
    tw.push(`pl-[${node.paddingLeft}px]`);
  }

  const tailwindClasses = tw.length ? cn(...tw) : undefined;

  return { type: "box", style, ...(tailwindClasses ? { tailwindClasses } : {}) };
}

function rgbaFromColor(c: any): string {
  const r = Math.round(c.r * 255);
  const g = Math.round(c.g * 255);
  const b = Math.round(c.b * 255);
  const a = c.a !== undefined ? c.a : 1;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

