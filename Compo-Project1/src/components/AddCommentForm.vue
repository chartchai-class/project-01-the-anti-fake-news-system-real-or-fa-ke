<script setup lang="ts">
import { ref, computed } from 'vue'


const props = defineProps<{ voted: boolean }>()
const emit = defineEmits<{ (e: 'submit', payload: { username: string; text: string; link: string; vote: 'fake' | 'not_fake' | null }): void }>()

const username = ref('')
const text = ref('')
const link = ref('')
const isPosting = ref(false)

const isValid = computed(() => {
  return (
    props.voted === true &&
    username.value.trim().length > 0 &&
    text.value.trim().length > 0 &&
    username.value.trim().length <= 50
  )
})

function handleSubmit() {
  if (isPosting.value) return
  if (!isValid.value) return
  isPosting.value = true
  const payload = {
    username: username.value.trim(),
    text: text.value.trim(),
    link: link.value,
    vote: null,
  }
  emit('submit', payload)
  username.value = ''
  text.value = ''
  link.value = ''
  isPosting.value = false
}
</script>

<template>
  
  <div>
    <h3 class="mt-4">Add your comment / image URL</h3>
    <div class="flex flex-col gap-2">
      <div class="grid gap-2">
        <input 
          v-model="username" 
          type="text" 
          placeholder="Your UserName" 
          maxlength="50"
          class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" 
          required 
        />
        <div class="text-xs text-slate-500 dark:text-slate-400">
          {{ username.length }}/50 characters
        </div>
      </div>
      <div class="grid gap-2 grid-cols-1 md:[grid-template-columns:1fr_1fr_auto]">
        <input v-model="text" type="text" placeholder="Your comment..." class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" />
        <input v-model="link" type="url" placeholder="Image URL (optional)" class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" />
        <button @click="handleSubmit" :disabled="!isValid || isPosting" class="px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-700 dark:hover:bg-slate-800">Post</button>
      </div>
    </div>
  </div>
</template>



