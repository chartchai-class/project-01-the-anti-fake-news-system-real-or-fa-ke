<script setup lang="ts">
import { defineProps, computed } from 'vue';
import Comment from '@/components/Comment.vue';

// Accept all comments as a new prop
const props = defineProps<{ news: any[]; allComments: any[] }>();

// Use a computed property to make it cleaner
const getCommentsForNews = (newsId: number) => {
  return props.allComments.filter(comment => comment.newsId === newsId);
};
</script>

<template>
  <section>
    <h2>News</h2>
    <ul>
      <li v-for="item in news" :key="item.id">
        <br />
        <strong>{{ item.topic }}</strong><br />
        <span>{{ item.shortDetail }}</span><br />
        <em>Status: {{ item.status }}</em><br />
        <span>Reporter: {{ item.reporterName || item.reporter }}</span><br />
        <img v-if="item.imageUrl" :src="item.imageUrl" alt="news image" style="max-width: 200px" />
        <div v-if="item.votes">
          Votes: Fake {{ item.votes.fake }}, Not Fake {{ item.votes.notFake }}
        </div>
        <div v-else>Votes: -</div>

        <template v-if="getCommentsForNews(item.id).length > 0">
          <Comment :comments="getCommentsForNews(item.id)" />
        </template>
        <template v-else>
          <div>No comments yet.</div>
        </template>
      </li>
    </ul>
  </section>
</template>