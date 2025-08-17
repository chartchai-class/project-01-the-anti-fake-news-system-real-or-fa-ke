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
    <!-- Flash popup message -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 scale-90 translate-y-2"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-90 translate-y-2"
    >
              <div
          v-if="flashMessage"
          class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-sm bg-white border border-green-200 rounded-lg shadow-lg dark:bg-slate-800 dark:border-green-700"
        >
        <div class="flex items-center gap-3 p-4">
          <!-- Success icon -->
          <div class="flex-shrink-0">
            <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </div>
          <!-- Message text -->
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
              {{ flashMessage }}
            </p>
          </div>
          <!-- Close button -->
          <button
            @click="flashMessage = ''"
            class="flex-shrink-0 inline-flex rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 dark:text-gray-500 dark:hover:text-gray-400"
          >
            <span class="sr-only">Close</span>
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </Transition>
    
    <VotesPanel :votes="votes" :disabled="hasVoted" @vote-fake="handleVoteFake" @vote-not-fake="handleVoteNotFake" />
    <AddCommentForm :voted="hasVoted" @submit="handleAddComment" />
    <CommentsList :comments="comments" />
  </section>
</template>

