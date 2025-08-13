<script setup lang="ts">
const props = defineProps<{ page: number; totalPages: number }>()
const emit = defineEmits<{ (e: 'update:page', value: number): void }>()

function goPrev() {
  if (props.page > 1) emit('update:page', props.page - 1)
}
function goNext() {
  if (props.page < props.totalPages) emit('update:page', props.page + 1)
}
</script>

<template>
  <nav class="mt-5 flex items-center justify-center gap-3" aria-label="Pagination">
    <button
      class="rounded-md border px-3 py-1.5 text-sm disabled:opacity-40"
      :disabled="page===1"
      @click="goPrev"
    >« Prev</button>

    <span class="text-sm text-slate-600">Page {{ page }} / {{ totalPages }}</span>

    <button
      class="rounded-md border px-3 py-1.5 text-sm disabled:opacity-40"
      :disabled="page===totalPages"
      @click="goNext"
    >Next »</button>
  </nav>
</template>


