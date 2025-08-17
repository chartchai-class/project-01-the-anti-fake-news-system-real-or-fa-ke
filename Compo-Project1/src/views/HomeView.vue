<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getDB } from '@/service/api'
import NewsList from '@/components/NewsList.vue'
import Toolbar from '@/components/Toolbar.vue'
import Pagination from '@/components/Pagination.vue'
import Sreachbar from '@/components/Sreachbar.vue'
import LoadingSkeleton from '@/components/LoadingSkeleton.vue'
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
    <div class="mx-auto max-w-[1250px] mb-4">
      <h1 class="text-xl font-semibold mb-2">Social Anti‑Fake News</h1>
      <p v-if="!newsStore.loading && !newsStore.errorMsg" class="text-sm text-slate-600 dark:text-slate-400">
        Showing {{ newsStore.filteredNews.length }} news items
        <span v-if="newsStore.filteredNews.length > 0" class="ml-2">
          ({{ (newsStore.page - 1) * newsStore.perPage + 1 }}-{{ Math.min(newsStore.page * newsStore.perPage, newsStore.filteredNews.length) }} of {{ newsStore.filteredNews.length }})
        </span>
        <span v-if="newsStore.filter !== 'all'" class="ml-2 text-green-600 dark:text-green-400">
          • Filtered by: {{ newsStore.filter.replace('-', ' ') }}
        </span>
      </p>
    </div>

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
<LoadingSkeleton v-if="newsStore.loading" :count="newsStore.perPage" />
<div v-else-if="newsStore.errorMsg" class="text-red-600">
  Error: {{ newsStore.errorMsg }}
</div>
<div v-else-if="newsStore.filteredNews.length === 0" class="text-slate-500">
  No news found.
</div>


    <!-- ใช้คอมโพเนนต์รายการ (ตัด all-comments ออก) -->
    <div v-else class="mx-auto w-11/12 md:w-3/4 lg:w-2/3">
      <NewsList :news="newsStore.paginatedNews" :filter="newsStore.filter" />
    </div>

    <!-- Pagination -->
    <Pagination
      v-if="!newsStore.loading && !newsStore.errorMsg && newsStore.filteredNews.length"
      v-model:page="newsStore.page"
      :totalPages="newsStore.totalPages"
      :totalItems="newsStore.filteredNews.length"
    />
  </section>
</template>
