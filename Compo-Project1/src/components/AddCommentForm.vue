<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{ (e: 'submit', payload: { username: string; text: string; link: string; vote: 'fake' | 'not_fake' | null }): void }>()

const username = ref('')
const text = ref('')
const link = ref('')
const selectedVote = ref<'fake' | 'not_fake' | null>(null)
const isPosting = ref(false)

function handleSubmit() {
  if (isPosting.value) return
  if (!text.value && !link.value) return
  isPosting.value = true
  const payload = {
    username: username.value,
    text: text.value,
    link: link.value,
    vote: selectedVote.value,
  }
  emit('submit', payload)
  username.value = ''
  text.value = ''
  link.value = ''
  selectedVote.value = null
  isPosting.value = false
}
</script>

<template>
  <div>
    <h3 class="mt-4">Add your comment / image URL</h3>
    <div class="flex flex-col gap-2">
      <div class="grid gap-2">
        <input v-model="username" type="text" placeholder="Your UserName" class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" />
      </div>
      <div class="grid gap-2 grid-cols-1 md:[grid-template-columns:1fr_1fr_auto]">
        <input v-model="text" type="text" placeholder="Your comment..." class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" />
        <input v-model="link" type="url" placeholder="Image URL (optional)" class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" />
        <button @click="handleSubmit" class="px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">Post</button>
      </div>
    </div>
  </div>
</template>



