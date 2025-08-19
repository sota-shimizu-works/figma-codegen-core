import { NodeElement } from "../types/node-element";
import { parseTextNode } from "./parseTextNode";
import { parseFrameNode } from "./parseFrameNode";

export function parseNode(node: any): NodeElement | null {
  switch (node.type) {
    case "FRAME":
      return parseFrameNode(node);
    case "TEXT":
      return parseTextNode(node);
    default:
      return null;
  }
}
