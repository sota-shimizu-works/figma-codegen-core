"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseNode = parseNode;
const parseTextNode_1 = require("./parseTextNode");
function parseNode(node) {
    switch (node.type) {
        case "TEXT":
            return (0, parseTextNode_1.parseTextNode)(node);
        default:
            return null;
    }
}
