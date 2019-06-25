import { SheetRow } from "./SheetRow";

export class StudentTeacher extends SheetRow {
    public subject?: string;
    public student: { id: number; name: string };
    public teacher: { id: number; name: string };
    public relationshipTerm?: string;
    public source?: string;
    constructor(vals: Array<string | number>, cols: string[], sheetRowNumber: number) {
        super(sheetRowNumber);
        cols = cols.map((c) => c.toLowerCase());

        const student = vals[cols.indexOf("student")].toString().split(". ");
        const teacher = vals[cols.indexOf("teacher")].toString().split(". ");

        this.student = { id: Number(student[0]), name: student[1] };
        this.teacher = { id: Number(teacher[0]), name: teacher[1] };

        this.source = vals[cols.indexOf("source")] as string;
        this.relationshipTerm = vals[cols.indexOf("relationship term")] as string;
    }
}
