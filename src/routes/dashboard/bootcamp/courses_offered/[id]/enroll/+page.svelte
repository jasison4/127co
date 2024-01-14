<script lang="ts">
    import Breadcrumb from "$lib/components/Breadcrumb.svelte";
    import { Hr } from "flowbite-svelte";
    import type { PageData } from "./$types";
    export let data: PageData;
    const { course, employeeNames, remainingSlots, newEnrollment_ID, enrollees } = data;
  
    let editedEnrollmentID: any;
    let employeeID: any;
    let selectedName: any = '';
    let currentDate: string = new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().split("T")[0];
    let editedDateStarted = currentDate;
    let names = employeeNames.map((employeeNames) => employeeNames.names)
    let enrolled = new Map<string, string>();

    enrollees.forEach(enrollee => {
      enrolled.set(
      enrollee.Employee_ID, 
      new Date(new Date(enrollee.Start_Date).getTime() - (new Date(enrollee.Start_Date).getTimezoneOffset() * 60000)).toISOString().split("T")[0]
    );});

    function getEmployeeID(selectedName: string): string {
        const employee = employeeNames.find((employeeNames) => employeeNames.names === selectedName);
        return employee ? employee.Employee_ID : '';
    }

    function isEnrolled(employeeID: string, dateenrolled: string): boolean {
      return enrolled.get(employeeID) === dateenrolled;
    }
    console.log(enrolled)  

</script>
  
  <main class="w-full">  
    <Breadcrumb items={[
        { href: "/dashboard/bootcamp", text: "Bootcamp" },
        { href: "/dashboard/bootcamp/courses_offered", text: "Courses Offered" },
        { href: `/dashboard/bootcamp/courses_offered/${course.Course_ID}/enroll`,
          text: "Enroll " + course.Course_Name
        }
      ]}/>
    
    <h1 class="text-3xl font-semibold">Enroll {course.Course_Name}</h1>
    
    <!-- Display course details -->
    <div class="grid grid-cols-2 gap-4">
      <div>
        <p><strong>Course ID:</strong> {course.Course_ID} <strong class="ml-4">Course Category:</strong> {course.Course_Category}
        <p><strong>Instructor:</strong> {course.Employee_FirstName} {course.Employee_LastName } 
          <strong class="ml-4">Course Schedule:</strong> {course.Course_Schedule}
        <p><strong>Remaining Slots:</strong> {remainingSlots.slots}</p>

      </div>
    </div>
      
    <form method="POST" class="mt-6">
      <h3 class="text-subtext">Enroll an employee to this course.</h3>
      <label for="enrollmentID">Enrollment ID:</label>
      <br>
      <input 
        class="text-sm border-2 rounded-full border-gray-400 text-gray-700 p-1 pl-2 pr-2"
        type="text" 
        id="enrollmentID" 
        name="enrollmentID"
        value={newEnrollment_ID.new}
        required
        style="margin-bottom: 10px;" 
        disabled>

      <br>
      <label for="Name">Name:</label>
      <br>
    

      <select
        class="text-sm border-2 rounded-full border-gray-400 p-1 pl-2 pr-2 w-1/3"
        id="Name"
        name="Name"
        bind:value={selectedName}
        required
        
        style="margin-bottom: 10px;"
      >
        <option value="">Select an employee</option>
        {#each names as name}
          <option value={name}>{name}</option>
        {/each}
      </select>

      <input id="employeeID" name="employeeID"
        class="hidden"
        value={getEmployeeID(selectedName)}>

      <br>
      <label for="dateStarted">Date Started:</label>
      <br>
      <input 
        class="text-sm border-2 rounded-full border-gray-400 p-1 pl-2 pr-2"
        type="date" 
        id="dateStarted" 
        name="dateStarted"
        placeholder={currentDate}
        bind:value={editedDateStarted}
        style="margin-bottom: 10px;"
        required
        >
      <!-- <label for="s">{editedDateStarted}, {getEmployeeID(selectedName)}, {isEnrolled(getEmployeeID(selectedName),editedDateStarted)}</label> -->

      <br>
      {#if !isEnrolled(getEmployeeID(selectedName),editedDateStarted)}
        <button type="submit" class="mt-2 mb-2">Enroll</button>
      {:else}
        <h3>Employee is already enrolled in this course.</h3>
        <button type="submit" class="mt-2 mb-2" style="color: gray;" disabled>Enroll</button>
      {/if}
      <a href="/dashboard/bootcamp/courses_offered">Cancel</a>
      </form>
  </main>