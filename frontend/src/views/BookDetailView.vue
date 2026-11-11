<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import ReviewItem from '@/components/ReviewItem.vue'
import { books } from '@/data/books'
import { reviews as seedReviews } from '@/data/reviews'
import { users } from '@/data/users'

const route = useRoute()
const currentUserId = 1 // hard-coded until login exists

const book = computed(() => books.find((b) => b.id === Number(route.params.id)))
const reviews = ref([...seedReviews])
const bookReviews = computed(() => reviews.value.filter((r) => r.bookId === book.value?.id))

const userName = (id: number) => users.find((u) => u.id === id)?.name ?? 'Unknown'
const removeReview = (id: number) => {
  reviews.value = reviews.value.filter((r) => r.id !== id)
}
</script>

<template>
  <p v-if="!book">Book not found.</p>
  <template v-else>
    <h1>{{ book.title }}</h1>
    <p>{{ book.author }}</p>
    <p>{{ book.description }}</p>
    <h2>Reviews</h2>
    <p v-if="bookReviews.length === 0">No reviews yet.</p>
    <ul v-else>
      <ReviewItem
        v-for="r in bookReviews"
        :key="r.id"
        :review="r"
        :user-name="userName(r.userId)"
        :can-edit="r.userId === currentUserId"
        @delete="removeReview"
      />
    </ul>
  </template>
</template>
