import { FrameNode, BoxNode, NodeElement } from "../types/node-element";
import { parseNode } from "./parseNode";

export function parseFrameNode(node: any): FrameNode | BoxNode {
  const style: Record<string, any> = {};

  if (node.fills?.[0]?.color) {
    style.backgroundColor = rgbaFromColor(node.fills[0].color);
  }

  const children: NodeElement[] = Array.isArray(node.children)
    ? node.children
        .map((child: any) => parseNode(child))
        .filter((c: NodeElement | null): c is NodeElement => c !== null)
    : [];

  const name = node.name ?? "";
  if (
    name.startsWith("page:") ||
    name.startsWith("layout:") ||
    name.startsWith(":page") ||
    name.startsWith(":layout")
  ) {
    return { type: "frame", style, children };
  }

  return { type: "box", style, children };
}

function rgbaFromColor(c: any): string {
  const r = Math.round(c.r * 255);
  const g = Math.round(c.g * 255);
  const b = Math.round(c.b * 255);
  const a = c.a !== undefined ? c.a : 1;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

