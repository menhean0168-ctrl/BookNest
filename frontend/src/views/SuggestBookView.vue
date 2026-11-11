<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SuggestBookForm from '@/components/SuggestBookForm.vue'
import { useAuthStore } from '@/stores/auth'
import { useBooksStore } from '@/stores/books'
import type { BookSuggestion } from '@/types'

const store = useBooksStore()
const auth = useAuthStore()
const message = ref('')

onMounted(() => store.fetchCategories())

async function onSubmit(s: BookSuggestion) {
  message.value = ''
  if (!auth.user) return
  await store.suggestBook(s, auth.user.id)
  if (!store.error) message.value = `"${s.title}" was sent for admin approval.`
}
</script>

<template>
  <h1>Suggest a book</h1>
  <SuggestBookForm :categories="store.categories" @submit="onSubmit" />
  <p v-if="store.loading">Saving…</p>
  <p v-else-if="store.error" class="error">{{ store.error }}</p>
  <p v-else-if="message">{{ message }}</p>
</template>

<style scoped>
.error {
  color: #c00;
}
</style>
