<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { readingStatusService } from '../services/readingStatusService'
import type { ReadingStatus } from '~/interfaces/readingStatus'
import { useAuthStore } from '@/stores/auth'

const props = defineProps<{
  bookId: number
}>()

const authStore = useAuthStore()
const { userId } = storeToRefs(authStore)

const bookReadingStatus = ref<ReadingStatus>({
  book_id: 0,
  user_id: userId.value,
  status: null,
})

bookReadingStatus.value.book_id = props.bookId

onMounted(async () => {
  if (!isNaN(props.bookId)) {
    try {
      const status = await readingStatusService.getBookByStatus({
        book_id: props.bookId,
        user_id: userId.value,
      })
      if (status?.status) {
        bookReadingStatus.value.status = status.status
      }
    } catch (error) {
      console.error('Error fetching reading status:', error)
    }
  }
})

const saveStatus = async () => {
  if (bookReadingStatus.value.status !== null) {
    try {
      await readingStatusService.saveStatus(bookReadingStatus.value)
    } catch (error) {
      console.error('Error saving status:', error)
    }
  }
}
const deleteStatus = async () => {
  try {
    const result = await readingStatusService.deleteStatus({
      user_id: userId.value,
      book_id: bookReadingStatus.value.book_id,
    })

    console.log('Book status deleted: ', result)
    bookReadingStatus.value.status = null
  } catch (error) {
    console.error('Error deleting status:', error)
  }
}

watch(
  () => bookReadingStatus.value.status,
  async (newStatus, oldStatus) => {
    if (newStatus !== 'not_found') {
      await saveStatus()
    } else {
      await deleteStatus()
    }
  },
)
</script>
<template>
  <div class="reading-status">
    <form class="reading-status__form">
      <div class="reading-status__form-group">
        <label for="status" class="reading-status__label">Estado:</label>
        <select v-model="bookReadingStatus.status" class="reading-status__select">
          <option value="not_found"></option>
          <option value="read">Leído</option>
          <option value="reading">Leyendo</option>
          <option value="desired">Deseado</option>
        </select>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.reading-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--c-graphite); // Ejemplo de uso de variable
  border-radius: 0.5rem;
  max-width: 30rem;
  &__title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--c-white);
    margin-bottom: 1.5rem;
    text-align: center;
  }
  &__form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  &__form-group {
    margin-bottom: 1.5rem;
  }
  &__label {
    font-size: 1rem;
    font-weight: 500;
    color: var(--c-white);
    margin-bottom: 0.5rem;
  }
  &__select {
    width: 100%;
    padding: 0.75rem;
    border: 0.0625rem solid var(--c-white);
    border-radius: 0.5rem;
    font-size: 1rem;
    color: var(--c-white);
    background-color: var(--c-graphite);
    transition: border-color 0.3s ease;
    &:focus {
      border-color: var(--c-white);
      outline: none;
    }
  }
  &__button {
    padding: 0.75rem;
    border: none;
    border-radius: 0.5rem;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &--submit {
      background-color: var(--c-graphite);
      color: white;
      margin-top: 1rem;
      &:hover {
        /*         background-color: darken(var(--c-white), 10%);
 */
      }
    }
    &--delete {
      background-color: var(--c-graphite);
      color: white;
      margin-top: 1rem;
      &:hover {
        /*         background-color: darken(var(--c-white), 10%);
 */
      }
    }
  }
}

@media (max-width: 37.5rem) {
  .reading-status {
    padding: 1rem;
    max-width: 90%;
  }
}
</style>
