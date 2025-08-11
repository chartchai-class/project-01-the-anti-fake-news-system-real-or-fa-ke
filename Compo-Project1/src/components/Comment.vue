<!-- Comment.vue -->
<script setup lang="ts">
import { defineProps } from 'vue'
defineProps<{ comments: any[] }>()
</script>

<template>
  <section>
    <h2>Comments</h2>
    <ul>
      <li v-for="comment in comments" :key="comment.id ?? (comment.createdAt + (comment.username || comment.user))">
        <strong>News ID: {{ comment.newsId }}</strong><br />
        <span>User: {{ comment.username || comment.user }}</span><br />
        <span>{{ comment.comment }}</span><br />
        <img v-if="comment.imageUrl" :src="comment.imageUrl" alt="comment image" style="max-width: 200px;" />
        <div>Created At: {{ comment.createdAt }}</div>
      </li>
    </ul>
  </section>
</template>
