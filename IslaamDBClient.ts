import * as levenshtein from "fast-levenshtein";
import { google } from 'googleapis';
import { Person } from "./Person";
import { Praise } from "./Praise";
import { StudentTeacher } from "./StudentTeacher";

export default class IslaamDBClient {

    public static sheetId = "1oEhVbC85KnVYpjOnqX18plTSyjyH6F4dxNQ4SjjkBAs";
    constructor(private key: string) { }

    /**
     * Searches for a person by name or kunya
     * @param query The query to use for searching
     */
    public async queryForPerson(query: string): Promise<Person> {

        // get sheet rows
        const values = await this.getSheetValues("People");

        // remove titles from the query
        const titles = ["shaykh", "sheikh", "imaam"];
        titles.forEach((t) => query = query.split(t).join(""));

        // get person and scores
        const cols = values[0] as string[];
        const scores = values
            .slice(1)
            .map((v, i) => {
                // get person
                const p = new Person(v, cols, i + 2);

                // get score per person
                const hasExactMatch = [p.name, p.kunya].some((x) => x === query);
                const score = hasExactMatch ? 0
                    : Math.min(
                        levenshtein.get(p.name, query),
                        levenshtein.get(p.kunya || p.name, query),
                    );

                return { person: p, score };
            });

        // get winner
        let winner = scores[0];
        scores.forEach((s) => winner = s.score < winner.score ? s : winner);

        return winner.person;
    }

    /**
     * Gets a person who has the given ID
     * @param id The id of the person
     */
    public async getPersonById(id: number): Promise<Person | undefined> {
        const data = await this.getSheetValues("People");
        const cols = data[0] as string[];
        const people = data.slice(1).map((v, i) => new Person(v, cols, i + 2));
        return people.find((p) => p.id === id);
    }
    /**
     * Gets the teachers and students of a person
     * @param personId The id of the person to get the teachers for
     */
    public async getTeachersAndStudentsOf(personId: number) {
        const data = await this.getSheetValues("Students");
        const cols = data[0];
        return data
            .slice(1)
            .map((d, i) => new StudentTeacher(d, cols, i + 2))
            .filter((p) => [p.student.id, p.teacher.id].includes(personId));
    }
    /**
     * Gets praisers and praisees for a person
     * @param personId The person to get praises for
     */
    public async getPraisersAndPraisesFor(personId: number) {
        const data = await this.getSheetValues("Praises");
        const cols = data[0];
        return data
            .slice(1)
            .map((d, i) => new Praise(d, cols, i + 2))
            .filter((p) => [p.praiser.id, p.praisee.id].includes(personId));
    }
    /**
     * Gets data for a sheet
     * @param sheetName The name of the sheet to get data for
     */
    private async getSheetValues(sheetName: string) {
        const sheetsAPI = google.sheets({ auth: this.key, version: "v4" });
        const d = await sheetsAPI
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
    }
}
