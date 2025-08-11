<script setup lang="ts">
import { defineProps } from 'vue'
defineProps<{ comments: any[] }>()
</script>

<template>
  <section v-if="comments.length > 0">
    <h2>Comments</h2>
    <ul>
      <li v-for="comment in comments" :key="comment.id ?? (comment.createdAt + (comment.username || comment.user))">
        <span>User: {{ comment.username || comment.user }}</span><br />
        <span>{{ comment.comment }}</span><br />
        <div>Created At: {{ comment.createdAt }}</div>
      </li>
    </ul>
  </section>
</template>