<script setup lang="ts">
import { RouterLink } from 'vue-router'

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

const props = withDefaults(defineProps<{ news: NewsItem[] }>(), {
  news: () => []
})

function statusClasses(s: Status) {
  return s === 'fake'
    ? 'bg-red-50 text-red-700 ring-1 ring-red-200 px-1 rounded'
    : 'bg-green-50 text-green-700 ring-1 ring-green-200 px-1 rounded'
}
</script>

<template>
  <ul class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
    <li v-for="item in props.news" :key="item.id">
      <RouterLink
        :to="{ name: 'news-detail', params: { id: item.id } }"
        class="block rounded-xl border border-slate-200 bg-white p-3 shadow-sm hover:shadow transition
               focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <img v-if="item.imageUrl" :src="item.imageUrl" alt="" class="mb-2 h-40 w-full rounded-lg object-cover" loading="lazy" />
        <strong class="block text-base leading-snug line-clamp-2">{{ item.topic }}</strong>
        <span class="mt-1 block text-sm text-slate-600 line-clamp-3">{{ item.shortDetail }}</span>

        <div class="mt-2 text-sm text-slate-600">
          Reporter: {{ item.reporterName || item.reporter || '—' }}
        </div>
        <div class="mt-1 text-sm">
          Status: <em :class="statusClasses(item.status)">{{ item.status }}</em>
        </div>
        <div class="mt-2 text-xs text-slate-500">
          Votes: Fake {{ item.votes?.fake ?? '-' }}, Not Fake {{ item.votes?.notFake ?? '-' }}
        </div>

        <span class="mt-2 inline-block text-sm text-green-600">View details</span>
      </RouterLink>
    </li>
  </ul>
</template>
