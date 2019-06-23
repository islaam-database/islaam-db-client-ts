export class Person {
    public id: number;
    public name: string;
    public kunya?: string;
    public birthYear?: number;
    public location?: string;
    public deathYear?: number;
    public source?: string;

    constructor(vals: Array<string | number>, cols: string[]) {
        cols = cols.map((c) => c.toLowerCase());
        this.id = Number(vals[cols.indexOf("id")]);
        this.name = vals[cols.indexOf("name")] as string;
        this.kunya = vals[cols.indexOf("full name")] as string;
        this.birthYear = Number(vals[cols.indexOf("birth year")]);
        this.deathYear = Number(vals[cols.indexOf("death year")]);
        this.source = vals[cols.indexOf("source")] as string;
    }
}
