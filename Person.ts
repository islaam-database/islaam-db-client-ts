import IslaamDBClient from "./IslaamDBClient";
import { SheetRow } from "./SheetRow";

type gender = "Male" | "Female";

export class Person extends SheetRow {
    public id: number;
    public name: string;
    public kunya?: string;
    public birthYear?: number;
    public location?: string;
    public deathYear?: number;
    public source?: string;
    public gender: "Male" | "Female";

    constructor(vals: string[], cols: string[], sheetRowNumber: number) {
        super(sheetRowNumber);
        cols = cols.map((c) => c.toLowerCase());
        this.id = Number(vals[cols.indexOf("id")]);
        this.name = vals[cols.indexOf("name")] as string;
        this.kunya = vals[cols.indexOf("full name")] as string;
        this.birthYear = parseInt(vals[cols.indexOf("birth year")], undefined);
        this.deathYear = parseInt(vals[cols.indexOf("death year")], undefined);
        this.source = vals[cols.indexOf("source")] as string;
        this.gender = vals[cols.indexOf("gender")] as gender;
        this.location = vals[cols.indexOf("location")] as string;
    }

    /**
     * Generates a short bio of the person and other meta data.
     * @param idb an Islaam Database client
     */
    public async getBio(idb: IslaamDBClient) {
        const pronoun = this.gender === "Male" ? "He" : "She";
        const possesivePronoun = this.gender === "Male" ? "His" : "Her";
        const bioIntro = [`${pronoun} is `];
        const praisesAndPraisers = (await idb.getPraisersAndPraisesFor(this.id));
        const praisers = praisesAndPraisers.filter((x) => x.praisee.id === this.id);
        const titles = Array
            .from(new Set(praisers.map((p) => p.title)))
            .filter((x) => x != null && x.length > 0);
        const praiserNames = Array
            .from(new Set(praisers.map((p) => p.praiser.name)));

        // booleans
        const hasPraises = praisers.length > 0;
        const hasDeathYear = this.deathYear != null && !isNaN(this.deathYear);
        const hasBirthYear = this.birthYear != null && !isNaN(this.birthYear);

        bioIntro[0] += (this.kunya || this.name) + ".";

        // praises
        if (hasPraises && titles.length > 0)
            bioIntro.push(`${possesivePronoun} titles include: ${titles.join(", ")}.`);

        // location
        if (this.location) bioIntro.push(`${pronoun} is from ${this.location}.`);

        // birth and death year
        if (hasBirthYear && hasDeathYear)
            bioIntro.push(
                `${pronoun} was born in the year ${this.birthYear} and died ${this.deathYear} AH.`,
            );
        else if (hasBirthYear) bioIntro.push(`${pronoun} was born in the year ${this.birthYear} AH.`);
        else if (hasDeathYear) bioIntro.push(`${pronoun} died in the year ${this.deathYear} AH.`);

        if (hasPraises) bioIntro.push(`${pronoun} was praised by: ${praiserNames.join(", ")}.`);

        if (bioIntro.length === 2) {
            bioIntro.push("\nSorry. That's all I know at the moment.");
        }

        bioIntro.push("\n\nPlease note that the research is not yet complete.");

        // join sentences together
        return {
            praiserNames,
            text: bioIntro.join(" "),
            titles,
        };
    }
}
