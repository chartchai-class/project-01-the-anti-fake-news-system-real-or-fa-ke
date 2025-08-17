<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getDB } from '@/service/api'
import { saveInteraction, getInteractions } from '@/service/localStorage'
import type { NewsItem, CommentItem } from '@/types'
import VotesPanel from '@/components/VotesPanel.vue'
import AddCommentForm from '@/components/AddCommentForm.vue'
import CommentsList from '@/components/CommentsList.vue'
import BackToHome from '@/components/BackToHome.vue'

const route = useRoute()
const router = useRouter()
const newsId = Number(route.params.id)

const currentNews = ref<NewsItem | null>(null)
const votes = ref<{ fake: number; notFake: number }>({ fake: 0, notFake: 0 })
const hasVoted = ref(false)
const comments = ref<CommentItem[]>([])
const flashMessage = ref('')

let flashTimeout: ReturnType<typeof setTimeout> | null = null

function showFlash(msg: string) {
  flashMessage.value = msg
  if (flashTimeout) clearTimeout(flashTimeout)
  flashTimeout = setTimeout(() => {
    flashMessage.value = ''
  }, 2000)
}

// โหลด mock data จาก /api/db.json
onMounted(async () => {
  const db = await getDB()
  const id = Number(route.params.id)
  // หาข่าวที่ตรงกับ newsId
  const foundNews = db.news.find((n: NewsItem) => n.id === id)
  if (!foundNews) {
    router.replace({ name: 'NotFound', params: { resource: 'news' } })
    return
  }
  currentNews.value = foundNews
  // --- แก้ไขจุดนี้ ---
  // 1. โหลดคะแนนจาก mock data
  let baseVotes = { fake: 0, notFake: 0 }
  if (foundNews && foundNews.votes) {
    baseVotes = { 
      fake: foundNews.votes.fake ?? 0, 
      notFake: foundNews.votes.notFake ?? 0 
    }
  }
  // 2. ตรวจสอบว่า user เคยโหวตหรือยัง
  const userVote = getInteractions('news')
    .find(i => i.type === 'vote' && i.payload && (i.payload as { newsId: number; vote: 'fake' | 'not_fake' }).newsId === newsId)
  if (userVote && userVote.payload) {
    hasVoted.value = true
    // 3. เพิ่มคะแนนฝั่งที่ user โหวตแค่ 1 ครั้ง
    const votePayload = userVote.payload as { vote?: string }
    votes.value = { ...baseVotes }
    if (votePayload.vote === 'fake') votes.value.fake++
    else if (votePayload.vote === 'not_fake') votes.value.notFake++
  } else {
    votes.value = { ...baseVotes }
    hasVoted.value = false
  }
  // โหลดคอมเมนต์
  const filteredComments = db.comments.filter((c: CommentItem) => c.newsId === newsId)
  const userComments = getInteractions('news')
    .filter(i => i.type === 'comment' && i.payload && (i.payload as CommentItem).newsId === newsId)
    .map(i => i.payload as CommentItem)
  comments.value = [...userComments, ...filteredComments].sort((a: CommentItem, b: CommentItem) =>
    new Date(b.createdAt || b.at || '').getTime() - new Date(a.createdAt || a.at || '').getTime()
  )
})

function handleVoteFake() {
  if (hasVoted.value) return
  votes.value.fake++
  hasVoted.value = true
  saveInteraction('news', 'vote', { newsId, vote: 'fake' })
  showFlash('Vote submitted!')
}
function handleVoteNotFake() {
  if (hasVoted.value) return
  votes.value.notFake++
  hasVoted.value = true
  saveInteraction('news', 'vote', { newsId, vote: 'not_fake' })
  showFlash('Vote submitted!')
}

function handleAddComment(payload: { username: string; text: string; link: string; vote: 'fake' | 'not_fake' | null }) {
  if (!payload.text && !payload.link) return

  if (!hasVoted.value) {
    if (payload.vote === 'fake') votes.value.fake++
    if (payload.vote === 'not_fake') votes.value.notFake++
    hasVoted.value = true
  }

  const comment = {
    id: Date.now(),
    newsId,
    username: payload.username,
    vote: payload.vote,
    text: (payload.text || '').trim(),
    imageUrl: (payload.link || '').trim(),
    createdAt: new Date().toLocaleString(),
  }
  comments.value.unshift(comment)
  saveInteraction('news', 'comment', comment)
  showFlash('Comment posted!')
}
</script>

<template>
  <section class="mx-auto w-11/12 md:w-3/4 lg:w-2/3 bg-white border border-slate-200 rounded-xl p-4 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100">
    <BackToHome />
    
    <!-- News topic header -->
    <div class="mb-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
      <h2 class="text-lg font-semibold mb-1">Discussion</h2>
      <p class="text-sm text-slate-600 dark:text-slate-400">
        Topic: <strong>{{ currentNews?.topic || 'Loading...' }}</strong>
      </p>
    </div>
    <!-- Flash message (Tailwind only, no CSS) -->
    <div
      v-if="flashMessage"
      class="mb-3 px-4 py-2 rounded bg-green-100 text-green-800 border border-green-300 text-center font-semibold shadow transition-all duration-300 dark:bg-green-900 dark:text-green-100 dark:border-green-700"
    >
      {{ flashMessage }}
    </div>

    <!-- Keyboard shortcuts info -->
    <div class="mb-4 p-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
      <p class="text-xs text-blue-700 dark:text-blue-300">
        💡 <kbd class="px-1 py-0.5 bg-blue-200 dark:bg-blue-800 rounded text-xs">Tab</kbd> to navigate • <kbd class="px-1 py-0.5 bg-blue-200 dark:bg-blue-800 rounded text-xs">Enter</kbd> to submit • <kbd class="px-1 py-0.5 bg-blue-200 dark:bg-blue-800 rounded text-xs">Esc</kbd> to close
      </p>
    </div>
    
    <VotesPanel :votes="votes" :disabled="hasVoted" @vote-fake="handleVoteFake" @vote-not-fake="handleVoteNotFake" />
    <AddCommentForm :voted="hasVoted" @submit="handleAddComment" />
    <CommentsList :comments="comments" />
  </section>
</template>
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
