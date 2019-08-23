import IslaamDBClient from "./IslaamDBClient";
import { SheetRow } from "./SheetRow";
export declare class Person extends SheetRow {
    id: number;
    name: string;
    kunya?: string;
    birthYear?: number;
    location?: string;
    deathYear?: number;
    source?: string;
    gender: "Male" | "Female";
    constructor(vals: string[], cols: string[], sheetRowNumber: number);
    /**
     * Generates a short bio of the person and other meta data.
     * @param idb an Islaam Database client
     */
    getBio(idb: IslaamDBClient): Promise<{
        praiserNames: string[];
        text: string;
        titles: (string | undefined)[];
    }>;
}
//# sourceMappingURL=Person.d.ts.map