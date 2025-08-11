<script setup lang="ts"></script>

<template>
  <section class="detail-layout">
    <header class="detail-header">
      <RouterLink :to="{ name: 'news-list' }">← Back to News</RouterLink>
    </header>

    <RouterView />
  </section>
</template>

<style scoped>
.detail-layout {
  max-width: 960px;
  margin: 24px auto;
  padding: 0 16px;
}
.detail-header {
  margin-bottom: 16px;
}
a {
  text-decoration: none;
}
</style>
