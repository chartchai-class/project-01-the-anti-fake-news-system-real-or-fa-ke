<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import NewsList from '@/components/NewsList.vue'
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

function goPrev(){ if(currentPage.value>1) currentPage.value-- }
function goNext(){ if(currentPage.value<totalPages.value) currentPage.value++ }
function setFilter(v:'all'|Status){ filter.value = v }
</script>

<template>
  <section>
    <h1 class="text-xl font-semibold mb-4">Social Anti‑Fake News</h1>

    <!-- Toolbar -->
    <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
      <label class="inline-flex items-center gap-2">
        <span class="text-slate-600">Show per page</span>
        <div class="relative">
          <select
            v-model.number="perPage"
            class="rounded-md border border-slate-200 bg-white px-3 py-1.5 pr-8 text-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option :value="6">6</option>
            <option :value="10">10</option>
            <option :value="20">20</option>
          </select>
          <span class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400">▾</span>
        </div>
      </label>

      <div class="flex items-center gap-2">
        <button
          class="px-2.5 py-1.5 text-sm rounded-md border transition hover:bg-blue-50"
          :class="filter==='all' ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200'"
          @click="setFilter('all')"
        >All</button>
        <button
          class="px-2.5 py-1.5 text-sm rounded-md border transition hover:bg-blue-50"
          :class="filter==='fake' ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200'"
          @click="setFilter('fake')"
        >Fake</button>
        <button
          class="px-2.5 py-1.5 text-sm rounded-md border transition hover:bg-blue-50"
          :class="filter==='not-fake' ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200'"
          @click="setFilter('not-fake')"
        >Not Fake</button>
      </div>
    </div>

    <!-- States -->
    <div v-if="loading" class="text-slate-500">Loading…</div>
    <div v-else-if="errorMsg" class="text-red-600">Error: {{ errorMsg }}</div>
    <div v-else-if="filteredNews.length === 0" class="text-slate-500">No news found.</div>

    <!-- ใช้คอมโพเนนต์รายการ (ตัด all-comments ออก) -->
    <NewsList v-else :news="paginatedNews" />

    <!-- Pagination -->
    <nav
      v-if="!loading && !errorMsg && filteredNews.length"
      class="mt-5 flex items-center justify-center gap-3"
      aria-label="Pagination"
    >
      <button
        class="rounded-md border px-3 py-1.5 text-sm disabled:opacity-40"
        :disabled="currentPage===1"
        @click="goPrev"
      >« Prev</button>
      <span class="text-sm text-slate-600">Page {{ currentPage }} / {{ totalPages }}</span>
      <button
        class="rounded-md border px-3 py-1.5 text-sm disabled:opacity-40"
        :disabled="currentPage===totalPages"
        @click="goNext"
      >Next »</button>
    </nav>
  </section>
</template>
