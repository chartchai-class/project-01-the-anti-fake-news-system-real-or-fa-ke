import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'news-list',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/news/:id',
    component: () => import('@/components/layout/NewsDetailLayout.vue'), // Layout เฉพาะ detail
    children: [
      {
        path: '',
        name: 'news-detail',
        component: () => import('@/views/NewsDetailView.vue'),
      },
      {
        path: 'discussion',
        name: 'news-discussion',
        component: () => import('@/views/NewsDiscussionView.vue'),
      },
    ],
  },
  {
    path: '/developer',
    name: 'developer',
    component: () => import('@/views/DeveloperView.vue'),
  },
  {
    path: '/stats',
    name: 'stats',
    component: () => import('@/views/StatsView.vue'),
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/SettingsView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    props: { resource: 'page' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
