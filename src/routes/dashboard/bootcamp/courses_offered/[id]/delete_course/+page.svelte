<script lang="ts">
  import Breadcrumb from "$lib/components/Breadcrumb.svelte";
  import { Hr } from "flowbite-svelte";
  import type { PageData } from "./$types";
  export let data: PageData;
  const { course } = data;
  
  console.log(course.Course_ID);
</script>

<main class="w-full">  
    <Breadcrumb items={[
        { href: "/dashboard/bootcamp", text: "Bootcamp" },
        { href: "/dashboard/bootcamp/courses_offered", text: "Courses Offered" },

        { href: `/dashboard/bootcamp/courses_offered/${course.Course_Name}/delete_course`,
            text: "Delete " + course.Course_Name
        }
      ]}/>
  
  <div class="container">
    <p class="mb-4">Are you sure you want to delete this entry?</p>
    <form method="POST">
      <input type="hidden" id="course_ID" name="course_ID" value="{course.Course_ID}">
      <button type="submit">Yes</button>
      <a href="/dashboard/bootcamp/courses_offered/{course.Course_ID}/edit_course"
        >Cancel</a
      >
      
    </form>
  </div>
  


</main>