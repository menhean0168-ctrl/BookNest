<script setup lang="ts">
import type { Category } from '@/types'

defineProps<{ categories: Category[] }>()

// v-model on both fields: props down, events up
const query = defineModel<string>('query', { default: '' })
const categoryId = defineModel<number | null>('categoryId', { default: null })
</script>

<template>
  <div class="search-bar">
    <input v-model="query" type="search" placeholder="Search title or author" />
    <select v-model="categoryId">
      <option :value="null">All categories</option>
      <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
    </select>
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
input {
  flex: 1;
}
</style>
