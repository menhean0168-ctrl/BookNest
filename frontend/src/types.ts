export type BookStatus = 'pending' | 'approved' | 'rejected'
export type Role = 'reader' | 'admin'

export interface User {
  id: number
  name: string
  email: string
  role: Role
}

export interface Category {
  id: number
  name: string
}

export interface Book {
  id: number
  title: string
  author: string
  description: string
  year: number | null
  coverUrl: string
  status: BookStatus
  categoryId: number
  suggestedById: number | null
}

export interface Review {
  id: number
  bookId: number
  userId: number
  rating: number // whole number 1-5
  text: string
}

export type BookSuggestion = Pick<Book, 'title' | 'author' | 'categoryId'>

export type ReadingStatus = 'want to read' | 'read'

export interface ReadingListItem {
  id: number
  userId: number
  bookId: number
  status: ReadingStatus
}
