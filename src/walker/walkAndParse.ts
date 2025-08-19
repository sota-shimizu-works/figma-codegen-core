import fs from "fs";
import path from "path";
import { parseNode } from "../parser/parseNode";

type NodeMetaTree = {
  id: string;
  name: string;
  type: string;
  style?: any;
  content?: string | null;
  children?: NodeMetaTree[];
};

type WalkResult = {
  pages: NodeMetaTree[];
  layouts: NodeMetaTree[];
  components: NodeMetaTree[];
};

export function walkAndParse(root: any): WalkResult {
  const result: WalkResult = {
    pages: [],
    layouts: [],
    components: [],
  };

  function walk(node: any): NodeMetaTree | null {
    const parsedNode = parseNode(node);
    const { id, name, type } = node;

    if (!name || typeof name !== "string") return null;
    if (name.startsWith("ignore")) return null;

    const children: NodeMetaTree[] = [];

    if (Array.isArray(node.children)) {
      for (const child of node.children) {
        const parsedChild = walk(child);
        if (parsedChild) children.push(parsedChild);
      }
    }

    const nodeMeta: NodeMetaTree = {
      id,
      name,
      type,
      style:
        parsedNode && "style" in parsedNode ? (parsedNode as any).style : {},
      content:
        parsedNode && "content" in parsedNode ? parsedNode.content : null,
      ...(children.length > 0 ? { children } : {}),
    };

    if (name.startsWith("page:")) {
      result.pages.push(nodeMeta);
      return null;
    } else if (name.startsWith("layout:")) {
      result.layouts.push(nodeMeta);
      return null;
    } else if (type === "COMPONENT") {
      result.components.push(nodeMeta);
      return null;
    }

    return nodeMeta;
  }

  walk(root);

  const filePath = path.resolve(process.cwd(), "figma-walk-result-debug.json");
  fs.writeFileSync(filePath, JSON.stringify(result, null, 2), "utf-8");

  return result;
}
