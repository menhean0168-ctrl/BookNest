<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

function logout() {
  auth.logout()
  router.push({ name: 'home' })
}
</script>

<template>
  <header>
    <strong>BookNest</strong>
    <nav>
      <RouterLink to="/">Books</RouterLink>
      <RouterLink v-if="auth.isLoggedIn" to="/suggest">Suggest a book</RouterLink>
      <RouterLink v-if="auth.isAdmin" to="/admin/pending">Suggested books</RouterLink>
    </nav>
    <span class="user">
      <template v-if="auth.user">
        {{ auth.user.name }} <button @click="logout">Log out</button>
      </template>
      <RouterLink v-else to="/login">Log in</RouterLink>
    </span>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--color-border);
}
nav {
  display: flex;
  gap: 1rem;
}
.user {
  margin-left: auto;
}
main {
  padding: 1rem 2rem;
}
</style>
