<script setup lang="ts">
import { ref } from 'vue'
const votes = ref({ fake: 0, notFake: 0 })
const comments = ref([{ id: 1, text: 'Looks suspicious to me.', at: new Date().toLocaleString() }])
const link = ref('')
const text = ref('')

function voteFake() {
  votes.value.fake++
}
function voteNotFake() {
  votes.value.notFake++
}
function addComment() {
  if (!text.value && !link.value) return
  comments.value.unshift({
    id: Date.now(),
    text: text.value ? text.value : `(image) ${link.value}`,
    at: new Date().toLocaleString(),
  })
  text.value = ''
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
      <input v-model="text" type="text" placeholder="Your comment..." />
      <input v-model="link" type="url" placeholder="Image URL (optional)" />
      <button @click="addComment">Post</button>
    </div>

    <h3 style="margin-top: 16px">Comments</h3>
    <ul class="clist">
      <li v-for="c in comments" :key="c.id">
        <p>{{ c.text }}</p>
        <small>{{ c.at }}</small>
      </li>
    </ul>

    <nav class="pagination">
      <button disabled>« Prev</button>
      <span>Page 1 / 1</span>
      <button disabled>Next »</button>
    </nav>
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
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 8px;
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
