<script setup lang="ts">
const props = defineProps<{ resource?: string }>()
</script>

<template>
  <section class="text-center max-w-[720px] mx-auto my-10">
    <h1 class="text-2xl mb-2">Not Found</h1>
    <p class="mb-4">Sorry, the {{ props.resource ?? 'page' }} you’re looking for wasn’t found.</p>
    <RouterLink :to="{ name: 'news-list' }" class="text-blue-600 no-underline">Go Home</RouterLink>
  </section>
</template>
