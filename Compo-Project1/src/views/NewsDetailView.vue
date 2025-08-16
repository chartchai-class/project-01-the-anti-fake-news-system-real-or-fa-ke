<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getDB } from '@/service/api'
import { useRoute, RouterLink } from 'vue-router'

const route = useRoute()
const news = ref<any | null>(null)

onMounted(async () => {
  const db = await getDB()

  const id = Number(route.params.id)
  news.value = db.news.find((n: any) => n.id === id)
})
</script>

<template>
  <section
    v-if="news"
    class="mx-auto w-11/12 md:w-3/4 lg:w-2/3 bg-white border border-slate-200 rounded-xl p-4 
           dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100"
  >
    <!-- 🔙 Back to Home -->
    <div class="mb-4">
      <RouterLink
        :to="{ name: 'news-list' }"
        class="inline-block border border-green-500 text-green-600 dark:text-green-400 
               rounded-md px-3 py-1.5 text-sm font-medium hover:bg-green-100 
               dark:hover:bg-slate-800 transition"
      >
        ← Back to Home
      </RouterLink>
    </div>

    <h2 class="text-xl font-semibold mb-2">{{ news.topic }}</h2>

    <p class="text-slate-500 mb-3 dark:text-slate-400">
      <span>Status: <strong>{{ news.status }}</strong></span> •
      <span>Reporter: {{ news.reporterName }}</span> •
      <span>Date: {{ news.reportedAt }}</span>
    </p>

    <img
      v-if="news.imageUrl"
      :src="news.imageUrl"
      alt="News Image"
      class="max-w-full rounded-xl mb-4"
      loading="lazy"
      decoding="async"
      fetchpriority="low"
      sizes="100vw"
    />

    <p class="mb-4">{{ news.fullDetail }}</p>

    <p v-if="news.imageUrl" class="mb-4">
      <strong>Image link:</strong>
      <a :href="news.imageUrl" target="_blank" rel="noopener" class="text-blue-500 underline">
        Open
      </a>
    </p>

    <div class="mt-4">
      <RouterLink
        :to="{ name: 'news-discussion', params: { id: news.id } }"
        class="inline-block border border-green-500 text-green-600 dark:text-green-400 
               rounded-md px-3 py-1.5 text-sm font-medium hover:bg-green-100 
               dark:hover:bg-slate-800 transition"
      >
        View comments & votes
      </RouterLink>
    </div>
  </section>
</template>
