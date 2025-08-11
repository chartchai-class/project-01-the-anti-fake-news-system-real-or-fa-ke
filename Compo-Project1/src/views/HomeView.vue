<script setup lang="ts">
import { ref, onMounted } from 'vue'
import NewsList from '../components/NewsList.vue'
import Comment from '@/components/Comment.vue';

const db = ref<{ news: any[]; comments: any[] }>({ news: [], comments: [] })

onMounted(async () => {
  const res = await fetch('/api/db.json')
  db.value = await res.json()
})
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
    <NewsList :news="db.news" />
    <Comment :comments="db.comments" />
  </main>
</template>
