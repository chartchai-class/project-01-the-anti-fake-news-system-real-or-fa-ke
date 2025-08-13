<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import NewsList from '@/components/NewsList.vue'
import Toolbar from '@/components/Toolbar.vue'
import Pagination from '@/components/Pagination.vue'
import type { Status, NewsItem, DB } from '@/types'  // ✅ ใช้ type กลาง

const db = ref<DB>({ news: [], comments: [] })
const loading = ref(true)
const errorMsg = ref<string | null>(null)

const perPage = ref(6)
const currentPage = ref(1)
const filter = ref<'all' | Status>('all')

onMounted(async () => {
  try {
    const res = await fetch('/api/db.json') // วางไฟล์ไว้ public/api/db.json
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    db.value = await res.json()
  } catch (e: any) {
    errorMsg.value = e?.message ?? 'Load failed'
  } finally {
    loading.value = false
  }
})

watch([filter, perPage], () => (currentPage.value = 1))

const filteredNews = computed<NewsItem[]>(() =>
  filter.value === 'all' ? db.value.news : db.value.news.filter(n => n.status === filter.value)
)

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredNews.value.length / perPage.value))
)

const paginatedNews = computed<NewsItem[]>(() => {
  const start = (currentPage.value - 1) * perPage.value
  return filteredNews.value.slice(start, start + perPage.value)
})
</script>

<template>
  <section>
    <h1 class="text-xl font-semibold mb-4 mx-auto max-w-[1200px]">Social Anti‑Fake News</h1>

    <!-- Toolbar -->
    <Toolbar v-model:perPage="perPage" v-model:filter="filter" />

    <!-- States -->
    <div v-if="loading" class="text-slate-500">Loading…</div>
    <div v-else-if="errorMsg" class="text-red-600">Error: {{ errorMsg }}</div>
    <div v-else-if="filteredNews.length === 0" class="text-slate-500">No news found.</div>

    <!-- ใช้คอมโพเนนต์รายการ (ตัด all-comments ออก) -->
    <div v-else class="mx-auto w-11/12 md:w-3/4 lg:w-2/3">
      <NewsList :news="paginatedNews" />
    </div>

    <!-- Pagination -->
    <Pagination
      v-if="!loading && !errorMsg && filteredNews.length"
      v-model:page="currentPage"
      :totalPages="totalPages"
    />
  </section>
</template>
