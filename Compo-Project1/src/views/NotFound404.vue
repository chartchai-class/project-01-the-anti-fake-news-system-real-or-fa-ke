<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-900">
    <div class="text-6xl font-bold text-red-500 mb-4">404</div>
    <div class="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-2">
      Page Not Found
    </div>
    <div class="text-lg text-slate-600 dark:text-slate-300 mb-6">
      Sorry, the page you’re looking for doesn’t exist.
    </div>
    <router-link
      to="/"
      class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Go to Home
    </router-link>
  </div>
</template>

