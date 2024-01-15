import db from "$lib/server/database";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import type { PageServerLoad, Actions } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ cookies, params }) => {
  const course_ID = params.id;
  console.log(course_ID);


  // Fetch enrolled students data with names
  const [courses] = await db.execute<RowDataPacket[]>(
    `SELECT * 
    FROM Course_Offered co
    WHERE co.Course_ID = '${course_ID}'`
  );

  // Employee name
  const course = courses[0];

  return {
    course
  };
};

export const actions = { 
  default: async ({ request, params }) => {
    const data = await request.formData();

    const [course_deleted] = await db.execute<ResultSetHeader[]>(
     `DELETE FROM Course_Offered WHERE Course_ID = '${params.id}'`
      );

    const [enrollment_deleted] = await db.execute<ResultSetHeader[]>(
      `DELETE FROM Course_Enrolled WHERE Course_ID = '${params.id}'`
       );
    
      
    console.log(course_deleted);
    console.log(enrollment_deleted);
    throw redirect(302, `/dashboard/bootcamp/courses_offered`);  
  }

} satisfies Actions;


