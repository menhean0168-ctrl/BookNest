import { http } from './http'
import type { ReadingListItem } from '@/types'

export const getReadingList = (userId: number) =>
  http<ReadingListItem[]>(`/readingList?userId=${userId}`)
