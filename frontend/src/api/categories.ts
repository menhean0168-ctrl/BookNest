import { http } from './http'
import type { Category } from '@/types'

export const getCategories = () => http<Category[]>('/categories')
