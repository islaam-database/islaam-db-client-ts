import { Person } from "./Person";
import { Praise } from "./Praise";
import { StudentTeacher } from "./StudentTeacher";
export default class IslaamDBClient {
    private key;
    static sheetId: string;
    constructor(key: string);
    /**
     * Searches for a person by name or kunya
     * @param query The query to use for searching
     */
    queryForPerson(query: string): Promise<Person>;
    /**
     * Gets a person who has the given ID
     * @param id The id of the person
     */
    getPersonById(id: number): Promise<Person | undefined>;
    /**
     * Gets the teachers and students of a person
     * @param personId The id of the person to get the teachers for
     */
    getTeachersAndStudentsOf(personId: number): Promise<StudentTeacher[]>;
    /**
     * Gets praisers and praisees for a person
     * @param personId The person to get praises for
     */
    getPraisersAndPraisesFor(personId: number): Promise<Praise[]>;
    /**
     * Gets data for a sheet
     * @param sheetName The name of the sheet to get data for
     */
    private getSheetValues;
}
//# sourceMappingURL=IslaamDBClient.d.ts.map