<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

const route = useRoute()
const news = ref<any | null>(null)

// เดโม่: โหลดข้อมูลเบื้องต้น (ภายหลังค่อยเปลี่ยนเป็นดึงจาก mock db/service)
onMounted(() => {
  news.value = {
    id: route.params.id,
    topic: 'Sample News Title',
    body: 'Full details of this news will be shown here.',
    status: 'fake',
    reporter: 'Alice',
    datetime: new Date().toISOString(),
    imageUrl: 'https://picsum.photos/seed/fake/800/400'
  }
})
</script>

<template>
  <article v-if="news" class="detail">
    <h2>{{ news.topic }}</h2>
    <p class="meta">
      <span>Status: <strong>{{ news.status }}</strong></span> •
      <span>Reporter: {{ news.reporter }}</span> •
      <span>{{ new Date(news.datetime).toLocaleString() }}</span>
    </p>

    <p>{{ news.body }}</p>

    <p>
      Image: <a :href="news.imageUrl" target="_blank" rel="noopener">Open link</a>
    </p>

    <div class="actions">
      <RouterLink :to="{ name: 'news-discussion', params: { id: news.id } }">
        View comments & votes
      </RouterLink>
    </div>
  </article>
</template>

<style scoped>
.detail { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; }
.meta { color: #6b7280; margin-bottom: 12px; }
.actions { margin-top: 16px; }
a { text-decoration: none; color: #2563eb; }
</style>
