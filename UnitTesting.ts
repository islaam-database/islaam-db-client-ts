import { readFileSync } from "fs";
import IslaamDBClient from "./IslaamDBClient";

(async () => {
    const key = readFileSync("key.txt", "utf8");
    const idb = new IslaamDBClient(key);
    // const moosaaBio = await (await idb.queryForPerson("Moosaa Richardson")).getBio(idb);
    // const AbuKhadeejahBio = await (await idb.queryForPerson("Abu Khadeejah")).getBio(idb);
    // const rabeeBio = await (await idb.queryForPerson("Shaykh Rabee'")).getBio(idb);
    await (async () => {
        // get person by id
        const data = [
            { id: 1, name: "Allaah" },
            { id: 2, name: "Muhammad ﷺ" },
            { id: 7, name: "As-Sa'dee" },
            { id: 13, name: "Ibn al-Qayyim" },
            { id: 16, name: "Ibn Hajr" },
            { id: 20, name: "Maalik" },
            { id: 22, name: "Al-Mizzi" },
            { id: 23, name: "Baha Ad-Din" },
            { id: 24, name: "Zahiriyyah Shaykh" },
            { id: 25, name: "Shams Ad-Din" },
            { id: 30, name: "Muhammad bin Zarrad" },
            { id: 41, name: "Ash-Shaafi'ee" },
            { id: 43, name: "Muhammad Al-Ameen ash-Shinqeetee" },
            { id: 44, name: "Saalih ibn al-'Uthaymeen" },
            { id: 49, name: "Umar bin 'Abdil 'Azeez" },
            { id: 51, name: "Sufyaan Ath-Thawree" },
            { id: 52, name: "Yahya bin Ma’een" },
            { id: 53, name: "Abu Zura’h" },
            { id: 54, name: "Abu Hatim" },
            { id: 55, name: "An-Nisaa’ee" },
            { id: 56, name: "Ibn Salaah" },
            { id: 57, name: "Ibn Rajab" },
            { id: 58, name: "Ash-Shawkanee" },
            { id: 59, name: "Al-Albaanee" },
            { id: 61, name: "Muhammad Zaynoo" },
            { id: 71, name: "Muhammad Baazmool" },
            { id: 69, name: "Moosaa Richardson" },
        ];
        for (const tc of data) try {
            // await testGettingPersonById(tc.id, tc.name);
        } catch (e) {
            debugger;
            console.error(e);
        }

        async function testGettingPersonById(id: number, name: string) {
            const person = await idb.getPersonById(id);
            if (person) console.log({ name: person.name, link: person.sheetUrl });
            if (!person) throw new Error("No person found");
            if (person.name !== name) throw new Error("Mismatch.");
            console.log(`✅ ${id} returned ${person.name}`);
        }
    })();
    await (async () => {
        // search for person
        const data = [
            // { query: "abu khadeeja", id: 99 },
            // { query: "as-sa'dee", id: 7 },
            // { query: "abdurrazaq badr", id: 253 },
            // { query: "'Abdur-Razzaaq", id: 253 },
            // { query: "'Abdur-Razzaaq Al-Badr", id: 253 },
            // { query: "moosaa richardson", id: 69 },
            // { query: "As-Sa'dee", id: 7 },
            // { query: "ibn taymiyyah", id: 215 },
            // { query: "ibn taymiyya", id: 215 },
            // { query: "Imaam Ahmad", id: 106 },
            // { query: "Bin Baz", id: 73 },
            // { query: "Muhammad al-Jaamee", id: 74 },
            // { query: "Muhammad ibn 'Abdel Wahhaab", id: 210 },
            // { query: "Shaykh Muhammad Baazmool", id: 71 },
            // { query: "Muhammad Baazmool", id: 71 },
            // { query: "Muhammad Bazmul", id: 71 },
            // { query: "Muhammad bin Zarrad", id: 30 },
            // { query: "Ibn Hajr", id: 16 },
            // { query: "Mujaahid", id: 89 },
            // { query: "Rabee'", id: 72 },
            // { query: "Shaykh Rabee'", id: 72 },
            // { query: "ash-shaafi'ee", id: 41 },
            // { query: "ahmad", id: 106 },
            { query: "moosaa richardson", id: 69 },
        ];
        for (const tc of data)
            try {
                await testSearchingForPerson(tc.query, tc.id);
            } catch (e) {
                debugger;
                console.error(e);
            }

        async function testSearchingForPerson(query: string, id: number) {
            const person = await idb.queryForPerson(query);
            if (!person) throw new Error("Something went wrong...");
            if (person.id !== id) throw new Error("Mismatch.");
            console.log(`✅ ${query} returned ${id}`);
        }
    })();
    await (async () => {
        // test getting teachers and students of person
        const data = [
            {
                personId: 125,
                students: [],
                teachers: [186, 126, 187, 43, 188, 189, 190, 191, 192, 193, 194],
            }, {
                personId: 311,
                students: [315, 315, 316],
                teachers: [41, 312, 313, 314],
            },
        ];
        for (const tc of data)
            try {
                await testGettingTeachersAndStudentsOf(tc.personId, tc.teachers, tc.students);
            } catch (e) {
                debugger;
                console.error(e);
            }

        async function testGettingTeachersAndStudentsOf(
            personId: number,
            teachers: number[],
            students: number[],
        ) {
            const teachersAndStudents = await idb.getTeachersAndStudentsOf(personId);
            const expected = {
                students: students.sort((a, b) => a - b),
                teachers: teachers.sort((a, b) => a - b),
            };
            const actual = {
                students: teachersAndStudents
                    .filter((x) => x.teacher.id === personId)
                    .sort((a, b) => a.student.id - b.student.id),
                teachers: teachersAndStudents
                    .filter((x) => x.student.id === personId)
                    .sort((a, b) => a.teacher.id - b.teacher.id),
            };
            // test students
            for (let i = 0; i < expected.students.length; i++)
                if (expected.students[i] !== actual.students[i].student.id)
                    throw new Error("Mismatch.");
            // test teachers
            for (let i = 0; i < expected.teachers.length; i++)
                if (expected.teachers[i] !== actual.teachers[i].teacher.id)
                    throw new Error("Mismatch.");
            console.log(`✅ ${personId} returned correct teachers and students.`);
        }
    })();
    await (async () => {
        // test praises
        const data = [
            {
                personId: 72,
                praisees: [98, 113],
                praisers: [130, 112, 59, 73, 73, 73, 102, 125, 125, 125, 44, 113, 113],
            }, {
                personId: 100,
                praisees: [101, 301, 302, 303],
                praisers: [97, 97, 69, 113],
            },
        ];
        for (const tc of data)
            await testGettingPraisersAndPraisesFor(tc.personId, tc.praisees, tc.praisers);

        async function testGettingPraisersAndPraisesFor(
            personId: number,
            praisees: number[],
            praisers: number[],
        ) {
            const praisersAndPraisees = await idb.getPraisersAndPraisesFor(personId);
            const expected = {
                praisees: praisees.sort((a, b) => a - b),
                praisers: praisers.sort((a, b) => a - b),
            };
            const actual = {
                praisees: praisersAndPraisees
                    .filter((x) => x.praiser.id === personId)
                    .sort((a, b) => a.praisee.id - b.praisee.id),
                praisers: praisersAndPraisees
                    .filter((x) => x.praisee.id === personId)
                    .sort((a, b) => a.praiser.id - b.praiser.id),
            };
            // test praisees
            for (let i = 0; i < expected.praisees.length; i++)
                if (expected.praisees[i] !== actual.praisees[i].praisee.id)
                    throw new Error("Mismatch.");
            // test praisers
            for (let i = 0; i < expected.praisers.length; i++)
                if (expected.praisers[i] !== actual.praisers[i].praiser.id)
                    throw new Error("Mismatch.");
            console.log(`✅ ${personId} returned correct praisers and praisees.`);
        }
    })();
})();
