<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'
const dark = ref(false)
onMounted(() => document.documentElement.classList.toggle('dark', dark.value))
function toggleTheme () {
  dark.value = !dark.value
  document.documentElement.classList.toggle('dark', dark.value)
}
</script>

<template>
  <a href="#main"
     class="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50
            focus:rounded-lg focus:bg-blue-600 focus:px-3 focus:py-2 focus:text-white">
    Skip to content
  </a>

  <div class="min-h-dvh grid grid-rows-[auto,1fr,auto] bg-white text-slate-800 dark:bg-slate-950 dark:text-slate-100">
    <header class="sticky top-0 z-20 border-b border-slate-200/70 dark:border-slate-800 bg-white/85 dark:bg-slate-950/70 backdrop-blur">
      <div class="mx-auto max-w-[1100px] px-4 py-3 grid grid-cols-[1fr,auto,1fr] items-center gap-3">
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
      </div>
    </header>

    <main id="main" class="mx-auto my-6 w-full max-w-[1100px] px-4">
      <RouterView />
    </main>

    <footer class="border-t border-slate-200 py-4 text-center text-sm text-slate-500 dark:border-slate-800">
      © 2025 Social Anti‑Fake News • Deployed on Vercel
    </footer>
  </div>
</template>
