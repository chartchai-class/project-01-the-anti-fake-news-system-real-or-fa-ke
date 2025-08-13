<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import VotesPanel from '@/components/VotesPanel.vue'
import AddCommentForm from '@/components/AddCommentForm.vue'
import CommentsList from '@/components/CommentsList.vue'

const route = useRoute()
const newsId = Number(route.params.id)

const votes = ref({ fake: 0, notFake: 0 })
const comments = ref<any[]>([])

// โหลด mock data จาก /api/db.json
onMounted(async () => {
  const res = await fetch('/api/db.json')
  const db = await res.json()

  const id = Number(route.params.id)

  // หาข่าวที่ตรงกับ newsId
  const currentNews = db.news.find((n: any) => n.id === id)

  if (currentNews) {
    votes.value = currentNews.votes || { fake: 0, notFake: 0 }
  }

  const filteredComments = db.comments.filter((c: any) => c.newsId === newsId)
  comments.value = filteredComments.sort((a: any, b: any) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
})

function handleVoteFake() {
  votes.value.fake++
}
function handleVoteNotFake() {
  votes.value.notFake++
}

function handleAddComment(payload: { username: string; text: string; link: string; vote: 'fake' | 'not_fake' | null }) {
  if (!payload.text && !payload.link) return

  if (payload.vote === 'fake') votes.value.fake++
  if (payload.vote === 'not_fake') votes.value.notFake++

  comments.value.unshift({
    id: Date.now(),
    newsId,
    username: payload.username,
    vote: payload.vote,
    text: payload.text ? payload.text : `(image) ${payload.link}`,
    createdAt: new Date().toLocaleString(),
  })
}
</script>

<template>
  <section class="discussion">
    <VotesPanel :votes="votes" @vote-fake="handleVoteFake" @vote-not-fake="handleVoteNotFake" />

    <AddCommentForm @submit="handleAddComment" />

    <CommentsList :comments="comments" />
  </section>
</template>

<style scoped>
.discussion {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
}
.vote-panel {
  display: flex;
  gap: 8px;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.row {
  display: grid;
  gap: 8px;
}
.row:first-child {
  grid-template-columns: 1fr; /* แถวบนมีช่องเดียวเต็มแถว */
}
.row:last-child {
  grid-template-columns: 1fr 1fr auto; /* คอมเมนต์ + URL + ปุ่ม */
}
.clist {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 10px;
  margin-top: 8px;
}
.clist li {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 10px;
  background: #fafafa;
}
.pagination {
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
  margin-top: 14px;
}
input,
button {
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}
button {
  cursor: pointer;
}
</style>
