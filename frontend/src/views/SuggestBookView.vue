<script setup lang="ts">
import { ref } from 'vue'
import SuggestBookForm from '@/components/SuggestBookForm.vue'
import { categories } from '@/data/categories'
import type { BookSuggestion } from '@/types'

const suggested = ref<BookSuggestion[]>([])
const message = ref('')

function onSubmit(s: BookSuggestion) {
  suggested.value.push(s)
  message.value = `"${s.title}" was sent for admin approval.`
}
</script>

<template>
  <h1>Suggest a book</h1>
  <SuggestBookForm :categories="categories" @submit="onSubmit" />
  <p v-if="message">{{ message }}</p>
</template>
