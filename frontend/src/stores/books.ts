import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as booksApi from '@/api/books'
import { getCategories } from '@/api/categories'
import type { Book, BookStatus, BookSuggestion, Category } from '@/types'

export const useBooksStore = defineStore('books', () => {
  const books = ref<Book[]>([])
  const categories = ref<Category[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function run(fn: () => Promise<void>) {
    loading.value = true
    error.value = null
    try {
      await fn()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Something went wrong'
    } finally {
      loading.value = false
    }
  }

  const fetchBooks = (status?: BookStatus) =>
    run(async () => {
      const [b, c] = await Promise.all([booksApi.getBooks(status), getCategories()])
      books.value = b
      categories.value = c
    })

  const fetchCategories = () =>
    run(async () => {
      categories.value = await getCategories()
    })

  const suggestBook = (s: BookSuggestion, userId: number) =>
    run(async () => {
      await booksApi.createSuggestion(s, userId)
    })

  const setStatus = (id: number, status: BookStatus) =>
    run(async () => {
      await booksApi.updateBookStatus(id, status)
      books.value = books.value.filter((b) => b.id !== id)
    })

  return { books, categories, loading, error, fetchBooks, fetchCategories, suggestBook, setStatus }
})
