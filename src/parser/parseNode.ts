import { NodeElement } from "../types/node-element";
import { parseTextNode } from "./parseTextNode";

export function parseNode(node: any): NodeElement | null {
  switch (node.type) {
    case "TEXT":
      return parseTextNode(node);
    default:
      return null;
  }
}
