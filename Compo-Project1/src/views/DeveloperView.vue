<script setup lang="ts">
import { ref, onMounted } from 'vue'

const developer = ref<any[]>([])

onMounted(async () => {
  const res = await fetch('/api/db.json')
  const db = await res.json()
  developer.value = db.developer || []
})
</script>

<template>
  <section class="mx-auto w-11/12 md:w-3/4 lg:w-2/3 dark:text-slate-100">
    <h1 class="text-xl font-semibold mb-4">Developer</h1>
    <p class="mb-6 text-[1.1rem] text-slate-600 dark:text-slate-400">
      This application empowers the community to work together in identifying and flagging potential fake news by sharing votes, evidence, and constructive comments.
    </p>

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
