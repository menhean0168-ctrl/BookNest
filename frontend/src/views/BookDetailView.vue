<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import ReviewItem from '@/components/ReviewItem.vue'
import { useAuthStore } from '@/stores/auth'
import { useReviewsStore } from '@/stores/reviews'

const route = useRoute()
const store = useReviewsStore()
const auth = useAuthStore()

watch(
  () => route.params.id,
  (id) => store.loadBook(Number(id)),
  { immediate: true },
)

const userName = (id: number) => store.users.find((u) => u.id === id)?.name ?? 'Unknown'
</script>

<template>
  <p v-if="store.loading">Loading book…</p>
  <p v-else-if="store.error" class="error">
    {{ store.error }} <button @click="store.loadBook(Number(route.params.id))">Retry</button>
  </p>
  <template v-else-if="store.book">
    <h1>{{ store.book.title }}</h1>
    <p>{{ store.book.author }}</p>
    <p>{{ store.book.description }}</p>
    <h2>Reviews</h2>
    <p v-if="store.reviews.length === 0">No reviews yet.</p>
    <ul v-else>
      <ReviewItem
        v-for="r in store.reviews"
        :key="r.id"
        :review="r"
        :user-name="userName(r.userId)"
        :can-edit="r.userId === auth.user?.id"
        @delete="store.removeReview"
      />
    </ul>
  </template>
</template>

<style scoped>
.error {
  color: #c00;
}
</style>
