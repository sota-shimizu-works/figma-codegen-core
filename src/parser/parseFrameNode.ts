import { FrameNode, BoxNode } from "../types/node-element";

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
  if (node.fills?.[0]?.color) {
    style.backgroundColor = rgbaFromColor(node.fills[0].color);
  }

  return { type: "box", style };
}

function rgbaFromColor(c: any): string {
  const r = Math.round(c.r * 255);
  const g = Math.round(c.g * 255);
  const b = Math.round(c.b * 255);
  const a = c.a !== undefined ? c.a : 1;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

