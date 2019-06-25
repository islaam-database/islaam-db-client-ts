"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const levenshtein = __importStar(require("fast-levenshtein"));
const googleapis_1 = require("googleapis");
const Person_1 = require("./Person");
const Praise_1 = require("./Praise");
const StudentTeacher_1 = require("./StudentTeacher");
class IslaamDBClient {
    constructor(key) {
        this.key = key;
    }
    /**
     * Searches for a person by name or kunya
     * @param query The query to use for searching
     */
    queryForPerson(query) {
        return __awaiter(this, void 0, void 0, function* () {
            // get sheet rows
            const values = yield this.getSheetValues("People");
            // remove titles from the query
            const titles = ["shaykh", "sheikh", "imaam"];
            titles.forEach((t) => query = query.split(t).join(""));
            // get person and scores
            const cols = values[0];
            const scores = values
                .slice(1)
                .map((v, i) => {
                // get person
                const p = new Person_1.Person(v, cols, i);
                // get score per person
                const hasExactMatch = [p.name, p.kunya].some((x) => x === query);
                const score = hasExactMatch ? 0
                    : Math.min(levenshtein.get(p.name, query), levenshtein.get(p.kunya || p.name, query));
                return { person: p, score };
            });
            // get winner
            let winner = scores[0];
            scores.forEach((s) => winner = s.score < winner.score ? s : winner);
            return winner.person;
        });
    }
    /**
     * Gets a person who has the given ID
     * @param id The id of the person
     */
    getPersonById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getSheetValues("People");
            const cols = data[0];
            const people = data.slice(1).map((v, i) => new Person_1.Person(v, cols, i + 2));
            return people.find((p) => p.id === id);
        });
    }
    /**
     * Gets the teachers and students of a person
     * @param personId The id of the person to get the teachers for
     */
    getTeachersAndStudentsOf(personId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getSheetValues("Students");
            const cols = data[0];
            return data
                .slice(1)
                .map((d, i) => new StudentTeacher_1.StudentTeacher(d, cols, i + 2))
                .filter((p) => [p.student.id, p.teacher.id].includes(personId));
        });
    }
    /**
     * Gets praisers and praisees for a person
     * @param personId The person to get praises for
     */
    getPraisersAndPraisesFor(personId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getSheetValues("Praises");
            const cols = data[0];
            return data
                .slice(1)
                .map((d, i) => new Praise_1.Praise(d, cols, i + 2))
                .filter((p) => [p.praiser.id, p.praisee.id].includes(personId));
        });
    }
    /**
     * Gets data for a sheet
     * @param sheetName The name of the sheet to get data for
     */
    getSheetValues(sheetName) {
        return __awaiter(this, void 0, void 0, function* () {
            const sheetsAPI = googleapis_1.google.sheets({ auth: this.key, version: "v4" });
            const d = yield sheetsAPI
                .spreadsheets
                .values
                .get({
                range: `${sheetName}!A:K`,
                spreadsheetId: IslaamDBClient.sheetId,
            });
            if (!d.data.values) {
                throw new Error("Sorry. Something went wrong when accessing the data.");
            }
            return d.data.values.filter((v) => v.length > 0);
        });
    }
}
IslaamDBClient.sheetId = "1oEhVbC85KnVYpjOnqX18plTSyjyH6F4dxNQ4SjjkBAs";
exports.default = IslaamDBClient;
//# sourceMappingURL=IslaamDBClient.js.map