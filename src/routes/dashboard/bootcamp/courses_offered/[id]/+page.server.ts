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
     WHERE co.Course_ID = "${courseID}"
     ORDER BY ce.Start_Date DESC
     `
  );

  // Fetch remaining slots for the course
  const [slots] = await db.execute<RowDataPacket[]>(
    `SELECT
      CASE
        WHEN COUNT(ce.Course_ID) IS NULL THEN co.Course_Capacity
        ELSE co.Course_Capacity - COUNT(ce.Course_ID)
      END AS slots
    FROM Course_Offered co
    LEFT JOIN Course_Enrolled ce ON co.Course_ID = ce.Course_ID AND ce.End_Date IS NULL
    WHERE co.Course_ID = "${courseID}"`
    // count only the enrolled students that have not yet finished the course
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
  
  // Count students who have completed the course but have no certificate
  const [noCertificateResult] = await db.execute<RowDataPacket[]>(
    `SELECT COUNT(*) as count
    FROM Course_Enrolled ce
    LEFT JOIN Certificate c ON ce.Employee_ID = c.Employee_ID AND ce.Course_ID = c.Course_ID
    WHERE ce.Course_ID = '${courseID}'
    AND ce.End_Date IS NOT NULL
    AND ce.Grade IS NOT NULL
    AND c.Certificate_ID IS NULL`
  );

    

  // Extract data from the results
  const enrollments = enrollmentResult || [];
  const remainingSlots = slots[0];
  const noCertificateCount = noCertificateResult[0];

  // Return the data to be used in the Svelte component
  return {
    course,
    Enrollments: enrollments,
    remainingSlots, noCertificateCount,
    Certificates: certificateResult
  };
};


