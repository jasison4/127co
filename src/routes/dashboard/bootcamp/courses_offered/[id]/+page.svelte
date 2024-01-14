<script lang="ts">
  import Breadcrumb from "$lib/components/Breadcrumb.svelte";
  import type { PageData } from "./$types";
  export let data: PageData;

  // Extract course and employee data from the page data
  const { course, Enrollments, Certificates, remainingSlots } = data;

  // Function to format date to display only date part
  const formatDate = (dateString: string) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to handle clicking on the edit button for enrollments
  const handleEditEnrollment = (enrollmentID) => {
    window.location.href = `/dashboard/bootcamp/courses_offered/${course.Course_ID}/edit/${enrollmentID}`;
  };

  // Function to handle clicking on the delete button for enrollments
  const handleDeleteEnrollment = (enrollmentID) => {
    window.location.href = `/dashboard/bootcamp/courses_offered/${course.Course_ID}/delete/${enrollmentID}`;
  };

  // Function to handle clicking on the edit button for certificates
  const handleEditCertificate = (certificateID) => {
    // Add the logic to handle editing certificates
  };

  // Function to handle clicking on the delete button for certificates
  const handleDeleteCertificate = (certificateID) => {
    // Add the logic to handle deleting certificates
  };
</script>

<main class="w-full">
  <!-- Display breadcrumb -->
  <Breadcrumb
    items={[
      { href: "/dashboard/bootcamp", text: "Bootcamp" },
      { href: "/dashboard/bootcamp/courses_offered", text: "Courses Offered" },
      {
        href: `/dashboard/bootcamp/courses_offered/${course.Course_ID}`,
        text: course.Course_Name,
      },
    ]}
  />

  <!-- Display course details -->
  <h1 class="text-3xl font-bold mb-4">{course.Course_Name}</h1>
  <div class="grid grid-cols-2 gap-4">
    <div>
      <p><strong>Course ID:</strong> {course.Course_ID}</p>
      <p><strong>Instructor:</strong> {course.Employee_FirstName} {course.Employee_LastName}</p>
      <p><strong>Course Category:</strong> {course.Course_Category}</p>
      <!-- Add more course details as needed -->
    </div>
    <!-- Add more course details columns if needed -->
  </div>

  <!-- Display enrolled students data in a table -->
  {#if Enrollments && Enrollments.length > 0}
    <!-- Enrollments Section -->
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h2 class="text-2xl font-bold mt-6 mb-2">Enrolled Students</h2>
      <a href="/dashboard/bootcamp/courses_offered/{course.Course_ID}/enroll" class="w-1/6 mr-12">
        {#if remainingSlots.slots > 0}
          <button on:click|stopPropagation class=" w-full">Enroll</button>
        {:else}
          <button disabled style="background-color: gray;" class="mt-2 mb-6 w-full">No More Slots</button>
        {/if}
      </a>
    </div>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 text-center">
        <thead class="bg-gray-100">
          <tr>
            <th class="py-2">Enrollment ID</th>
            <th class="py-2">Name</th>
            <th class="py-2">Start Date</th>
            <th class="py-2">End Date</th>
            <th class="py-2">Grade</th>
            <th class="py-2">Actions</th>
            <!-- Add more columns as needed -->
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each Enrollments as enrollment (enrollment.Enrollment_ID)}
            <tr>
              <td class="py-2">{enrollment.Enrollment_ID}</td>
              <td class="py-2">{enrollment.Name}</td>
              <td class="py-2">{formatDate(enrollment.Start_Date)}</td>
              <td class="py-2">{enrollment.End_Date ? formatDate(enrollment.End_Date) : "Not Yet Finished"}</td>
              <td class="py-2">{enrollment.Grade ? enrollment.Grade : "Not Yet Graded"}</td>
              <td class="py-2">
                <!-- Add edit and delete buttons for enrollments -->
                <button class="px-4 py-2 mr-2 bg-blue-500 text-white rounded" on:click={() => handleEditEnrollment(enrollment.Enrollment_ID)}>Edit</button>
                <button class="px-4 py-2 bg-red-500 text-white rounded" on:click={() => handleDeleteEnrollment(enrollment.Enrollment_ID)}>Delete</button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {:else}
    <p class="mt-6">No enrolled students found for this course.</p>
  {/if}

  <!-- Display certificates data in a table -->
  {#if Certificates && Certificates.length > 0}
    <!-- Certificates Section -->
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h2 class="text-2xl font-bold mt-6 mb-2">Certificates</h2>
    </div>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 text-center">
        <thead class="bg-gray-100">
          <tr>
            <th class="py-2">Certificate ID</th>
            <th class="py-2">Employee Name</th>
            <th class="py-2">Release Date</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each Certificates as certificate (certificate.Certificate_ID)}
            <tr>
              <td class="py-2">{certificate.Certificate_ID}</td>
              <td class="py-2">{certificate.EmployeeName}</td>
              <td class="py-2">{formatDate(certificate.Release_Date)}</td>
              <td class="py-2">
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {:else}
    <p class="mt-6">No certificates found for this course.</p>
  {/if}
</main>
