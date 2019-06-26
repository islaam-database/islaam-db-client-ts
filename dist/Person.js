"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const SheetRow_1 = require("./SheetRow");
class Person extends SheetRow_1.SheetRow {
    constructor(vals, cols, sheetRowNumber) {
        super(sheetRowNumber);
        cols = cols.map((c) => c.toLowerCase());
        this.id = Number(vals[cols.indexOf("id")]);
        this.name = vals[cols.indexOf("name")];
        this.kunya = vals[cols.indexOf("full name")];
        this.birthYear = parseInt(vals[cols.indexOf("birth year")], undefined);
        this.deathYear = parseInt(vals[cols.indexOf("death year")], undefined);
        this.source = vals[cols.indexOf("source")];
        this.gender = vals[cols.indexOf("gender")];
        this.location = vals[cols.indexOf("location")];
    }
    /**
     * Generates a short bio of the person and other meta data.
     * @param idb an Islaam Database client
     */
    getBio(idb) {
        return __awaiter(this, void 0, void 0, function* () {
            const pronoun = this.gender ? "He" : "She";
            const possesivePronoun = this.gender ? "His" : "Her";
            const bioIntro = [`${pronoun} is `];
            const praisesAndPraisers = (yield idb.getPraisersAndPraisesFor(this.id));
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
            if (this.location)
                bioIntro.push(`${pronoun} is from ${this.location}.`);
            // birth and death year
            if (hasBirthYear && hasDeathYear)
                bioIntro.push(`${pronoun} was born in the year ${this.birthYear} and died ${this.deathYear} AH.`);
            else if (hasBirthYear)
                bioIntro.push(`${pronoun} was born in the year ${this.birthYear} AH.`);
            else if (hasDeathYear)
                bioIntro.push(`${pronoun} died in the year ${this.deathYear} AH.`);
            if (hasPraises)
                bioIntro.push(`${pronoun} was praised by: ${praiserNames.join(", ")}.`);
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
        });
    }
}
exports.Person = Person;
//# sourceMappingURL=Person.js.map