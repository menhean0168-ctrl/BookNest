import { http } from './http'
import type { Book, BookStatus, BookSuggestion } from '@/types'

export const getBooks = (status?: BookStatus) =>
  http<Book[]>(status ? `/books?status=${status}` : '/books')

export const getBook = (id: number) => http<Book>(`/books/${id}`)

export const createSuggestion = (s: BookSuggestion, userId: number) =>
  http<Book>('/books', {
    method: 'POST',
    body: JSON.stringify({
      ...s,
      description: '',
      year: null,
      coverUrl: '',
      status: 'pending',
      suggestedById: userId,
    }),
  })

export const updateBookStatus = (id: number, status: BookStatus) =>
  http<Book>(`/books/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) })
