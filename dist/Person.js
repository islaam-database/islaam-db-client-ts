"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Person {
    constructor(vals, cols) {
        cols = cols.map((c) => c.toLowerCase());
        this.id = Number(vals[cols.indexOf("id")]);
        this.name = vals[cols.indexOf("name")];
        this.kunya = vals[cols.indexOf("full name")];
        this.birthYear = Number(vals[cols.indexOf("birth year")]);
        this.deathYear = Number(vals[cols.indexOf("death year")]);
        this.source = vals[cols.indexOf("source")];
    }
}
exports.Person = Person;
//# sourceMappingURL=Person.js.map