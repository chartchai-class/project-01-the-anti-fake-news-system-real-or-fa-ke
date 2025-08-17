<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
import { getInteractions } from '@/service/localStorage'

type Status = 'fake' | 'not-fake'
interface NewsItem {
  id: string | number
  topic: string
  shortDetail: string
  status: Status
  reporterName?: string
  reporter?: string
  imageUrl?: string
  votes?: { fake: number; notFake: number }
}

interface Props {
  news: NewsItem[]
  filter?: 'all' | 'fake' | 'not-fake'
}

const props = withDefaults(defineProps<Props>(), {
  news: () => [],
  filter: 'all'
})

// --- เพิ่ม logic merge โหวต user ---
const mergedNews = computed(() => {
  // Clone news array
  const newsArr = props.news.map(n => ({ ...n, votes: { ...n.votes } }))
  // Get all user votes from localStorage
  const userVotes = getInteractions('news').filter(i => i.type === 'vote' && i.payload)
  // Map: newsId -> vote type
  const voteMap = new Map<number, 'fake' | 'not_fake'>()
  userVotes.forEach(i => {
    const payload = i.payload as { newsId: number; vote: 'fake' | 'not_fake' }
    if (payload.newsId && payload.vote) {
      voteMap.set(Number(payload.newsId), payload.vote)
    }
  })
  // Merge user vote into newsArr
  newsArr.forEach(n => {
    const id = Number(n.id)
    const userVote = voteMap.get(id)
    if (userVote) {
      if (!n.votes) n.votes = { fake: 0, notFake: 0 }
      if (userVote === 'fake') n.votes.fake = (n.votes.fake ?? 0) + 1
      if (userVote === 'not_fake') n.votes.notFake = (n.votes.notFake ?? 0) + 1
    }
  })
  return newsArr
})

function statusClasses(s: Status) {
  return (s as string) === 'fake'
    ? 'bg-red-50 text-red-700 ring-1 ring-red-200 px-1 rounded dark:bg-red-900/30 dark:text-red-300 dark:ring-red-800'
    : 'bg-green-50 text-green-700 ring-1 ring-green-200 px-1 rounded dark:bg-green-900/30 dark:text-green-300 dark:ring-green-800'
}

function statusLabel(s: unknown): string {
  const normalized = String(s ?? '').replace(/[_-]/g, '').toLowerCase()
  if (normalized === 'fake') return 'Fake'
  if (normalized === 'notfake') return 'Not Fake'
  return String(s ?? '')
}
</script>

<template>
  <div>
    <div v-if="props.filter !== 'all'" class="mb-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
      <p class="text-sm text-slate-600 dark:text-slate-400">
        🔍 Currently showing: <strong class="capitalize">{{ props.filter.replace('-', ' ') }}</strong> news only
      </p>
    </div>
    <ul class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
    <li v-for="item in mergedNews" :key="item.id" class="group">
      <RouterLink
        :to="{ name: 'news-detail', params: { id: item.id } }"
        class="block rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-400
               hover:shadow hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
      >
        <img
          v-if="item.imageUrl"
          :src="item.imageUrl"
          :alt="`Image for news: ${item.topic}`"
          class="mb-2 h-40 w-full rounded-lg object-cover"
          loading="lazy"
          decoding="async"
          fetchpriority="low"
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
        />
        <strong class="block text-base leading-snug line-clamp-2">{{ item.topic }}</strong>
        <span class="mt-1 block text-sm text-slate-600 line-clamp-3 dark:text-slate-300">{{ item.shortDetail }}</span>

        <div class="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Reporter: {{ item.reporterName || item.reporter || '—' }}
          </div>
          <div class="mt-1 text-sm">
            Status: <em :class="statusClasses(item.status)">{{ statusLabel(item.status) }}</em>
          </div>
          <div class="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Votes: Fake {{ item.votes?.fake ?? '-' }}, Not Fake {{ item.votes?.notFake ?? '-' }}
            <div class="w-full h-2 mt-1 bg-slate-200 rounded overflow-hidden flex dark:bg-slate-700">
              <div
                v-if="item.votes && ((item.votes?.fake ?? 0) + (item.votes?.notFake ?? 0)) > 0"
                class="h-full bg-red-400 dark:bg-red-600 transition-all duration-300 group-hover:scale-y-125"
                :style="{ width: (((item.votes?.fake ?? 0) / ((item.votes?.notFake ?? 0) + (item.votes?.notFake ?? 0))) * 100) + '%' }"
              ></div>
              <div
                v-if="item.votes && ((item.votes?.notFake ?? 0) + (item.votes?.notFake ?? 0)) > 0"
                class="h-full bg-green-400 dark:bg-green-600 transition-all duration-300 group-hover:scale-y-125"
                :style="{ width: (((item.votes?.notFake ?? 0) / ((item.votes?.fake ?? 0) + (item.votes?.notFake ?? 0))) * 100) + '%' }"
              ></div>
              <div v-else class="h-full bg-slate-300 dark:bg-slate-800 w-full transition-all duration-300 group-hover:scale-y-125"></div>
            </div>
          </div>
      </RouterLink>
    </li>
    </ul>
  </div>
</template>
