import { createRouter, createWebHistory } from 'vue-router'
import BookListView from '../views/BookListView.vue'

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
    },
  ],
})

export default router
