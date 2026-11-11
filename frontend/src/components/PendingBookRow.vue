<script setup lang="ts">
import type { Book } from '@/types'

defineProps<{ book: Book; categoryName: string }>()
const emit = defineEmits<{ approve: [id: number]; reject: [id: number] }>()
</script>

<template>
  <li class="row">
    <span>
      <strong>{{ book.title }}</strong> by {{ book.author }} <small>({{ categoryName }})</small>
    </span>
    <span class="actions">
      <button @click="emit('approve', book.id)">Approve</button>
      <button @click="emit('reject', book.id)">Reject</button>
    </span>
  </li>
</template>

<style scoped>
.row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--color-border);
}
.actions {
  display: flex;
  gap: 0.5rem;
}
</style>
