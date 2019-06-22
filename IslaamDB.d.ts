declare namespace IslaamDB {
    /**
     * An API to get people data.
     */
    interface PersonAPI {
        /**
         * Gets the closest person matching the given query.
         * @param query The search query
         */
        query(query: string): Promise<Person>;
        /**
         * Gets a person by ID.
         * @param id The id of the person
         */
        byId(id: number): Promise<Person>;
    }
    /**
     * A data model.
     */
    interface Model {
        /** The source for the information. */
        source: string;
    }
    /**
     * A person, whether good or bad or student or scholar
     */
    interface Person extends Model {
        /** The id of the person */
        id: number;
        /** The person's name */
        name: string;
        /** The person's kunya */
        kunya?: string;
        /** The person's birth year */
        birthYear?: number;
        /** The person's location where they lived */
        location?: string;
        /** The year when the person died */
        deathYear?: number;
        /** The students and teachers of the person */
        studentsAndTeachers: Promise<StudentTeacher[]>;
        /** The praises and praisers of the person */
        praisesAndPraisers: Promise<Praise[]>;
    }
    /**
     * Represents a student-teacher relationship
     */
    interface StudentTeacher extends Model {
        /** The subject studied */
        subject?: string[];
        /** The id of the student */
        studentId: number;
        /** The name of the student */
        studentName: string;
        /** The id of the teacher */
        teacherId: number;
        /** The name of the teacher */
        teacherName: string;
        /** The term used when expressing the relationship */
        relationshipTerm?: string;
    }
    /** Represents a praise */
    interface Praise extends Model {
        /** The id of the praiser */
        recommendeeId: number;
        /** The name of the praiser */
        recommendeeName: string;
        /** The od of the praiser */
        recommenderId: number;
        /** The name of the praiser */
        recommenderName: string;
        /** The title given when praised */
        title: string[];
    }
}