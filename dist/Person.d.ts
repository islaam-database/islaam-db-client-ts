import IslaamDBClient from "./IslaamDBClient";
export declare class Person {
    id: number;
    name: string;
    kunya?: string;
    birthYear?: number;
    location?: string;
    deathYear?: number;
    source?: string;
    gender: string;
    constructor(vals: string[], cols: string[]);
    getBio(idb: IslaamDBClient): Promise<string>;
}
//# sourceMappingURL=Person.d.ts.map