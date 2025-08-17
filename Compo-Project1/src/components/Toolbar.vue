<script setup lang="ts">
import { computed } from 'vue'

type Filter = 'all' | 'fake' | 'not-fake'

const props = defineProps<{ perPage: number; filter: Filter }>()
const emit = defineEmits<{
  (e: 'update:perPage', value: number): void
  (e: 'update:filter', value: Filter): void
}>()

const perPageProxy = computed({
  get: () => props.perPage,
  set: (v: number) => emit('update:perPage', v),
})

const filterProxy = computed({
  get: () => props.filter,
  set: (v: Filter) => emit('update:filter', v),
})
</script>

<template>
  <div
    class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 mx-auto max-w-lg py-4"
  >
    <!-- Select per page -->
    <label
      class="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto"
    >
      <span class="text-slate-600 dark:text-slate-300">Show per page</span>
      <div class="relative w-full sm:w-auto">
        <select
          v-model.number="perPageProxy"
          class="w-full sm:w-auto rounded-md border border-green-500 bg-white px-3 py-1.5 pr-8 text-sm 
                 focus:outline-none focus:ring-2 focus:ring-green-400 
                 dark:border-green-600 dark:bg-slate-900 dark:text-slate-100"
          :aria-label="`Show ${perPageProxy} items per page`"
        >
          <option :value="6">6 items</option>
          <option :value="10">10 items</option>
          <option :value="20">20 items</option>
        </select>
        <span
          class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400"
        ></span>
      </div>
    </label>

    <!-- Filter buttons -->
    <div class="flex flex-wrap items-center gap-2 w-full sm:w-auto">
      <span class="text-sm text-slate-600 dark:text-slate-300 mr-2">Filter:</span>
      <button
        class="flex-1 sm:flex-none px-3 py-1.5 text-sm rounded-md border border-green-500 transition hover:bg-green-100 dark:hover:bg-slate-800"
        :class="filterProxy==='all' 
          ? 'bg-green-600 text-white border-green-600 dark:border-green-600' 
          : 'bg-transparent text-green-600 dark:text-green-400'"
        @click="filterProxy = 'all'"
        :aria-label="`Show all news (currently ${filterProxy === 'all' ? 'active' : 'inactive'})`"
      >All</button>

      <button
        class="flex-1 sm:flex-none px-3 py-1.5 text-sm rounded-md border border-green-500 transition hover:bg-green-100 dark:hover:bg-slate-800"
        :class="filterProxy==='fake' 
          ? 'bg-green-600 text-white border-green-600 dark:border-green-600' 
          : 'bg-transparent text-green-600 dark:text-green-400'"
        @click="filterProxy = 'fake'"
        :aria-label="`Show fake news only (currently ${filterProxy === 'fake' ? 'active' : 'inactive'})`"
      >Fake</button>

      <button
        class="flex-1 sm:flex-none px-3 py-1.5 text-sm rounded-md border border-green-500 transition hover:bg-green-100 dark:hover:bg-slate-800"
        :class="filterProxy==='not-fake' 
          ? 'bg-green-600 text-white border-green-600 dark:border-green-600' 
          : 'bg-transparent text-green-600 dark:text-green-400'"
        @click="filterProxy = 'not-fake'"
        :aria-label="`Show not fake news only (currently ${filterProxy === 'not-fake' ? 'active' : 'inactive'})`"
      >Not Fake</button>
    </div>
  </div>
</template>
