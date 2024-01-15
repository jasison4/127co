import db from "$lib/server/database";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import type { PageServerLoad, Actions } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ cookies, params }) => {
    const courseID = params.id;

    const [candidatesForCert] = await db.execute<RowDataPacket[]>(
        `SELECT ce.*, 
        CONCAT(e.Employee_LastName, ", ", e.Employee_FirstName) as Name
        FROM Course_Enrolled ce
        LEFT JOIN Certificate c ON ce.Employee_ID = c.Employee_ID AND ce.Course_ID = c.Course_ID
        INNER JOIN Employee e ON ce.Employee_ID = e.Employee_ID
        WHERE ce.Course_ID = '${courseID}'
        AND ce.End_Date IS NOT NULL
        AND ce.Grade IS NOT NULL
        AND c.Certificate_ID IS NULL`
    );

    const [courseName] = await db.execute<RowDataPacket[]>(
        `SELECT Course_Name as name FROM Course_Offered WHERE Course_ID = '${courseID}'`
    );
    const course = courseName[0];


    return {
        candidatesForCert, courseID, course
    };
};

export const actions = {
    default: async ({request, params}) => {
        const data = await request.formData();
        const course_ID = params.id;

        console.log(data);

    }
} as Actions;

