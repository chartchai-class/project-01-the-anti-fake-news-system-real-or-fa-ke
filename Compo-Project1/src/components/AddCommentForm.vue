<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  onSubmit?: (payload: { username: string; text: string; link: string; vote: 'fake' | 'not_fake' | null }) => void
}>()
const emit = defineEmits<{ (e: 'submit', payload: { username: string; text: string; link: string; vote: 'fake' | 'not_fake' | null }): void }>()

const username = ref('')
const text = ref('')
const link = ref('')
const selectedVote = ref<'fake' | 'not_fake' | null>(null)

function handleSubmit() {
  if (!text.value && !link.value) return
  const payload = {
    username: username.value,
    text: text.value,
    link: link.value,
    vote: selectedVote.value,
  }
  emit('submit', payload)
  props.onSubmit?.(payload)
  username.value = ''
  text.value = ''
  link.value = ''
  selectedVote.value = null
}
</script>

<template>
  <div>
    <h3 style="margin-top: 16px">Add your comment / image URL</h3>
    <div class="form">
      <div class="row">
        <input v-model="username" type="text" placeholder="Your UserName" />
      </div>
      <div class="row">
        <input v-model="text" type="text" placeholder="Your comment..." />
        <input v-model="link" type="url" placeholder="Image URL (optional)" />
        <button @click="handleSubmit">Post</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.row {
  display: grid;
  gap: 8px;
}
.row:first-child {
  grid-template-columns: 1fr;
}
.row:last-child {
  grid-template-columns: 1fr 1fr auto;
}
input,
button {
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}
button {
  cursor: pointer;
}
</style>


