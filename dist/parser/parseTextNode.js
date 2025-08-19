"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTextNode = parseTextNode;
function parseTextNode(node) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const lineHeightValue = typeof ((_a = node.style) === null || _a === void 0 ? void 0 : _a.lineHeightPercentFontSize) === "number"
        ? node.style.lineHeightPercentFontSize / 100
        : typeof ((_b = node.style) === null || _b === void 0 ? void 0 : _b.lineHeightPx) === "number" &&
            typeof ((_c = node.style) === null || _c === void 0 ? void 0 : _c.fontSize) === "number"
            ? node.style.lineHeightPx / node.style.fontSize
            : undefined;
    return {
        type: "text",
        content: (_d = node.characters) !== null && _d !== void 0 ? _d : "",
        style: {
            fontSize: (_e = node.style) === null || _e === void 0 ? void 0 : _e.fontSize,
            fontWeight: (_f = node.style) === null || _f === void 0 ? void 0 : _f.fontWeight,
            lineHeight: typeof lineHeightValue === "number"
                ? Math.round(lineHeightValue * 100) / 100
                : undefined,
            fontFamily: (_g = node.style) === null || _g === void 0 ? void 0 : _g.fontFamily,
            color: ((_j = (_h = node.fills) === null || _h === void 0 ? void 0 : _h[0]) === null || _j === void 0 ? void 0 : _j.color)
                ? rgbaFromColor(node.fills[0].color)
                : undefined,
        },
    };
}
function rgbaFromColor(c) {
    const r = Math.round(c.r * 255);
    const g = Math.round(c.g * 255);
    const b = Math.round(c.b * 255);
    const a = c.a !== undefined ? c.a : 1;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}
