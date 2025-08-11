<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

const route = useRoute()
const news = ref<any | null>(null)

onMounted(async () => {
  const res = await fetch('/api/db.json')
  const db = await res.json()

  const id = Number(route.params.id)
  news.value = db.news.find((n: any) => n.id === id)
})
</script>

<template>
  <article v-if="news" class="detail">
    <h2>{{ news.topic }}</h2>

    <p class="meta">
      <span>Status: <strong>{{ news.status }}</strong></span> •
      <span>Reporter: {{ news.reporterName }}</span> •
      <span>Date:{{ news.reportedAt }}</span>
    </p>

    <img
      v-if="news.imageUrl"
      :src="news.imageUrl"
      alt="News Image"
      class="news-image"
    />

    <p>{{ news.fullDetail }}</p>

    <p v-if="news.imageUrl">
      <strong>Image link:</strong> <a :href="news.imageUrl" target="_blank" rel="noopener">Open</a>
    </p>

    <div class="actions">
      <RouterLink :to="{ name: 'news-discussion', params: { id: news.id } }">
        View comments & votes
      </RouterLink>
    </div>
  </article>
</template>

<style scoped>
.detail {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
}
.meta {
  color: #6b7280;
  margin-bottom: 12px;
}
.news-image {
  max-width: 100%;
  border-radius: 12px;
  margin-bottom: 16px;
}
.actions {
  margin-top: 16px;
}
a {
  text-decoration: none;
  color: #2563eb;
}
</style>
