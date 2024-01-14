<script lang="ts">
  import Breadcrumb from "$lib/components/Breadcrumb.svelte";
  import type { PageServerData } from "./$types";
  import Menu from "$lib/components/Menu.svelte";
  export let data: PageServerData;

  let filtered_course = data.Courses;
  let query: string = "";
  let selected_type: string = "";

  $: if (query || selected_type) {
    filtered_course = data.Courses.filter(
      (course: any) =>
        (course.Course_Name.toLowerCase().includes(query.toLowerCase())
          || course.Course_Category.toLowerCase().includes(query.toLowerCase())
          )
          && (!selected_type || course.Course_Category.toLowerCase() === selected_type.toLowerCase())
    )
  } else {
    filtered_course = data.Courses;
  }



</script>

<main class="w-full">
  <Breadcrumb
    items={[
      { href: "/dashboard/bootcamp", text: "Bootcamp" },
      { href: "/dashboard/bootcamp/courses_offered", text: "Courses Offered" },
    ]}
  />
  <h1 class="text-3xl font-bold text-gray-900 dark:text-white"> Courses Offered </h1>
  <p class="text-gray-700 dark:text-gray-400 mb-4">
    View and manage the courses offered by the bootcamp.
  </p>
  
  <div class="flex items-center justify-center">
    <div class="flex items-center">
      <input
        class="text-gray-700 block rounded-md px-4 py-2 text-sm mr-2"
        name="search"
        type="text"
        placeholder="Search"
        aria-label="Search"
        bind:value={query}
      />
      <Menu
        name="Category"
        items={["Soft Skills", "Technical Skills"]}
        bind:selected_item={selected_type}
      />
    </div>
  </div>

  


  <!-- Course listing -->
  <div class="project grid grid-cols-3 gap-5">
    <!-- Iterate through courseList and create clickable boxes -->
    <a href="/dashboard/bootcamp/courses_offered/add"
    class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    
    >
      <span class="text-3xl material-symbols-outlined mr-2"> add </span>
      Add a new Course
    </a>
    {#each filtered_course as course}
      <a href="/dashboard/bootcamp/courses_offered/{course.Course_ID}"
        class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 flex flex-col justify-between"
      >
        <div class="mb-4">
          <div>
            <div class="flex justify-between items-center">
              <div>
                <p class="text-sm font-semibold text-gray-500 dark:text-white">
                  {course.Course_Category}
                </p>
                <p class="text-sm text-gray-900 dark:text-white">
                  {course.Course_ID}
                </p>
              </div>
              <!-- Edit button -->
              <a href="/dashboard/bootcamp/courses_offered/{course.Course_ID}/edit_course">
                <span class="material-symbols-outlined">edit</span>
                <span class="text-base">Edit</span>
              </a>
            </div>
          </div>
          <!-- Course name -->
          <p class="text-lg font-bold text-gray-900 dark:text-white mt-2">
            {course.Course_Name}
          </p>

          <div class="mt-2 space-y-1">
            <div class="flex items-center">
              <span
                class="text-xs font-semibold text-gray-600 dark:text-gray-300 mr-1"
                >Instructor:</span
              >
              <span class="text-xs">{`${course.Employee_FirstName} ${course.Employee_LastName}`}</span>
            </div>
            <div class="flex items-center">
              <span
                class="text-xs font-semibold text-gray-600 dark:text-gray-300 mr-1"
                >Capacity:</span
              >
              <span class="text-xs">{course.Course_Capacity}</span>
            </div>
            <div class="flex items-center">
              <span
                class="text-xs font-semibold text-gray-600 dark:text-gray-300 mr-1"
                >Remaining Slots:</span
              >
              <span class="text-xs">{course.remaining_slots}</span>
            </div>
            <div class="flex items-center">
              <span
                class="text-xs font-semibold text-gray-600 dark:text-gray-300 mr-1"
                >Schedule:</span
              >
              <span class="text-xs">{course.Course_Schedule}</span>
            </div>
            <div class="flex items-center">
              <span
                class="text-xs font-semibold text-gray-600 dark:text-gray-300 mr-1"
                >Duration:</span
              >
              <span class="text-xs">{course.Course_Duration}</span>
            </div>
          </div>
        </div>
        <a href="/dashboard/bootcamp/courses_offered/{course.Course_ID}/enroll" class="w-full">
          {#if course.remaining_slots > 0}
            <button on:click|stopPropagation style="width: 100%;" class="mt-2 mb-2 w-full">Enroll</button>
          {:else}
            <button disabled style="width: 100%; background-color: gray;" class="mt-2 mb-2 w-full">No More Slots</button>
          {/if}
        </a>
      </a>
    {/each}
  </div>
</main>