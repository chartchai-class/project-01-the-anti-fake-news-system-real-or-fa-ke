<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
</script>

<template>
  <a href="#main"
     class="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50
            focus:rounded-lg focus:bg-blue-600 focus:px-3 focus:py-2 focus:text-white">
    Skip to content
  </a>

  <div class="min-h-dvh grid grid-rows-[auto,1fr,auto] bg-white text-slate-800 dark:bg-slate-950 dark:text-slate-100">
      <Navbar />

    <main id="main" class="w-full my-6 px-4">
      <RouterView />
    </main>

    <Footer />
  </div>
</template>
