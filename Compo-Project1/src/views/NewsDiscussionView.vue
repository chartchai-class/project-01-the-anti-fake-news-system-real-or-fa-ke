<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getDB } from '@/service/api'
import { saveInteraction, getInteractions } from '@/service/localStorage'
import VotesPanel from '@/components/VotesPanel.vue'
import AddCommentForm from '@/components/AddCommentForm.vue'
import CommentsList from '@/components/CommentsList.vue'

const route = useRoute()
const newsId = Number(route.params.id)

const votes = ref({ fake: 0, notFake: 0 })
const hasVoted = ref(false)
const comments = ref<any[]>([])

// โหลด mock data จาก /api/db.json
onMounted(async () => {
  const db = await getDB()
  const id = Number(route.params.id)
  // หาข่าวที่ตรงกับ newsId
  const currentNews = db.news.find((n: any) => n.id === id)
  if (currentNews) {
    votes.value = currentNews.votes || { fake: 0, notFake: 0 }
  }
  // Load user votes from localStorage
  const userVotes = getInteractions('news')
    .filter(i => i.type === 'vote' && i.payload && (i.payload as any).newsId === newsId)
    .map(i => i.payload)
  // Apply user votes
  userVotes.forEach(v => {
    const votePayload = v as { vote?: string }
    if (votePayload.vote === 'fake') votes.value.fake++
    if (votePayload.vote === 'not_fake') votes.value.notFake++
    hasVoted.value = true
  })
  // Load comments from mock data
  const filteredComments = db.comments.filter((c: any) => c.newsId === newsId)
  // Load user comments from localStorage
  const userComments = getInteractions('news')
    .filter(i => i.type === 'comment' && i.payload && (i.payload as any).newsId === newsId)
    .map(i => i.payload)
  // Merge and sort
  comments.value = [...userComments, ...filteredComments].sort((a: any, b: any) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
})

function handleVoteFake() {
  if (hasVoted.value) return
  votes.value.fake++
  hasVoted.value = true
  saveInteraction('news', 'vote', { newsId, vote: 'fake' })
}
function handleVoteNotFake() {
  if (hasVoted.value) return
  votes.value.notFake++
  hasVoted.value = true
  saveInteraction('news', 'vote', { newsId, vote: 'not_fake' })
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
}
</script>

<template>
  <section class="mx-auto w-11/12 md:w-3/4 lg:w-2/3 bg-white border border-slate-200 rounded-xl p-4 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100">
    <VotesPanel :votes="votes" :disabled="hasVoted" @vote-fake="handleVoteFake" @vote-not-fake="handleVoteNotFake" />

    <AddCommentForm :voted="hasVoted" @submit="handleAddComment" />

    <CommentsList :comments="comments" />
  </section>
</template>
