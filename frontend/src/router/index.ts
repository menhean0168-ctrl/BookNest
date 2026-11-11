import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import BookListView from '../views/BookListView.vue'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    requiresAdmin?: boolean
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: BookListView },
    {
      path: '/books/:id',
      name: 'book-detail',
      component: () => import('../views/BookDetailView.vue'),
    },
    {
      path: '/suggest',
      name: 'suggest',
      component: () => import('../views/SuggestBookView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/pending',
      name: 'admin-pending',
      component: () => import('../views/AdminPendingView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if ((to.meta.requiresAuth && !auth.isLoggedIn) || (to.meta.requiresAdmin && !auth.isAdmin)) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})

export default router
