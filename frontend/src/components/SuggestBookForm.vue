<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { BookSuggestion, Category } from '@/types'

defineProps<{ categories: Category[] }>()
const emit = defineEmits<{ submit: [suggestion: BookSuggestion] }>()

const form = reactive({ title: '', author: '', categoryId: null as number | null })
const errors = ref<{ title?: string; author?: string; categoryId?: string }>({})

function validate(): boolean {
  errors.value = {}
  if (!form.title.trim()) errors.value.title = 'Title is required'
  if (!form.author.trim()) errors.value.author = 'Author is required'
  if (form.categoryId === null) errors.value.categoryId = 'Pick a category'
  return Object.keys(errors.value).length === 0
}

function onSubmit() {
  if (!validate() || form.categoryId === null) return
  emit('submit', {
    title: form.title.trim(),
    author: form.author.trim(),
    categoryId: form.categoryId,
  })
  form.title = ''
  form.author = ''
  form.categoryId = null
}
</script>

<template>
  <form novalidate @submit.prevent="onSubmit">
    <label>
      Title
      <input v-model="form.title" />
      <span v-if="errors.title" class="error">{{ errors.title }}</span>
    </label>
    <label>
      Author
      <input v-model="form.author" />
      <span v-if="errors.author" class="error">{{ errors.author }}</span>
    </label>
    <label>
      Category
      <select v-model="form.categoryId">
        <option :value="null" disabled>Select…</option>
        <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
      </select>
      <span v-if="errors.categoryId" class="error">{{ errors.categoryId }}</span>
    </label>
    <button type="submit">Suggest book</button>
  </form>
</template>

<style scoped>
form {
  display: grid;
  gap: 0.75rem;
  max-width: 24rem;
}
label {
  display: grid;
  gap: 0.25rem;
}
.error {
  color: #c00;
  font-size: 0.85rem;
}
</style>
