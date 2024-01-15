import db from "$lib/server/database";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import type { PageServerLoad, Actions } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ cookies, params }) => {
  const courseID = params.id;
  
  const [courses] = await db.execute<RowDataPacket[]>(
    `SELECT * FROM Course_Offered WHERE Course_ID = "${courseID}"`
  );

  const [instructors] = await db.execute<RowDataPacket[]>(
    `SELECT 
      e.Employee_ID,
      CONCAT(e.Employee_FirstName, ' ', e.Employee_LastName, ', ', p.Employee_HighestLevelOfEducation, ', ', j.Employee_Status, ', ', j.Employee_Shift, ' Shift') AS names
    
    FROM Employee e
    INNER JOIN Job j ON e.Employee_ID = j.Employee_ID
    INNER JOIN PDS p ON e.Employee_ID = p.Employee_ID
    WHERE j.Job_Position = "Instructor"`
  );

  const [listcourseID] = await db.execute<RowDataPacket[]>(
    `SELECT Course_ID FROM Course_Offered`
  );

  const [countenrollees] = await db.execute<RowDataPacket[]>(
    `SELECT COUNT(*) AS count FROM Course_Enrolled WHERE Course_ID = "${courseID}"`
  );

  const course = courses[0];
  const employeeNames = instructors;
  const courseIDs = listcourseID;
  const enrollees = countenrollees[0];
  
  console.log(course);

return { 
  course, employeeNames, courseIDs, enrollees
  };  


};

export const actions = { 
  default: async ({ request, params }) => {
    const data = await request.formData();
    const courseID = params.id;

    console.log(data.get("employeeID"));
    console.log(data.get("courseID"));
    console.log(data.get("courseName"));
    console.log(data.get("courseInstructor"));
    console.log(data.get("courseSchedule"));
    console.log(data.get("courseDuration"));
    console.log(data.get("courseCapacity"));
    console.log(data.get("courseCategory"));

    const employeeID = data.get("employeeID");
    const newcourseID = data.get("courseID");
    const courseName = data.get("courseName");
    const courseInstructor = data.get("employeeID");
    const courseSchedule = data.get("courseSchedule");
    const courseDuration = data.get("courseDuration");
    const courseCapacity = data.get("courseCapacity");
    const courseCategory = data.get("courseCategory");

    const [course_update] = await db.execute<ResultSetHeader[]>(
      `UPDATE Course_Offered SET 
      Course_Name = "${courseName}",
      Employee_ID = "${employeeID}",
      Course_Category = "${courseCategory}",
      Course_Duration = "${courseDuration}",
      Course_Capacity = "${courseCapacity}",
      Course_Schedule = "${courseSchedule}",
      Course_ID = "${newcourseID}"
      WHERE Course_ID = "${courseID}"
      `

    );

    const [instructor_update] = await db.execute<ResultSetHeader[]>(
      `UPDATE Instructor SET 
      Employee_ID = "${employeeID}",
      Course_ID = "${newcourseID}"
      WHERE Course_ID = "${courseID}"
      `
    );

    
    throw redirect(302, `/dashboard/bootcamp/courses_offered`);
  }

} satisfies Actions;


