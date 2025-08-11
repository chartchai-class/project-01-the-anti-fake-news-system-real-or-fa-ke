<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

// State หลัก
const db = ref<{ news: any[]; comments: any[] }>({ news: [], comments: [] })
const perPage = ref(6)
const currentPage = ref(1)
const filter = ref<'all' | 'fake' | 'not-fake'>('all')

// โหลดข้อมูลจาก db.json
onMounted(async () => {
  const res = await fetch('/api/db.json')
  db.value = await res.json()
})

// ฟิลเตอร์ข่าว
const filteredNews = computed(() => {
  if (filter.value === 'all') return db.value.news
  return db.value.news.filter(n => n.status === filter.value)
})

// จัดการ pagination
const paginatedNews = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  return filteredNews.value.slice(start, start + perPage.value)
})

const totalPages = computed(() => Math.ceil(filteredNews.value.length / perPage.value))

// เปลี่ยนหน้าด้วยปุ่ม
function goPrev() {
  if (currentPage.value > 1) currentPage.value--
}
function goNext() {
  if (currentPage.value < totalPages.value) currentPage.value++
}
</script>

<template>
  <section class="home">
    <h1>Social Anti‑Fake News</h1>

    <div class="toolbar">
      <label>
        Show per page
        <select v-model.number="perPage">
          <option :value="6">6</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
        </select>
      </label>

      <div class="filters">
        <button :class="{ active: filter === 'all' }" @click="filter = 'all'">All</button>
        <button :class="{ active: filter === 'fake' }" @click="filter = 'fake'">Fake</button>
        <button :class="{ active: filter === 'not-fake' }" @click="filter = 'not-fake'">Not Fake</button>
      </div>
    </div>

    <ul class="list">
  <li v-for="n in paginatedNews" :key="n.id" class="card">
    <img
      v-if="n.imageUrl"
      :src="n.imageUrl"
      alt="news image"
      style="max-width: 100%; border-radius: 8px; margin-bottom: 8px"
    />

    <h3>{{ n.topic }}</h3>
    <p>{{ n.shortDetail }}</p>
    <p>Reporter: {{ n.reporterName }}</p>
    <p>Status: <strong>{{ n.status }}</strong></p>
    <RouterLink :to="{ name: 'news-detail', params: { id: n.id } }">View details</RouterLink>
  </li>
</ul>

    <nav class="pagination">
      <button @click="goPrev" :disabled="currentPage === 1">« Prev</button>
      <span>Page {{ currentPage }} / {{ totalPages }}</span>
      <button @click="goNext" :disabled="currentPage === totalPages">Next »</button>
    </nav>
  </section>
</template>

<style scoped>
.home {
  max-width: 1100px;
  margin: 24px auto;
  padding: 0 16px;
}
.toolbar {
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  margin: 16px 0;
}
.filters {
  display: flex;
  gap: 8px;
}
.filters button.active {
  background-color: #3b82f6;
  color: white;
}
.list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 12px;
}
.card {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 12px;
  background: #fff;
}
.pagination {
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
  margin: 18px 0;
}
button {
  cursor: pointer;
}
</style>
