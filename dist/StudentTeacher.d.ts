import { SheetRow } from "./SheetRow";
export declare class StudentTeacher extends SheetRow {
    subject?: string;
    student: {
        id: number;
        name: string;
    };
    teacher: {
        id: number;
        name: string;
    };
    relationshipTerm?: string;
    source?: string;
    constructor(vals: Array<string | number>, cols: string[], sheetRowNumber: number);
}
//# sourceMappingURL=StudentTeacher.d.ts.map