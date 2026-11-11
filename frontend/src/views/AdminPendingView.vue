<script setup lang="ts">
import { onMounted } from 'vue'
import PendingBookRow from '@/components/PendingBookRow.vue'
import { useBooksStore } from '@/stores/books'

const store = useBooksStore()
onMounted(() => store.fetchBooks('pending'))

const categoryName = (id: number) => store.categories.find((c) => c.id === id)?.name ?? ''
</script>

<template>
  <h1>Suggested books</h1>
  <p v-if="store.loading">Loading…</p>
  <p v-else-if="store.error" class="error">
    {{ store.error }} <button @click="store.fetchBooks('pending')">Retry</button>
  </p>
  <p v-else-if="store.books.length === 0">No pending suggestions.</p>
  <ul v-else>
    <PendingBookRow
      v-for="b in store.books"
      :key="b.id"
      :book="b"
      :category-name="categoryName(b.categoryId)"
      @approve="(id) => store.setStatus(id, 'approved')"
      @reject="(id) => store.setStatus(id, 'rejected')"
    />
  </ul>
</template>

<style scoped>
.error {
  color: #c00;
}
</style>
