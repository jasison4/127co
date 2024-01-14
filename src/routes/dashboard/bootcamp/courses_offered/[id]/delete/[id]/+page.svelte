<script lang="ts">
  import Breadcrumb from "$lib/components/Breadcrumb.svelte";
  import { Hr } from "flowbite-svelte";
  import type { PageData } from "./$types";
  export let data: PageData;
  const { enrollees } = data;
  
  console.log(enrollees.Course_ID);
</script>

<main class="w-full">  
    <Breadcrumb items={[
        { href: "/dashboard/bootcamp", text: "Bootcamp" },
        { href: "/dashboard/bootcamp/courses_offered", text: "Courses Offered" },
        {
          href: `/dashboard/bootcamp/courses_offered/${enrollees.Course_ID}`,
          text: enrollees.Course_Name

        },
        { href: `/dashboard/bootcamp/courses_offered/${enrollees.Course_Name}/Delete/${enrollees.Enrollment_ID}`,
            text: "Delete " + enrollees.Enrollment_ID + " " + enrollees.Employee_LastName
        }
      ]}/>
  
  <div class="container">
    <p class="mb-4">Are you sure you want to delete this entry?</p>
    <form method="POST">
      <input type="hidden" id="course_ID" name="course_ID" value="{enrollees.Course_ID}">
      <button type="submit">Yes</button>
      <a href="/dashboard/bootcamp/courses_offered/{enrollees.Course_ID}"
        >Cancel</a
      >
      
    </form>
  </div>
  


</main>