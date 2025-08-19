"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.walkAndParse = walkAndParse;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const parseNode_1 = require("../parser/parseNode");
function walkAndParse(root) {
    const result = {
        pages: [],
        layouts: [],
        components: [],
    };
    function walk(node) {
        const parsedNode = (0, parseNode_1.parseNode)(node);
        const { id, name, type } = node;
        if (!name || typeof name !== "string")
            return null;
        if (name.startsWith("ignore:"))
            return null;
        const children = [];
        if (Array.isArray(node.children)) {
            for (const child of node.children) {
                const parsedChild = walk(child);
                if (parsedChild)
                    children.push(parsedChild);
            }
        }
        const nodeMeta = Object.assign({ id,
            name,
            type, style: parsedNode && "style" in parsedNode ? parsedNode.style : {}, content: parsedNode && "content" in parsedNode ? parsedNode.content : null }, (children.length > 0 ? { children } : {}));
        if (name.startsWith("page:")) {
            result.pages.push(nodeMeta);
            return null;
        }
        else if (name.startsWith("layout:")) {
            result.layouts.push(nodeMeta);
            return null;
        }
        else if (type === "COMPONENT") {
            result.components.push(nodeMeta);
            return null;
        }
        return nodeMeta;
    }
    walk(root);
    const filePath = path_1.default.resolve(process.cwd(), "figma-walk-result-debug.json");
    fs_1.default.writeFileSync(filePath, JSON.stringify(result, null, 2), "utf-8");
    return result;
}
