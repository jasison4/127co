<script lang="ts">
    import Breadcrumb from "$lib/components/Breadcrumb.svelte";
    import { Hr } from "flowbite-svelte";
    import type { PageData } from "./$types";
    export let data: PageData;
    const { candidatesForCert, courseID, course } = data;
    

    let candidatesMap = candidatesForCert.map(candidate => ({ ...candidate, generateCert: false }));

function removeCandidate(id) {
  candidatesMap = candidatesMap.filter(candidate => candidate.id !== id);
}
  

</script>

<main>
    <Breadcrumb items={[
        { href: "/dashboard/bootcamp", text: "Bootcamp" },
        { href: "/dashboard/bootcamp/courses_offered", text: "Courses Offered" },
        { href: `/dashboard/bootcamp/courses_offered/${data.courseID}`, text: course.name},
        { href: `/dashboard/bootcamp/courses_offered/${data.courseID}/generate_cert`, text: "Generate Certificates"}
      ]}/>

    <form method="POST">
        <h3 class="text-subtext">Generate certificates for students who completed {course.name}.</h3>

        <table class="min-w-full divide-y divide-gray-200 text-center mt-10">
            <thead class="bg-gray-100">
                <tr>
                    <th>Name</th>
                    <th>Grade</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                {#each candidatesMap as candidate (candidate.id)}
                    <tr>
                    <td>{candidate.Name}</td>
                    <td>{candidate.Grade}</td>
                    <td><button on:click={() => removeCandidate(candidate.id)}>Remove</button></td>
                    </tr>
                {/each}
            </tbody>
        </table>
        {#each candidatesMap as candidate (candidate.id)}
            <input type="hidden" name="name" value="{candidate.Name}">
            <input type="hidden" name="grade" value="{candidate.Grade}">
            <input type="hidden" name="id" value="{candidate.generateCert}">
        {/each}

        <div  style="text-align: right;">
            <button type="submit" class="mt-2 mb-2" >Generate</button>
            <a href="/dashboard/bootcamp/courses_offered/{course.name}">Cancel</a>
        </div>
    </form>

</main>