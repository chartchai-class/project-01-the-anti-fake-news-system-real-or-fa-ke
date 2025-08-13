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
    <h3 class="mt-4">Add your comment / image URL</h3>
    <div class="flex flex-col gap-2">
      <div class="grid gap-2">
        <input v-model="username" type="text" placeholder="Your UserName" class="px-3 py-2 rounded-lg border border-slate-200" />
      </div>
      <div class="grid gap-2 [grid-template-columns:1fr_1fr_auto]">
        <input v-model="text" type="text" placeholder="Your comment..." class="px-3 py-2 rounded-lg border border-slate-200" />
        <input v-model="link" type="url" placeholder="Image URL (optional)" class="px-3 py-2 rounded-lg border border-slate-200" />
        <button @click="handleSubmit" class="px-3 py-2 rounded-lg border border-slate-200">Post</button>
      </div>
    </div>
  </div>
</template>



