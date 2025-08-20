"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTextNode = parseTextNode;
const cn_1 = require("../utils/cn");
function parseTextNode(node) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const lineHeightValue = typeof ((_a = node.style) === null || _a === void 0 ? void 0 : _a.lineHeightPercentFontSize) === "number"
        ? node.style.lineHeightPercentFontSize / 100
        : typeof ((_b = node.style) === null || _b === void 0 ? void 0 : _b.lineHeightPx) === "number" &&
            typeof ((_c = node.style) === null || _c === void 0 ? void 0 : _c.fontSize) === "number"
            ? node.style.lineHeightPx / node.style.fontSize
            : undefined;
    const style = {};
    const tw = [];
    if (typeof ((_d = node.style) === null || _d === void 0 ? void 0 : _d.fontSize) === "number") {
        style.fontSize = node.style.fontSize;
        tw.push(`text-[${node.style.fontSize}px]`);
    }
    if (typeof ((_e = node.style) === null || _e === void 0 ? void 0 : _e.fontWeight) === "number") {
        style.fontWeight = node.style.fontWeight;
        tw.push(`font-[${node.style.fontWeight}]`);
    }
    if (typeof lineHeightValue === "number") {
        const lineHeight = Math.round(lineHeightValue * 100) / 100;
        style.lineHeight = lineHeight;
        tw.push(`leading-[${lineHeight}]`);
    }
    if (typeof ((_f = node.style) === null || _f === void 0 ? void 0 : _f.fontFamily) === "string") {
        style.fontFamily = node.style.fontFamily;
        const fontFamily = node.style.fontFamily.replace(/'/g, "\\'");
        tw.push(`font-['${fontFamily}']`);
    }
    if ((_h = (_g = node.fills) === null || _g === void 0 ? void 0 : _g[0]) === null || _h === void 0 ? void 0 : _h.color) {
        style.color = rgbaFromColor(node.fills[0].color);
        tw.push(`text-[${style.color.replace(/\s/g, "")}]`);
    }
    const tailwindClasses = tw.length ? (0, cn_1.cn)(...tw) : undefined;
    return Object.assign({ type: "text", content: (_j = node.characters) !== null && _j !== void 0 ? _j : "", style }, (tailwindClasses ? { tailwindClasses } : {}));
}
function rgbaFromColor(c) {
    const r = Math.round(c.r * 255);
    const g = Math.round(c.g * 255);
    const b = Math.round(c.b * 255);
    const a = c.a !== undefined ? c.a : 1;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}
