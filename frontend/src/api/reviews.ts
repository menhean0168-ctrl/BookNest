import { http } from './http'
import type { Review } from '@/types'

export const getReviewsForBook = (bookId: number) => http<Review[]>(`/reviews?bookId=${bookId}`)

export const deleteReview = (id: number) => http<void>(`/reviews/${id}`, { method: 'DELETE' })
