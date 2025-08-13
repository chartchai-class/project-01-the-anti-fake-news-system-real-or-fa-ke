<script setup lang="ts"></script>

<template>
  <section class="max-w-[960px] mx-auto my-6 px-4">
    <header class="mb-4">
      <RouterLink :to="{ name: 'news-list' }">← Back to News</RouterLink>
    </header>

    <RouterView />
  </section>
</template>
