<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getDeveloper } from '@/service/api'

const developer = ref<any[]>([])

onMounted(async () => {
  developer.value = await getDeveloper()
})
</script>

<template>
  <section class="mx-auto w-11/12 md:w-3/4 lg:w-2/3 dark:text-slate-100">
    <h1 class="text-xl font-semibold mb-2">Project & Team</h1>
    <p class="text-[1.05rem] text-slate-600 dark:text-slate-400">
      Real or Fa‑Ke is a community‑driven tool to help identify and flag potential fake news. People can vote, add evidence, and discuss to reach a clearer understanding together.
    </p>
    <div class="mt-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
      <h2 class="text-base font-medium mb-2">Key features</h2>
      <ul class="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
        <li>News feed with filtering and pagination</li>
        <li>Vote Fake / Not Fake with supporting comments and evidence</li>
        <li>Mock API data for fast iteration</li>
        <li>Responsive layout with dark mode</li>
        <li>Component‑based UI with reusable Toolbar and Pagination</li>
      </ul>
      <h2 class="text-base font-medium mt-4 mb-2">Core tech stack</h2>
      <div class="flex flex-wrap gap-2 text-xs">
        <span class="rounded-md bg-slate-100 px-2 py-1 text-slate-600 dark:bg-slate-800 dark:text-slate-300">Vue 3</span>
        <span class="rounded-md bg-slate-100 px-2 py-1 text-slate-600 dark:bg-slate-800 dark:text-slate-300">TypeScript</span>
        <span class="rounded-md bg-slate-100 px-2 py-1 text-slate-600 dark:bg-slate-800 dark:text-slate-300">Vite</span>
        <span class="rounded-md bg-slate-100 px-2 py-1 text-slate-600 dark:bg-slate-800 dark:text-slate-300">TailwindCSS</span>
        <span class="rounded-md bg-slate-100 px-2 py-1 text-slate-600 dark:bg-slate-800 dark:text-slate-300">Vue Router</span>
      </div>
    </div>
    <br>
    <div class="grid [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))] gap-4">
      <div
        v-for="dev in developer"
        :key="dev.id"
        class="border border-slate-200 rounded-xl p-4 bg-white transition-shadow hover:shadow dark:border-slate-700 dark:bg-slate-900"
      >
        <h2 class="mb-1 text-xl">{{ dev.name }}</h2>
        <h3 class="mb-2 text-base font-medium text-slate-500 dark:text-slate-400">{{ dev.code }}</h3>
        <p class="text-[0.95rem] text-slate-700 dark:text-slate-300">{{ dev.description }}</p>
      </div>
    </div>
  </section>
  
</template>
