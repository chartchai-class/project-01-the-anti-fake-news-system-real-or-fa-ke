import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'news-list',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/news/:id',
    component: () => import('@/components/layout/NewsDetailLayout.vue'), // Layout เฉพาะ detail
    props: true,
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
    component: () => import(/* webpackPrefetch: true */ '@/views/DeveloperView.vue'),
  },
  {
    path: '/offline',
    name: 'Offline',
    component: () => import('@/views/OfflineView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound404.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  // Redirect to OfflineView if offline and not already on OfflineView
  if (!navigator.onLine && to.name !== 'Offline') {
    next({ name: 'Offline' })
    return
  }
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

NProgress.configure({
  showSpinner: false,      // Hide the default spinner
  trickleSpeed: 200,      // Speed of progress bar trickle
  minimum: 0.1            // Minimum percentage shown
})

// Custom NProgress bar style
import '@/assets/nprogress-custom.css'
export default router
