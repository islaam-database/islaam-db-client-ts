"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Praise {
    constructor(vals, cols) {
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
        this.title = vals[cols.indexOf("relationship term")];
    }
}
exports.Praise = Praise;
//# sourceMappingURL=Praise.js.map