import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as booksApi from '@/api/books'
import * as reviewsApi from '@/api/reviews'
import { getUsers } from '@/api/users'
import type { Book, Review, User } from '@/types'

export const useReviewsStore = defineStore('reviews', () => {
  const book = ref<Book | null>(null)
  const reviews = ref<Review[]>([])
  const users = ref<User[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadBook(id: number) {
    loading.value = true
    error.value = null
    book.value = null
    try {
      const [b, r, u] = await Promise.all([
        booksApi.getBook(id),
        reviewsApi.getReviewsForBook(id),
        getUsers(),
      ])
      book.value = b
      reviews.value = r
      users.value = u
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Something went wrong'
    } finally {
      loading.value = false
    }
  }

  async function removeReview(id: number) {
    error.value = null
    try {
      await reviewsApi.deleteReview(id)
      reviews.value = reviews.value.filter((r) => r.id !== id)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Something went wrong'
    }
  }

  return { book, reviews, users, loading, error, loadBook, removeReview }
})
