<!-- App.vue -->
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
// import { useMessageStore } from '@/stores/message'
// import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'

// const store = useMessageStore()
// const { message } = storeToRefs(store)

// แค่เดโมสวิตช์ธีม (ไม่บังคับ)
const dark = ref(false)
onMounted(() => {
  document.documentElement.dataset.theme = dark.value ? 'dark' : 'light'
})
function toggleTheme() {
  dark.value = !dark.value
  document.documentElement.dataset.theme = dark.value ? 'dark' : 'light'
}
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>

  <div class="app-shell">
    <!-- Topbar -->
    <header class="topbar">
      <div class="brand">
        <RouterLink :to="{ name: 'news-list' }" class="logo">Anti‑Fake</RouterLink>
      </div>

      <nav class="nav" aria-label="Primary">
        <RouterLink :to="{ name: 'news-list' }">News</RouterLink>
        <RouterLink :to="{ name: 'about' }">About</RouterLink>
        <RouterLink :to="{ name: 'stats' }">Stats</RouterLink>
        <RouterLink :to="{ name: 'settings' }">Settings</RouterLink>
      </nav>

      <div class="actions">
        <button class="theme-btn" @click="toggleTheme" aria-label="Toggle theme">
          {{ dark ? 'Light' : 'Dark' }}
        </button>
      </div>
    </header>

    <!-- Flash/Toast (ต่างจากแลปเก่า: เป็นมุมขวาบน) -->
    <transition name="fade">
      <!-- <div v-if="message" class="toast" role="status" aria-live="polite">
        {{ message }}
      </div> -->
    </transition>

    <!-- Main container -->
    <main id="main" class="container">
      <RouterView />
    </main>

    <footer class="footer">
      <small>© 2025 Social Anti‑Fake News • Deployed on Vercel</small>
    </footer>
  </div>
</template>

<style>
:root {
  --bg: #ffffff;
  --fg: #1f2937;
  --muted: #6b7280;
  --brand: #2563eb;
  --brand-weak: #dbeafe;
  --card: #f8fafc;
  --ring: rgba(37, 99, 235, 0.35);
}
:root[data-theme='dark'] {
  --bg: #0b1220;
  --fg: #e5e7eb;
  --muted: #9ca3af;
  --brand: #60a5fa;
  --brand-weak: #1e293b;
  --card: #0f172a;
  --ring: rgba(96, 165, 250, 0.35);
}

* {
  box-sizing: border-box;
}
html,
body,
#app {
  height: 100%;
}
body {
  margin: 0;
  background: var(--bg);
  color: var(--fg);
  font-family:
    ui-sans-serif,
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial;
}

.app-shell {
  min-height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 20;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  border-bottom: 1px solid var(--brand-weak);
  backdrop-filter: saturate(120%) blur(6px);
  background: color-mix(in srgb, var(--bg) 88%, transparent);
}
.brand {
  justify-self: start;
}
.logo {
  font-weight: 800;
  letter-spacing: 0.2px;
  text-decoration: none;
  color: var(--brand);
  padding: 6px 10px;
  border-radius: 10px;
  background: var(--brand-weak);
}
.nav {
  display: flex;
  gap: 16px;
  justify-content: center;
}
.nav a {
  text-decoration: none;
  color: var(--fg);
  padding: 6px 10px;
  border-radius: 10px;
}
.nav a.router-link-active {
  background: var(--brand-weak);
  color: var(--brand);
}
.nav a:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}

.actions {
  justify-self: end;
}
.theme-btn {
  border: 1px solid var(--brand-weak);
  background: var(--card);
  color: var(--fg);
  padding: 6px 10px;
  border-radius: 10px;
  cursor: pointer;
}
.theme-btn:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}

.container {
  max-width: 1100px;
  margin: 24px auto;
  padding: 0 16px;
}

.footer {
  border-top: 1px solid var(--brand-weak);
  padding: 18px 20px;
  text-align: center;
  color: var(--muted);
  background: color-mix(in srgb, var(--bg) 92%, transparent);
}

/* Flash/Toast ที่มุมขวาบน */
.toast {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 30;
  background: var(--card);
  border: 1px solid var(--brand-weak);
  border-radius: 12px;
  padding: 10px 14px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ปุ่มข้ามไปคอนเทนต์ เพื่อ a11y */
.skip-link {
  position: absolute;
  left: -9999px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
.skip-link:focus {
  left: 12px;
  top: 12px;
  width: auto;
  height: auto;
  padding: 8px 12px;
  background: var(--brand);
  color: white;
  border-radius: 8px;
  z-index: 50;
}

/* Responsive */
@media (max-width: 720px) {
  .topbar {
    grid-template-columns: auto 1fr auto;
  }
  .nav {
    gap: 8px;
    font-size: 14px;
    flex-wrap: wrap;
  }
}
</style>
