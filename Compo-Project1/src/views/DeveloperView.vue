<script setup lang="ts">
import { ref, onMounted } from 'vue'

const developer = ref<any[]>([])

onMounted(async () => {
  const res = await fetch('/api/db.json')
  const db = await res.json()
  developer.value = db.developer || []
})
</script>

<template>
  <section class="page">
    <h1>Developer</h1>
    <p class="intro">
      This application empowers the community to work together in identifying and flagging potential fake news by sharing votes, evidence, and constructive comments.
    </p>

    <div class="dev-list">
      <div v-for="dev in developer" :key="dev.id" class="dev-card">
        <h2>{{ dev.name }}</h2>
        <h3>{{ dev.code }}</h3>
        <p>{{ dev.description }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.page {
  max-width: 900px;
  margin: 24px auto;
  padding: 0 16px;
}
h1 {
  font-size: 2rem;
  margin-bottom: 12px;
  color: #2563eb;
}
.intro {
  margin-bottom: 24px;
  font-size: 1.1rem;
  color: #4b5563;
}
.dev-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
}
.dev-card {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
  background: #fff;
  transition: box-shadow 0.2s;
}
.dev-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}
.dev-card h2 {
  margin: 0 0 4px;
  font-size: 1.25rem;
}
.dev-card h3 {
  margin: 0 0 8px;
  font-size: 1rem;
  font-weight: 500;
  color: #6b7280;
}
.dev-card p {
  margin: 0;
  font-size: 0.95rem;
  color: #374151;
}
</style>
