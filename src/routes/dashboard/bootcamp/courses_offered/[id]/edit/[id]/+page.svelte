<script lang="ts">
  import Breadcrumb from "$lib/components/Breadcrumb.svelte";
  import { Hr } from "flowbite-svelte";
  import type { PageData } from "./$types";
  export let data: PageData;
  const { enrollees } = data;

  let editedEnrollmentID = enrollees.Enrollment_ID;
  let editedFirstName = enrollees.Employee_FirstName;
  let editedLastName = enrollees.Employee_LastName;
  let editedDateStarted = enrollees.Start_Date;
  let editedDateFinishes = enrollees.End_Date;
  let editedGrade = enrollees.Grade;
  

</script>

<main class="w-full">  
    <Breadcrumb items={[
        { href: "/dashboard/bootcamp", text: "Bootcamp" },
        { href: "/dashboard/bootcamp/courses_offered", text: "Courses Offered" },
        {
          href: `/dashboard/bootcamp/courses_offered/${enrollees.Course_ID}`,
          text: enrollees.Course_Name

        },
        { href: `/dashboard/bootcamp/courses_offered/${enrollees.Course_Name}/edit/${enrollees.Enrollment_ID}`,
          text: "Edit Student"
        }
      ]}/>

    <form method="POST" >
      <input type="hidden" name="course_ID" id="course_ID" value = {enrollees.Course_ID}>
      <input type="hidden" name="employee_ID" id="employee_ID" value = {enrollees.Employee_ID}>
      <label for="enrollmentID">Enrollment ID:</label>
      <br>
      <input 
        class="text-sm border-2 rounded-full border-gray-400 text-gray-700 p-1 pl-2 pr-2"
        type="text" 
        id="enrollmentID" 
        name="enrollmentID"
        value={editedEnrollmentID}
        style="margin-bottom: 10px;" 
          disabled>

        <br>
        <label for="firstName">First Name:</label>
        <br>
        <input 
          class="text-sm border-2 rounded-full border-gray-400 p-1 pl-2 pr-2"
          type="text" 
          id="firstName" 
          name="firstName"
          value={editedFirstName}
          style="margin-bottom: 10px;"
          required>

        <br>
        <label for="lastName">Last Name:</label>
        <br>
        <input 
          class="text-sm border-2 rounded-full border-gray-400 p-1 pl-2 pr-2"
          type="text" 
          id="lastName" 
          name="lastName"
          value={editedLastName}
          style="margin-bottom: 10px;"
          required>

        <br>
        <label for="dateStarted">Date Started:</label>
        <br>
        <input 
          class="text-sm border-2 rounded-full border-gray-400 p-1 pl-2 pr-2"
          type="date" 
          id="dateStarted" 
          name="dateStarted"
          value={new Date(editedDateStarted.getTime() - (editedDateStarted.getTimezoneOffset() * 60000)).toISOString().split("T")[0]}
          style="margin-bottom: 10px;"
          required>

        <br>
        <label for="dateFinishes">Date Finishes:</label>
        <br>
        <input 
          class="text-sm border-2 rounded-full border-gray-400 p-1 pl-2 pr-2"
          type="date" 
          id="dateFinished" 
          name="dateFinished"
          value={editedDateFinishes ? new Date(editedDateFinishes.getTime() - (editedDateFinishes.getTimezoneOffset() * 60000)).toISOString().split("T")[0] : ''}
          placeholder="mm/dd/yyyy"
          style="margin-bottom: 10px;"
          required>

        <br>
        <label for="grade">Grade:</label>
        <br>
        <input 
          class="text-sm border-2 rounded-full border-gray-400 p-1 pl-2 pr-2"
          type="text" 
          id="grade" 
          name="grade"
          value={editedGrade}
          style="margin-bottom: 10px;"
          required>

      <br>
      <button type="submit">Save Changes</button>
      <a href="/dashboard/bootcamp/courses_offered/{enrollees.Course_ID}">Cancel</a>


      </form>

</main>