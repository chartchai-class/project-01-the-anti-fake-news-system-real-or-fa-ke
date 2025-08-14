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
      class="rounded-md border px-3 py-1.5 text-sm disabled:opacity-40"
      :disabled="props.page === 1"
      @click="goPrev"
    >« Prev</button>

    <span class="text-sm text-slate-600">Page {{ props.page }} / {{ props.totalPages }}</span>

    <button
      class="rounded-md border px-3 py-1.5 text-sm disabled:opacity-40"
      :disabled="props.page === props.totalPages"
      @click="goNext"
    >Next »</button>
  </nav>
</template>


