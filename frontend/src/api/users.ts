import { http } from './http'
import type { User } from '@/types'

export const getUsers = () => http<User[]>('/users')

export const findUserByEmail = async (email: string) => {
  const users = await http<User[]>(`/users?email=${encodeURIComponent(email)}`)
  return users[0] ?? null
}
