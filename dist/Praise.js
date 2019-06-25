"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SheetRow_1 = require("./SheetRow");
class Praise extends SheetRow_1.SheetRow {
    constructor(vals, cols, rowNumInSheet) {
        super(rowNumInSheet);
        cols = cols.map((c) => c.toLowerCase());
        const recommendee = vals[cols.indexOf("recommendee")].toString().split(". ");
        const recommender = vals[cols.indexOf("recommender")].toString().split(". ");
        this.praisee = {
            id: Number(recommendee[0]),
            name: recommendee[1],
        };
        this.praiser = {
            id: Number(recommender[0]),
            name: recommender[1],
        };
        this.source = vals[cols.indexOf("source")];
        this.title = vals[cols.indexOf("title")];
    }
}
exports.Praise = Praise;
//# sourceMappingURL=Praise.js.map