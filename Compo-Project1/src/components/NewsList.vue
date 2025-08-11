<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{ news: any[] }>()
</script>

<template>
  <section>
    <h2>News</h2>
    <ul>
      <li v-for="item in news" :key="item.id">
        <strong>{{ item.topic }}</strong><br />
        <span>{{ item.shortDetail }}</span><br />
        <em>Status: {{ item.status }}</em><br />
        <span>Reporter: {{ item.reporterName || item.reporter }}</span><br />
        <img v-if="item.imageUrl" :src="item.imageUrl" alt="news image" style="max-width: 200px;" />
        <div v-if="item.votes">Votes: Fake {{ item.votes.fake }}, Not Fake {{ item.votes.notFake }}</div>
        <div v-else>Votes: -</div>
      </li>
    </ul>
  </section>
</template>
