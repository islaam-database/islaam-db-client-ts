"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SheetRow_1 = require("./SheetRow");
class StudentTeacher extends SheetRow_1.SheetRow {
    constructor(vals, cols, sheetRowNumber) {
        super(sheetRowNumber);
        cols = cols.map((c) => c.toLowerCase());
        const student = vals[cols.indexOf("student")].toString().split(". ");
        const teacher = vals[cols.indexOf("teacher")].toString().split(". ");
        this.student = { id: Number(student[0]), name: student[1] };
        this.teacher = { id: Number(teacher[0]), name: teacher[1] };
        this.source = vals[cols.indexOf("source")];
        this.relationshipTerm = vals[cols.indexOf("relationship term")];
    }
}
exports.StudentTeacher = StudentTeacher;
//# sourceMappingURL=StudentTeacher.js.map