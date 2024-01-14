// Import necessary modules and types
import db from "$lib/server/database";
import type { RowDataPacket } from "mysql2";
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

// Define the load function
export const load: PageServerLoad = async ({ cookies, params }) => {
  const courseID = params.id;

  // Fetch course details
  const [courseResult] = await db.execute<RowDataPacket[]>(
    `SELECT Course_Offered.*, Employee.Employee_FirstName, Employee.Employee_LastName
     FROM Course_Offered
     INNER JOIN Instructor ON Course_Offered.Course_ID = Instructor.Course_ID
     INNER JOIN Employee ON Instructor.Employee_Id = Employee.Employee_Id
     WHERE Course_Offered.Course_ID = "${courseID}"`
  );

  // If the course is not found, redirect to the bootcamp page
  if (courseResult.length === 0) throw redirect(302, "/dashboard/bootcamp");

  // Extract course details from the result
  const course = courseResult[0];

  // Fetch enrolled students data with names
  const [enrollmentResult] = await db.execute<RowDataPacket[]>(
    `SELECT
       ce.Enrollment_ID,
       ce.Employee_ID,
       ce.Start_Date,
       ce.End_Date,
       ce.Grade,
       CONCAT(e.Employee_LastName, ', ', e.Employee_FirstName) AS Name
     FROM Course_Enrolled ce
     INNER JOIN Course_Offered co ON ce.Course_ID = co.Course_ID
     INNER JOIN Employee e ON ce.Employee_ID = e.Employee_ID
     WHERE co.Course_ID = "${courseID}"`
  );

  // Fetch remaining slots for the course
  const [slots] = await db.execute<RowDataPacket[]>(
    `SELECT
    co.Course_Capacity - COUNT(*) AS slots
    FROM Course_Enrolled ce
    INNER JOIN Course_Offered co ON ce.Course_ID = co.Course_ID
    WHERE co.Course_ID = "${courseID}"`
  );

  // Fetch certificate data
  const [certificateResult] = await db.execute<RowDataPacket[]>(
    `SELECT
       c.Certificate_ID,
       c.Employee_ID,
       c.Course_ID,
       c.Release_Date,
       CONCAT(e.Employee_LastName, ', ', e.Employee_FirstName) AS EmployeeName
    FROM Certificate c
    INNER JOIN Employee e ON c.Employee_ID = e.Employee_ID
    WHERE c.Course_ID = "${courseID}"`
  );

  // Extract data from the results
  const enrollments = enrollmentResult || [];
  const remainingSlots = slots[0];

  // Return the data to be used in the Svelte component
  return {
    course,
    Enrollments: enrollments,
    remainingSlots,
    Certificates: certificateResult
  };
};
