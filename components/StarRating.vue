<script setup lang="ts">
import type { Rating } from '~/interfaces'
import { ratingsService } from '~/services/ratingService'
import { useAuthCheck } from '@/composables/useAuthCheck'

const { handleActionIfNotLoggedIn } = useAuthCheck()

const authStore = useAuthStore()
const { userId } = storeToRefs(authStore)

const props = defineProps<{
  bookId: number
}>()

const bookRating = ref<Rating>({
  user_id: userId.value,
  book_id: props.bookId,
  rating: 0,
})

const setRating = async (newRating: number) => {
  if (!userId.value) {
    handleActionIfNotLoggedIn()
    return
  }
  if (bookRating.value.rating === newRating) {
    deleteRating()
    return
  }
  bookRating.value.rating = newRating
  saveRating(bookRating.value)
}

const saveRating = async (bookRating: Rating) => {
  try {
    const currentRating = await ratingsService.saveRating(bookRating)
    await alertService.successSaveRating()
    bookRating.rating = currentRating.rating
  } catch (error) {
    console.error('Error saving rating:', error)
  }
}

const deleteRating = async () => {
  try {
    await ratingsService.deleteRating({
      user_id: userId.value,
      book_id: bookRating.value.book_id,
    })
    await alertService.successRemoveRating()

    bookRating.value.rating = 0
  } catch (error) {
    console.error('Error deleting rating:', error)
  }
}

onMounted(async () => {
  try {
    const currentRating = await ratingsService.getRatingByUserAndBook(bookRating.value)

    if (currentRating) {
      bookRating.value.rating = currentRating.rating
    }
  } catch (error) {
    console.log('Error taking rating' + error)
  }
})
</script>
<template>
  <div class="star-rating">
    <div
      v-for="i in 5"
      :key="i"
      @click="setRating(i)"
      :class="['star', i <= (bookRating.rating ?? 0) ? 'filled' : '']"
    >
      ★
    </div>
  </div>
</template>

<style scoped>
.star-rating {
  display: inline-block;
}

.star {
  display: inline-block;
  font-size: 1.5rem;
  cursor: pointer;
  margin: 0.125rem;
  color: rgb(222, 222, 222);
}

.filled {
  color: gold;
}
</style>
