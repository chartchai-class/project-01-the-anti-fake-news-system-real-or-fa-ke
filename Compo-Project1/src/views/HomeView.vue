<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getDB } from '@/service/api'
import NewsList from '@/components/NewsList.vue'
import Toolbar from '@/components/Toolbar.vue'
import Pagination from '@/components/Pagination.vue'
import Sreachbar from '@/components/SreachBar.vue'
import { useNewsStore } from '@/stores/news'

const newsStore = useNewsStore()
const q = ref('')

onMounted(async () => {
  newsStore.setLoading(true)
  newsStore.setError(null)
  try {
    const db = await getDB()
    newsStore.setNews(db.news)
  } catch (e) {
    newsStore.setError((e as Error)?.message ?? 'Load failed')
  } finally {
    newsStore.setLoading(false)
  }
})

function handleToolbarChange() {
  newsStore.setLoading(true)
  setTimeout(() => {
    newsStore.setLoading(false)
  }, 500)
}
</script>

<template>
  <section>
    <h1 class="text-xl font-semibold mb-4 mx-auto max-w-[1250px]">Social Anti‑Fake News</h1>

    <!-- Sreachbar -->
    <Sreachbar v-model="q" @select="item => $router.push({ name: 'news-detail', params: { id: item.id } })" />
      
    <!-- Toolbar -->
  <Toolbar
    v-model:perPage="newsStore.perPage"
    v-model:filter="newsStore.filter"
    @update:perPage="handleToolbarChange"
    @update:filter="handleToolbarChange"
  />

    <!-- States -->
    <div v-if="newsStore.loading" class="text-slate-500">Loading…</div>
    <div v-else-if="newsStore.errorMsg" class="text-red-600">Error: {{ newsStore.errorMsg }}</div>
    <div v-else-if="newsStore.filteredNews.length === 0" class="text-slate-500">No news found.</div>

    <!-- ใช้คอมโพเนนต์รายการ (ตัด all-comments ออก) -->
    <div v-else class="mx-auto w-11/12 md:w-3/4 lg:w-2/3">
      <NewsList :news="newsStore.paginatedNews" />
    </div>

    <!-- Pagination -->
    <Pagination
      v-if="!newsStore.loading && !newsStore.errorMsg && newsStore.filteredNews.length"
      v-model:page="newsStore.page"
      :totalPages="newsStore.totalPages"
    />
  </section>
</template>
