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
  <div class="flex flex-wrap items-center justify-between gap-3 mb-4 mx-auto max-w-lg">
    <label class="inline-flex items-center gap-2">
      <span class="text-slate-600">Show per page</span>
      <div class="relative">
        <select
          v-model.number="perPageProxy"
          class="rounded-md border border-slate-200 bg-white px-3 py-1.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option :value="6">6</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
        </select>
        <span class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400"></span>
      </div>
    </label>

    <div class="flex items-center gap-2">
      <button
        class="px-2.5 py-1.5 text-sm rounded-md border transition hover:bg-blue-50"
        :class="filterProxy==='all' ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200'"
        @click="filterProxy = 'all'"
      >All</button>
      <button
        class="px-2.5 py-1.5 text-sm rounded-md border transition hover:bg-blue-50"
        :class="filterProxy==='fake' ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200'"
        @click="filterProxy = 'fake'"
      >Fake</button>
      <button
        class="px-2.5 py-1.5 text-sm rounded-md border transition hover:bg-blue-50"
        :class="filterProxy==='not-fake' ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200'"
        @click="filterProxy = 'not-fake'"
      >Not Fake</button>
    </div>
  </div>
</template>


