<template>
  <div class="animate-pulse">
    <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="i in count" :key="i" class="rounded-xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-900">
               <!-- Content wrapper with flex layout -->
        <div class="flex-1 flex flex-col">
          <!-- Title skeleton -->
          <div class="mb-2 h-4 bg-slate-200 rounded dark:bg-slate-700"></div>
          <div class="mb-3 h-3 w-3/4 bg-slate-200 rounded dark:bg-slate-700"></div>
          
          <!-- Description skeleton -->
          <div class="mb-2 h-3 bg-slate-200 rounded dark:bg-slate-700"></div>
          <div class="mb-2 h-3 w-5/6 bg-slate-200 rounded dark:bg-slate-700"></div>
          <div class="mb-4 h-3 w-4/6 bg-slate-200 rounded dark:bg-slate-700 flex-1"></div>
          
          <!-- Meta info skeleton - pushed to bottom -->
          <div class="mt-auto space-y-2">
            <div class="h-3 w-1/2 bg-slate-200 rounded dark:bg-slate-700"></div>
            <div class="h-3 w-1/3 bg-slate-200 rounded dark:bg-slate-700"></div>
            <div class="h-2 w-full bg-slate-200 rounded dark:bg-slate-700"></div>
          </div>
        </div>rk:bg-slate-700 flex-1"></div>
          
          <!-- Meta info skeleton - pushed to bottom -->
          <div class="mt-auto space-y-2">
            <div class="h-3 w-1/2 bg-slate-200 rounded dark:bg-slate-700"></div>
            <div class="h-3 w-1/3 bg-slate-200 rounded dark:bg-slate-700"></div>
            <div class="h-2 w-full bg-slate-200 rounded dark:bg-slate-700"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  count?: number
}>()
</script>

