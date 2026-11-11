import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { findUserByEmail } from '@/api/users'
import type { User } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoggedIn = computed(() => user.value !== null)
  const isAdmin = computed(() => user.value?.role === 'admin')

  // Mock login: json-server has no real auth, so we only look the user up by email.
  async function login(email: string): Promise<boolean> {
    const found = await findUserByEmail(email)
    user.value = found
    return found !== null
  }

  function logout() {
    user.value = null
  }

  return { user, isLoggedIn, isAdmin, login, logout }
})
