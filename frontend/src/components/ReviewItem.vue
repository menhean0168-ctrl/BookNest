<script setup lang="ts">
import type { Review } from '@/types'

defineProps<{ review: Review; userName: string; canEdit: boolean }>()
const emit = defineEmits<{ delete: [id: number] }>()
</script>

<template>
  <li class="review">
    <strong>{{ userName }}</strong> — {{ '★'.repeat(review.rating) }}
    <p v-if="review.text">{{ review.text }}</p>
    <button v-if="canEdit" @click="emit('delete', review.id)">Delete</button>
  </li>
</template>
