<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { getDB } from '@/service/api'
import { useRouter, useRoute, RouterLink } from 'vue-router'
import BackToHome from '@/components/BackToHome.vue'
import type { NewsItem } from '@/types'
import { getInteractions } from '@/service/localStorage'


const route = useRoute()
const router = useRouter()
const news = ref<NewsItem | null>(null)

// Get user's vote for this news item
const userVote = computed(() => {
  if (!news.value) return null
  
  const userVotes = getInteractions('news').filter(i => i.type === 'vote' && i.payload)
  const userVote = userVotes.find(i => {
    const payload = i.payload as { newsId: number; vote: 'fake' | 'not_fake' }
    return payload.newsId === Number(news.value?.id)
  })
  
  return userVote ? (userVote.payload as { newsId: number; vote: 'fake' | 'not_fake' }).vote : null
})

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
      
      <!-- User's vote result -->
      <div v-if="userVote" class="mb-3 p-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p class="text-sm text-blue-700 dark:text-blue-300">
          🗳️ <strong>Your Vote:</strong> 
          <span class="font-semibold">
            {{ userVote === 'fake' ? '❌ Fake News' : '✅ Not Fake News' }}
          </span>
        </p>
      </div>
      
      <!-- Encourage voting if user hasn't voted -->
      <div v-else class="mb-3 p-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
        <p class="text-sm text-amber-700 dark:text-amber-300">
          💭 <strong>Haven't voted yet?</strong> 
          <span>Share your opinion on this news!</span>
        </p>
      </div>
      
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
      
      <!-- Vote percentage breakdown -->
      <div v-if="(news.votes.fake + news.votes.notFake) > 0" class="mt-2 text-xs text-slate-600 dark:text-slate-400">
        <span class="text-red-600 dark:text-red-400">
          Fake: {{ Math.round((news.votes.fake / (news.votes.fake + news.votes.notFake)) * 100) }}%
        </span>
        <span class="mx-2">•</span>
        <span class="text-green-600 dark:text-green-400">
          Not Fake: {{ Math.round((news.votes.notFake / (news.votes.fake + news.votes.notFake)) * 100) }}%
        </span>
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
        {{ userVote ? 'View comments & discussion' : 'Vote & comment' }}
      </RouterLink>
      
      <!-- Additional info about user's participation -->
      <div v-if="userVote" class="mt-2 text-xs text-slate-500 dark:text-slate-400">
        💡 You've already participated in this discussion
      </div>
      <div v-else class="mt-2 text-xs text-slate-500 dark:text-slate-400">
        💡 Click above to join the discussion and vote
      </div>
    </div>
  </section>
</template>
