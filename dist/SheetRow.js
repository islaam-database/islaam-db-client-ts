"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IslaamDBClient_1 = __importDefault(require("./IslaamDBClient"));
class SheetRow {
    constructor(sheetRow) {
        this.sheetUrl = "https://docs.google.com/spreadsheets/d/"
            + IslaamDBClient_1.default.sheetId + `/edit#gid=0&range=${sheetRow}:${sheetRow}`;
    }
}
exports.SheetRow = SheetRow;
//# sourceMappingURL=SheetRow.js.map