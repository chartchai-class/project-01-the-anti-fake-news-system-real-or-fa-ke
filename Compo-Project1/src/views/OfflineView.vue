<template>
  <section class="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-900">
    <div class="text-6xl font-bold text-yellow-500 mb-4">Offline</div>
    <div class="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-2">No Internet Connection</div>
    <div class="text-lg text-slate-600 dark:text-slate-300 mb-6">Please check your network and try again.</div>
    <RouterLink :to="{ name: 'news-list' }" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
      Go Home
    </RouterLink>
  </section>
</template>
