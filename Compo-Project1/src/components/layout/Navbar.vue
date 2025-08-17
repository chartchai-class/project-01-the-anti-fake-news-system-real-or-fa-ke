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

const isOpen = ref(false)
function toggleMenu() {
  isOpen.value = !isOpen.value
}
function closeMenu() {
  isOpen.value = false
}
</script>

<template>
  <header class="w-full px-4 py-3">
    <div class="flex items-center justify-between gap-3">
      <RouterLink :to="{ name: 'news-list' }" class="inline-flex items-center rounded-xl bg-green-50 px-2 py-1 font-extrabold text-green-700 dark:bg-slate-800 dark:text-green-300">
        Real or Fa-Ke
      </RouterLink>
      <div class="flex items-center gap-2">
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
          <span class="text-slate-700 dark:text-slate-200 hidden sm:inline">{{ dark ? 'Dark' : 'Light' }}</span>
        </button>
        <button
          @click="toggleMenu"
          class="sm:hidden inline-flex items-center justify-center rounded-lg border border-slate-300 p-2 text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-green-400 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          :aria-expanded="isOpen"
          aria-controls="primary-nav"
        >
          <span class="sr-only">Toggle navigation</span>
          <!-- Hamburger icon when menu is closed -->
          <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
            <path fill-rule="evenodd" d="M3.75 6.75A.75.75 0 0 1 4.5 6h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75zm0 5.25a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75zm0 5.25a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75z" clip-rule="evenodd" />
          </svg>
          <!-- X icon when menu is open -->
          <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
            <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>

    <nav
      id="primary-nav"
      :class="[ isOpen ? 'flex' : 'hidden', 'mt-2 flex-col gap-2 sm:mt-0 sm:flex sm:flex-row sm:items-center sm:justify-center sm:gap-2' ]"
    >
      <RouterLink :to="{ name: 'news-list' }" @click="closeMenu" class="px-3 py-1.5 rounded-lg transition-colors hover:bg-green-50 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-300"
                  :class="{ 'underline underline-offset-4 bg-green-50 text-green-700 border border-green-300 font-medium dark:bg-slate-800 dark:text-green-300 dark:border-green-700': $route.name==='news-list' }">News</RouterLink>
      <RouterLink :to="{ name: 'developer' }" @click="closeMenu" class="px-3 py-1.5 rounded-lg transition-colors hover:bg-green-50 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-300"
                  :class="{ 'underline underline-offset-4 bg-green-50 text-green-700 border border-green-300 font-medium dark:bg-slate-800 dark:text-green-300 dark:border-green-700': $route.name==='developer' }">Developer</RouterLink>
    </nav>
  </header>
</template>


