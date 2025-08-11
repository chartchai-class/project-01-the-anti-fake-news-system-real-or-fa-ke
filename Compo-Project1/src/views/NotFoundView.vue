<script setup lang="ts">
const props = defineProps<{ resource?: string }>()
</script>

<template>
  <section class="nf">
    <h1>Not Found</h1>
    <p>Sorry, the {{ props.resource ?? 'page' }} you’re looking for wasn’t found.</p>
    <RouterLink :to="{ name: 'news-list' }">Go Home</RouterLink>
  </section>
</template>

<style scoped>
.nf {
  text-align: center;
  max-width: 720px;
  margin: 40px auto;
}
a {
  text-decoration: none;
  color: #2563eb;
}
</style>
