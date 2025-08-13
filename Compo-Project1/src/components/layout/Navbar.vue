<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'

const dark = ref(false)
onMounted(() => document.documentElement.classList.toggle('dark', dark.value))
function toggleTheme () {
  dark.value = !dark.value
  document.documentElement.classList.toggle('dark', dark.value)
}
</script>

<template>
  <header class="w-full px-4 py-3 grid grid-cols-[1fr,auto,1fr] items-center gap-3">
    <RouterLink :to="{ name: 'news-list' }" class="justify-self-start inline-flex items-center rounded-xl bg-blue-50 px-2 py-1 font-extrabold text-blue-600 dark:bg-slate-800 dark:text-blue-300">
      Anti‑Fake
    </RouterLink>
    <nav class="flex items-center justify-center gap-2">
      <RouterLink :to="{ name: 'news-list' }" class="px-3 py-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800"
                  :class="{ 'bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-blue-300': $route.name==='news-list' }">News</RouterLink>
      <RouterLink :to="{ name: 'developer' }" class="px-3 py-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800"
                  :class="{ 'bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-blue-300': $route.name==='developer' }">Developer</RouterLink>
      <RouterLink :to="{ name: 'stats' }" class="px-3 py-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800"
                  :class="{ 'bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-blue-300': $route.name==='stats' }">Stats</RouterLink>
      <RouterLink :to="{ name: 'settings' }" class="px-3 py-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800"
                  :class="{ 'bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-blue-300': $route.name==='settings' }">Settings</RouterLink>
    </nav>
    <div class="justify-self-end">
      <button @click="toggleTheme" class="rounded-lg border border-slate-200 px-3 py-1.5 text-sm bg-slate-50 dark:border-slate-700 dark:bg-slate-900">
        {{ dark ? 'Light' : 'Dark' }}
      </button>
    </div>
  </header>
</template>


