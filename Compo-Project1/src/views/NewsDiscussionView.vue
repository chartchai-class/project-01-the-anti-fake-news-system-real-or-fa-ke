<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const newsId = Number(route.params.id)

const votes = ref({ fake: 0, notFake: 0 })
const comments = ref<any[]>([])
const link = ref('')
const text = ref('')

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

// โหวตแบบ frontend-only
function voteFake() {
  votes.value.fake++
}
function voteNotFake() {
  votes.value.notFake++
}

// เพิ่มคอมเมนต์ใหม่
const username = ref('')
const selectedVote = ref<'fake' | 'not_fake' | null>(null)

function addComment() {
  if (!text.value && !link.value) return

  // ถ้ามี vote ก็เพิ่ม count
  if (selectedVote.value === 'fake') votes.value.fake++
  if (selectedVote.value === 'not_fake') votes.value.notFake++

  comments.value.unshift({
    id: Date.now(),
    newsId,
    username: username.value,
    vote: selectedVote.value,
    text: text.value ? text.value : `(image) ${link.value}`,
    createdAt: new Date().toLocaleString(),
  })

  username.value = ''
  text.value = ''
  link.value = ''
  selectedVote.value = null
  link.value = ''
}
</script>

<template>
  <section class="discussion">
    <h3>Votes</h3>
    <div class="vote-panel">
      <button @click="voteFake">Fake ({{ votes.fake }})</button>
      <button @click="voteNotFake">Not Fake ({{ votes.notFake }})</button>
    </div>

    <h3 style="margin-top: 16px">Add your comment / image URL</h3>
<div class="form">
  <div class="row">
    <input v-model="username" type="text" placeholder="Your UserName" />
  </div>
  <div class="row">
    <input v-model="text" type="text" placeholder="Your comment..." />
    <input v-model="link" type="url" placeholder="Image URL (optional)" />
    <button @click="addComment">Post</button>
  </div>
</div>

    <h3 style="margin-top: 16px">Comments</h3>
    <ul class="clist">
      <li v-for="c in comments" :key="c.id">
        <strong>{{ c.username }}</strong>
        <p>{{ c.comment }}</p>
        <img
      v-if="c.imageUrl"
      :src="c.imageUrl"
      alt="News Image"
      class="news-image"
    />
        <small>{{ c.createdAt }}</small>
      </li>
    </ul>
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
