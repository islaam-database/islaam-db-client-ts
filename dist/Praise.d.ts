import { SheetRow } from "./SheetRow";
export declare class Praise extends SheetRow {
    subject?: string;
    praisee: {
        id: number;
        name: string;
    };
    praiser: {
        id: number;
        name: string;
    };
    title?: string;
    source?: string;
    constructor(vals: Array<string | number>, cols: string[], rowNumInSheet: number);
}
//# sourceMappingURL=Praise.d.ts.map