<script setup lang="ts">
defineProps<{
  comments: Array<{
    id: number | string
    username: string
    comment?: string
    text?: string
    imageUrl?: string
    createdAt: string
  }>
}>()
</script>

<template>
  <div>
    <h3 style="margin-top: 16px">Comments</h3>
    <ul class="clist">
      <li v-for="c in comments" :key="c.id">
        <strong>{{ c.username }}</strong>
        <p>{{ c.comment || c.text }}</p>
        <img v-if="c.imageUrl" :src="c.imageUrl" alt="News Image" class="news-image" />
        <small>{{ c.createdAt }}</small>
      </li>
    </ul>
  </div>
  
</template>

<style scoped>
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
.news-image {
  max-width: 100%;
  border-radius: 12px;
  margin: 8px 0;
}
</style>


