import db from "$lib/server/database";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import type { PageServerLoad, Actions } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ cookies, params }) => {
  const courseID = params.id;

  const [courses] = await db.execute<RowDataPacket[]>(
    `SELECT 
      co.*,
      e.Employee_FirstName,
      e.Employee_LastName
    
    FROM Course_Offered co
    LEFT JOIN Employee e ON co.Employee_ID = e.Employee_ID
    WHERE co.Course_ID = '${courseID}'`
  );

  // All Employees
  const [employees] = await db.execute<RowDataPacket[]>(
    `SELECT 
      e.Employee_ID,
      CONCAT(e.Employee_FirstName, ' ', e.Employee_LastName, ', ', j.Job_Position) AS names
    
    FROM Employee e
    INNER JOIN Job j ON e.Employee_ID = j.Employee_ID`
  );

  const [slots] = await db.execute<RowDataPacket[]>(
    `SELECT
      CASE
        WHEN COUNT(ce.Course_ID) IS NULL THEN co.Course_Capacity
        ELSE co.Course_Capacity - COUNT(ce.Course_ID)
      END AS slots
    FROM Course_Offered co
    LEFT JOIN Course_Enrolled ce ON co.Course_ID = ce.Course_ID AND ce.End_Date IS NULL
    WHERE co.Course_ID = "${courseID}"`
  );


  const [enrolled] = await db.execute<RowDataPacket[]>(
    `SELECT ce.Employee_ID, ce.Start_Date
    FROM Course_Enrolled ce
    WHERE ce.Course_ID = "${courseID}"`
  );

  const [newEnrollmentID] = await db.execute<RowDataPacket[]>(
    `SELECT generateEnrollmentID() AS new`
  );
    
 


  const course = courses[0];
  const employeeNames = employees;
  const enrollees = enrolled;
  const remainingSlots = slots[0];
  const newEnrollment_ID = newEnrollmentID[0];


  return {
    course, employeeNames, remainingSlots, newEnrollment_ID, enrollees
  };
};

export const actions = { 
  default: async ({ request, params }) => {
    const data = await request.formData();
    const course_ID = params.id;
    data.get("enrollmentID")
    const [newEnrollmentID] = await db.execute<RowDataPacket[]>(
      `SELECT generateEnrollmentID() AS new`
    );

    const enrollmentID = newEnrollmentID[0].new;

    console.log(enrollmentID);
    console.log(data.get("employeeID"));
    console.log(course_ID);
    console.log(data.get("dateStarted"));

    const [enrollment_add] = await db.execute<ResultSetHeader[]>(
      `INSERT INTO Course_Enrolled
        (Enrollment_ID, Employee_ID, Course_ID, Start_Date, End_Date, Grade)
        VALUES  
        ('${enrollmentID}',
        '${data.get("employeeID")}',
        '${course_ID}',
        '${data.get("dateStarted")}',null,null)`
       );


    console.log(params.id);
    
    const [enrollment] = await db.execute<RowDataPacket[]>(
      `SELECT * FROM Course_Enrolled WHERE Enrollment_ID = ${data.get("enrollmentID")}`,
    );

    console.log(enrollment_add);
    throw redirect(302, `/dashboard/bootcamp/courses_offered/${course_ID}`);
  }

} satisfies Actions;


