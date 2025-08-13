<script setup lang="ts">
type Votes = { fake: number; notFake: number }
const props = defineProps<{ votes: Votes }>()
const emit = defineEmits<{ (e: 'vote-fake'): void; (e: 'vote-not-fake'): void }>()
</script>

<template>
  <div>
    <h3>Votes</h3>
    <div class="vote-panel">
      <button @click="emit('vote-fake')">Fake ({{ props.votes.fake }})</button>
      <button @click="emit('vote-not-fake')">Not Fake ({{ props.votes.notFake }})</button>
    </div>
  </div>
</template>

<style scoped>
.vote-panel {
  display: flex;
  gap: 8px;
}
button {
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  cursor: pointer;
}
</style>


