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
const dotenv_1 = __importDefault(require("dotenv"));
const fetchFigmaFile_1 = require("./utils/fetchFigmaFile");
const walkAndParse_1 = require("./walker/walkAndParse");
dotenv_1.default.config();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const json = yield (0, fetchFigmaFile_1.fetchFigmaFile)();
        const parsed = (0, walkAndParse_1.walkAndParse)(json.document);
    });
}
main().catch((error) => {
    console.error("An error occurred:", error);
    process.exit(1);
});
