import db from "$lib/server/database";
import type { RowDataPacket } from "mysql2";

import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
  const [Courses] = await db.execute<RowDataPacket[]>(
    `SELECT 
      co.*, 
      i.*, 
      e.*, 
      co.Course_Capacity - IFNULL(ce.enrolled_count, 0) AS remaining_slots
    FROM Course_Offered co 
    INNER JOIN Instructor i ON co.Course_ID = i.Course_ID 
    INNER JOIN Employee e ON i.Employee_Id = e.Employee_Id
    LEFT JOIN (
      SELECT Course_ID, COUNT(*) as enrolled_count 
      FROM Course_Enrolled 
      WHERE End_Date IS NULL
      GROUP BY Course_ID
    ) ce ON co.Course_ID = ce.Course_ID` );


  //test function to call on client side


  return {
    Courses
  };

  


};

export const actions = {
  search: async ({ request, params }) => {
    const data = await request.formData();

    console.log("searching");


  },
} satisfies Actions;


