<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { getDB } from '@/service/api'
import NewsList from '@/components/NewsList.vue'
import Toolbar from '@/components/Toolbar.vue'
import Pagination from '@/components/Pagination.vue'
import type { Status, NewsItem, DB } from '@/types'  // ✅ ใช้ type กลาง
import Sreachbar from '@/components/SreachBar.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const db = ref<DB>({ news: [], comments: [] })
const loading = ref(true)
const errorMsg = ref<string | null>(null)

const perPage = ref(6)
const currentPage = ref(1)
const filter = ref<'all' | Status>('all')
const q = ref('')

onMounted(loadData)

async function loadData() {
  NProgress.start()
  loading.value = true
  errorMsg.value = null
  try {
    db.value = await getDB()
  } catch (e) {
    errorMsg.value = (e as Error)?.message ?? 'Load failed'
  } finally {
    loading.value = false
    NProgress.done()
  }
}

watch([filter, perPage], () => (currentPage.value = 1))

function normalizeStatus(value: unknown): string {
  return String(value ?? '').replace(/[_-]/g, '').toLowerCase()
}

const filteredNews = computed<NewsItem[]>(() =>
  filter.value === 'all'
    ? db.value.news
    : db.value.news.filter(n => normalizeStatus(n.status) === normalizeStatus(filter.value))
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
    <h1 class="text-xl font-semibold mb-4 mx-auto max-w-[1250px]">Social Anti‑Fake News</h1>

    <!-- Sreachbar -->
    <Sreachbar v-model="q" @select="item => $router.push({ name: 'news-detail', params: { id: item.id } })" />
      
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
