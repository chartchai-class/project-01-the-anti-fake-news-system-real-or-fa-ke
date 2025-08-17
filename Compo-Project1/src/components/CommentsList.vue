<script setup lang="ts">
import type { CommentItem } from '@/types'

defineProps<{
  comments: CommentItem[]
}>()
</script>

<template>
  <div>
    <h3 class="mt-4">Comments</h3>
    <ul class="list-none p-0 grid gap-2 mt-2 sm:gap-3">
      <li v-for="c in comments" :key="c.id" class="border border-slate-200 rounded-lg p-3 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/50 sm:p-4">
        <strong>{{ c.username || 'Anonymous' }}</strong>
        <p class="text-slate-700 dark:text-slate-300">{{ c.text }}</p>
        <img v-if="c.imageUrl" :src="c.imageUrl" alt="News Image" class="max-w-full rounded-xl my-2 sm:my-3" loading="lazy" decoding="async" fetchpriority="low" sizes="100vw" />
        <small class="text-slate-500 dark:text-slate-400">{{ c.createdAt || c.at || 'Unknown date' }}</small>
      </li>
    </ul>
  </div>
  
</template>


