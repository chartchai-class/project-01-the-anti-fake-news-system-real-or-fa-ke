<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="mb-4">
    <RouterLink
      :to="{ name: 'news-list' }"
      class="inline-block border border-green-500 text-green-600 dark:text-green-400
             rounded-md px-3 py-1.5 text-sm font-medium hover:bg-green-100
             dark:hover:bg-slate-800 transition"
    >
      ← Back to Home
    </RouterLink>
  </div>
</template>