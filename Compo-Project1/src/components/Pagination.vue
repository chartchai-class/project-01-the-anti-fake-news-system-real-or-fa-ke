<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  totalItems: {
    type: Number,
    required: false
  }
})

const emit = defineEmits<{
  (e: 'update:page', value: number): void
  (e: 'page-change'): void
}>()

function goPrev() {
  if (props.page > 1) {
    emit('update:page', props.page - 1)
    emit('page-change')
  }
}
function goNext() {
  if (props.page < props.totalPages) {
    emit('update:page', props.page + 1)
    emit('page-change')
  }
}
</script>

<template>
  <nav class="mt-5 flex items-center justify-center gap-3" aria-label="Pagination">
    <button
      class="rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors dark:border-slate-600 dark:hover:bg-slate-800"
      :disabled="props.page === 1"
      @click="goPrev"
      :aria-label="`Go to previous page (page ${props.page - 1})`"
    >« Prev</button>

    <div class="flex flex-col items-center">
      <span class="text-sm text-slate-600 dark:text-slate-400">Page {{ props.page }} of {{ props.totalPages }}</span>
      <span v-if="props.totalItems" class="text-xs text-slate-500 dark:text-slate-500">{{ props.totalItems }} total items</span>
    </div>

    <button
      class="rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors dark:border-slate-600 dark:hover:bg-slate-800"
      :disabled="props.page === props.totalPages"
      @click="goNext"
      :aria-label="`Go to next page (page ${props.page + 1})`"
    >Next »</button>
  </nav>
</template>


