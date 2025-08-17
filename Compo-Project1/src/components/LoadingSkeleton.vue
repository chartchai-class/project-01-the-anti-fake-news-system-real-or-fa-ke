<template>
  <div class="animate-pulse">
    <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="i in count" :key="i" class="rounded-xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <!-- Image skeleton -->
        <div class="mb-2 h-40 w-full rounded-lg bg-slate-200 dark:bg-slate-700"></div>
        
        <!-- Title skeleton -->
        <div class="mb-2 h-4 bg-slate-200 rounded dark:bg-slate-700"></div>
        <div class="mb-2 h-3 w-3/4 bg-slate-200 rounded dark:bg-slate-700"></div>
        
        <!-- Description skeleton -->
        <div class="mb-2 h-3 bg-slate-200 rounded dark:bg-slate-700"></div>
        <div class="mb-2 h-3 w-5/6 bg-slate-200 rounded dark:bg-slate-700"></div>
        <div class="mb-2 h-3 w-4/6 bg-slate-200 rounded dark:bg-slate-700"></div>
        
        <!-- Meta info skeleton -->
        <div class="mb-2 h-3 w-1/2 bg-slate-200 rounded dark:bg-slate-700"></div>
        <div class="mb-2 h-3 w-1/3 bg-slate-200 rounded dark:bg-slate-700"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  count?: number
}>()
</script>
