<script setup lang="ts">
import type { Book } from '@/types'

defineProps<{ book: Book; categoryName: string }>()
const emit = defineEmits<{ select: [id: number] }>()
</script>

<template>
  <article class="book-card" @click="emit('select', book.id)">
    <h3>{{ book.title }}</h3>
    <p>{{ book.author }}</p>
    <small>{{ categoryName }}</small>
  </article>
</template>

<style scoped>
.book-card {
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 0.75rem;
  cursor: pointer;
}
.book-card:hover {
  background: var(--color-background-soft);
}
h3,
p {
  margin: 0 0 0.25rem;
}
</style>
