<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { readingStatusService } from '../services/readingStatusService'
import type { currentUserBook, ReadingStatus } from '~/interfaces/readingStatus'
import { useAuthStore } from '@/stores/auth'
const { userId } = useAuthStore()
const route = useRoute()

const bookReadingStatus = ref<ReadingStatus>({
  book_id: 0,
  user_id: userId,
  status: null,
})

const currentBook = ref<currentUserBook>({
  book_id: 0,
  user_id: userId,
})

const isLoading = ref(true)

onMounted(async () => {
  const bookId = Number(route.params.id)
  if (!isNaN(bookId)) {
    bookReadingStatus.value.book_id = bookId
    currentBook.value.book_id = bookId

    if (bookReadingStatus.value.status === null) {
      try {
        const status = await readingStatusService.getBookByStatus(currentBook.value)
        if (status && status.status !== undefined) {
          bookReadingStatus.value.status = status.status
        } else {
          bookReadingStatus.value.status = null
        }
      } catch (error) {
        console.error('Error fetching reading status:', error)
      }
      isLoading.value = false
    } else {
      console.error('ID del libro no válido:', route.params.id)
    }
  }
})

const saveStatus = async (readingStatus: ReadingStatus) => {
  try {
    await readingStatusService.saveStatus(readingStatus)
  } catch (error) {
    console.error('Error saving status:', error)
  }
}

watch(
  () => bookReadingStatus.value.status,
  (newStatus, oldStatus) => {
    if (!isLoading.value && newStatus !== oldStatus) {
      saveStatus(bookReadingStatus.value)
    }
  },
)
</script>
<template>
  <div>
    <h1>Guardar Estado de Lectura</h1>
    <label for="status">Estado:</label>
    <select v-model="bookReadingStatus.status">
      <option value="read">Leído</option>
      <option value="reading">Leyendo</option>
      <option value="desired">Deseado</option>
    </select>
  </div>
</template>

<style scoped>
form {
  max-width: 25rem;
  margin: 0 auto;
}

label {
  display: block;
  margin-top: 0.625rem;
}

select,
button {
  display: block;
  width: 100%;
  margin-top: 0.3125rem;
}

button {
  margin-top: 1.25rem;
  padding: 0.625rem;
}
</style>
