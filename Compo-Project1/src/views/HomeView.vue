<script setup lang="ts">
import { ref, onMounted } from 'vue';
import NewsList from '../components/NewsList.vue';

const db = ref<{ news: any[]; comments: any[] }>({ news: [], comments: [] });

onMounted(async () => {
  const res = await fetch('/api/db.json');
  db.value = await res.json();
});
</script>

<template>
  <main>
    <NewsList :news="db.news" :allComments="db.comments" />
    </main>
</template>
import { ref } from 'vue'

// เดโม่ลิสต์ (เดี๋ยวค่อยเชื่อม mock data + pagination + filter)
const items = ref([
  { id: 101, title: 'Sample News A', status: 'fake', reporter: 'Alice' },
  { id: 102, title: 'Sample News B', status: 'not-fake', reporter: 'Bob' },
  { id: 103, title: 'Sample News C', status: 'fake', reporter: 'Carol' },
])
</script>

<template>
  <section class="home">
    <h1>Social Anti‑Fake News</h1>

    <div class="toolbar">
      <label>
        Show per page
        <select>
          <option>5</option>
          <option>10</option>
          <option>20</option>
        </select>
      </label>

      <div class="filters">
        <button>All</button>
        <button>Fake</button>
        <button>Not Fake</button>
      </div>
    </div>

    <ul class="list">
      <li v-for="n in items" :key="n.id" class="card">
        <h3>{{ n.title }}</h3>
        <p>Reporter: {{ n.reporter }}</p>
        <p>
          Status: <strong>{{ n.status }}</strong>
        </p>
        <RouterLink :to="{ name: 'news-detail', params: { id: n.id } }"> View details </RouterLink>
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
.home {
  max-width: 1100px;
  margin: 24px auto;
  padding: 0 16px;
}
.toolbar {
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  margin: 16px 0;
}
.filters {
  display: flex;
  gap: 8px;
}
.list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 12px;
}
.card {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 12px;
  background: #fff;
}
.pagination {
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
  margin: 18px 0;
}
button {
  cursor: pointer;
}
</style>
