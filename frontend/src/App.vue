<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <strong>BookNest</strong>
    <nav>
      <RouterLink to="/">Books</RouterLink>
      <RouterLink to="/suggest">Suggest a book</RouterLink>
    </nav>
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
main {
  padding: 1rem 2rem;
}
</style>
