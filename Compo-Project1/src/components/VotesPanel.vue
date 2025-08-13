<script setup lang="ts">
type Votes = { fake: number; notFake: number }
const props = defineProps<{ votes: Votes }>()
const emit = defineEmits<{ (e: 'vote-fake'): void; (e: 'vote-not-fake'): void }>()
</script>

<template>
  <div>
    <h3>Votes</h3>
    <div class="flex flex-wrap gap-2">
      <button class="px-2.5 py-1.5 text-sm rounded-md border border-slate-200 hover:bg-green-50 dark:border-slate-700 dark:hover:bg-slate-800" @click="emit('vote-fake')">Fake ({{ props.votes.fake }})</button>
      <button class="px-2.5 py-1.5 text-sm rounded-md border border-slate-200 hover:bg-green-50 dark:border-slate-700 dark:hover:bg-slate-800" @click="emit('vote-not-fake')">Not Fake ({{ props.votes.notFake }})</button>
    </div>
  </div>
</template>



