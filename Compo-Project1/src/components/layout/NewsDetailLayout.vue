<script setup lang="ts"></script>

<template>
  <section class="max-w-[960px] mx-auto my-6 px-4">
    <header class="mb-4">
      <RouterLink :to="{ name: 'news-list' }" class="inline-flex items-center gap-2 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back to News
      </RouterLink>
    </header>

    <RouterView />
  </section>
</template>