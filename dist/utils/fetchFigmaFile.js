"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchFigmaFile = fetchFigmaFile;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function fetchFigmaFile() {
    return __awaiter(this, void 0, void 0, function* () {
        const token = process.env.FIGMA_TOKEN;
        const fileKey = process.env.FIGMA_FILE_KEY;
        if (!token)
            throw new Error("FIGMA_TOKEN not set");
        if (!fileKey)
            throw new Error("FIGMA_FILE_KEY not set");
        const res = yield fetch(`https://api.figma.com/v1/files/${fileKey}`, {
            headers: {
                "X-Figma-Token": token,
            },
        });
        if (!res.ok) {
            const msg = yield res.text();
            throw new Error(`Figma API error: ${res.status} ${msg}`);
        }
        const data = yield res.json();
        const filePath = path_1.default.resolve(process.cwd(), "figma-fetch-debug.json");
        fs_1.default.writeFileSync(filePath, JSON.stringify(data.document.children, null, 2), "utf-8");
        console.log(`📦 fetch result saved to ${filePath}`);
        return data;
    });
}
