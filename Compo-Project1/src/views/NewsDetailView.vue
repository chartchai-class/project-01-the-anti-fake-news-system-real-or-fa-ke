<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getDB } from '@/service/api'
import { useRouter, useRoute, RouterLink } from 'vue-router'
import BackToHome from '@/components/BackToHome.vue'
import type { NewsItem } from '@/types'


const route = useRoute()
const router = useRouter()
const news = ref<NewsItem | null>(null)

onMounted(async () => {
  const db = await getDB()
  const id = Number(route.params.id)
  const currentNews = db.news.find((n: NewsItem) => n.id === id)
  if (!currentNews) {
    router.replace({ name: 'NotFound', params: { resource: 'news' } })
    return
  }
  news.value = currentNews
})
</script>

<template>
  <section
    v-if="news"
    class="mx-auto w-11/12 md:w-3/4 lg:w-2/3 bg-white border border-slate-200 rounded-xl p-4
           dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100"
  >
    <BackToHome />

    <h2 class="text-xl font-semibold mb-2">{{ news.topic }}</h2>

    <div class="mb-3 p-3 rounded-lg border" :class="news.status === 'fake' ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800' : 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'">
      <p class="text-sm">
        <span class="font-semibold">Status:</span> 
        <span :class="news.status === 'fake' ? 'text-red-700 dark:text-red-300' : 'text-green-700 dark:text-green-300'">
          {{ news.status === 'fake' ? '❌ Fake News' : '✅ Verified News' }}
        </span>
      </p>
      <p class="text-sm text-slate-600 dark:text-slate-400 mt-1">
        <span>Reporter: {{ news.reporterName }}</span> •
        <span>Date: {{ news.reportedAt || news.datetime || 'N/A' }}</span>
      </p>
    </div>

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

    <p class="mb-4">{{ news.fullDetail || news.shortDetail }}</p>
    
    <!-- Votes display -->
    <div v-if="news.votes" class="mb-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
      <h3 class="text-sm font-semibold mb-2">Current Votes</h3>
      <div class="flex items-center gap-4 text-sm">
        <span class="text-red-600 dark:text-red-400">
          ❌ Fake: {{ news.votes.fake }}
        </span>
        <span class="text-green-600 dark:text-green-400">
          ✅ Not Fake: {{ news.votes.notFake }}
        </span>
        <span class="text-slate-500 dark:text-slate-400">
          Total: {{ news.votes.fake + news.votes.notFake }}
        </span>
      </div>
      <div class="w-full h-2 mt-2 bg-slate-200 rounded overflow-hidden dark:bg-slate-700">
        <div
          v-if="(news.votes.fake + news.votes.notFake) > 0"
          class="h-full bg-red-400 dark:bg-red-600 transition-all duration-300"
          :style="{ width: ((news.votes.fake / (news.votes.fake + news.votes.notFake)) * 100) + '%' }"
        ></div>
        <div
          v-if="(news.votes.fake + news.votes.notFake) > 0"
          class="h-full bg-green-400 dark:bg-green-600 transition-all duration-300"
          :style="{ width: ((news.votes.notFake / (news.votes.fake + news.votes.notFake)) * 100) + '%' }"
        ></div>
      </div>
    </div>

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
