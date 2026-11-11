<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import SearchBar from '@/components/SearchBar.vue'
import BookCard from '@/components/BookCard.vue'
import { useBooksStore } from '@/stores/books'

const router = useRouter()
const store = useBooksStore()
const query = ref('')
const categoryId = ref<number | null>(null)

onMounted(() => store.fetchBooks('approved'))

const visibleBooks = computed(() => {
  const q = query.value.trim().toLowerCase()
  return store.books.filter(
    (b) =>
      (categoryId.value === null || b.categoryId === categoryId.value) &&
      (b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)),
  )
})

const categoryName = (id: number) => store.categories.find((c) => c.id === id)?.name ?? ''
</script>

<template>
  <h1>Books</h1>
  <SearchBar v-model:query="query" v-model:categoryId="categoryId" :categories="store.categories" />
  <p v-if="store.loading">Loading books…</p>
  <p v-else-if="store.error" class="error">
    {{ store.error }} <button @click="store.fetchBooks('approved')">Retry</button>
  </p>
  <p v-else-if="visibleBooks.length === 0">No books found</p>
  <div v-else class="grid">
    <BookCard
      v-for="b in visibleBooks"
      :key="b.id"
      :book="b"
      :category-name="categoryName(b.categoryId)"
      @select="(id) => router.push({ name: 'book-detail', params: { id } })"
    />
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
  gap: 1rem;
}
.error {
  color: #c00;
}
</style>
