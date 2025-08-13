<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref, onMounted, watch } from 'vue'

const dark = ref(false)

function applyTheme(value: boolean) {
  document.documentElement.classList.toggle('dark', value)
  try {
    localStorage.setItem('theme', value ? 'dark' : 'light')
  } catch {}
}

onMounted(() => {
  try {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark' || saved === 'light') {
      dark.value = saved === 'dark'
    } else {
      dark.value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    }
  } catch {
    dark.value = false
  }
  applyTheme(dark.value)
})

watch(dark, (v) => applyTheme(v))

function toggleTheme() {
  dark.value = !dark.value
}
</script>

<template>
  <header class="w-full px-4 py-3 grid grid-cols-[1fr,auto,1fr] items-center gap-3">
    <RouterLink :to="{ name: 'news-list' }" class="justify-self-start inline-flex items-center rounded-xl bg-blue-50 px-2 py-1 font-extrabold text-blue-600 dark:bg-slate-800 dark:text-blue-300">
      Real or Fa-Ke
    </RouterLink>
    <nav class="flex items-center justify-center gap-2">
      <RouterLink :to="{ name: 'news-list' }" class="px-3 py-1.5 rounded-lg hover:bg-green-50 dark:hover:bg-slate-800"
                  :class="{ 'underline bg-green-50 text-green-700 border border-green-200 dark:bg-slate-800 dark:text-green-300': $route.name==='news-list' }">News</RouterLink>
      <RouterLink :to="{ name: 'developer' }" class="px-3 py-1.5 rounded-lg hover:bg-green-50 dark:hover:bg-slate-800"
                  :class="{ 'underline bg-green-50 text-green-700 border border-green-200 dark:bg-slate-800 dark:text-green-300': $route.name==='developer' }">Developer</RouterLink>
    </nav>
    <div class="justify-self-end">
      <button
        @click="toggleTheme"
        :aria-pressed="dark"
        :title="dark ? 'Switch to light mode' : 'Switch to dark mode'"
        class="inline-flex items-center gap-2 rounded-full border border-slate-300 px-2 py-1 text-sm bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-green-400 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
      >
        <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-yellow-300 text-yellow-900 dark:bg-slate-700 dark:text-slate-200 transition-colors">
          <span v-if="dark" aria-hidden="true">🌙</span>
          <span v-else aria-hidden="true">☀️</span>
        </span>
        <span class="text-slate-700 dark:text-slate-200">{{ dark ? 'Dark' : 'Light' }}</span>
      </button>
    </div>
  </header>
</template>


