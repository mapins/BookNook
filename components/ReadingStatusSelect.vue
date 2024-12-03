<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { readingStatusService } from '../services/readingStatusService'
import type { ReadingStatus } from '~/interfaces/readingStatus'
import { useAuthStore } from '@/stores/auth'

const props = defineProps<{
  bookId: number
}>()

const { userId } = useAuthStore()

const bookReadingStatus = ref<ReadingStatus>({
  book_id: 0,
  user_id: userId,
  status: null,
})

bookReadingStatus.value.book_id = props.bookId

onMounted(async () => {
  if (!isNaN(props.bookId)) {
    try {
      const status = await readingStatusService.getBookByStatus({
        book_id: props.bookId,
        user_id: userId,
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
      user_id: userId,
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
    }
  },
)
</script>
<template>
  <div class="reading-status">
    <h1>Guardar Estado de Lectura</h1>
    <label for="status">Estado:</label>
    <select v-model="bookReadingStatus.status">
      <option value="read">Leído</option>
      <option value="reading">Leyendo</option>
      <option value="desired">Deseado</option>
    </select>
    <button
      v-if="bookReadingStatus.status && bookReadingStatus.status != 'not_found'"
      @click="deleteStatus"
    >
      Eliminar Estado
    </button>
  </div>
</template>

<style lang="scss" scoped>
.reading-status {
  padding: 3rem var(--s-padding-lateral-left) 3rem var(--s-padding-lateral-right);
  @include responsive() {
    padding: 3rem var(--s-padding-lateral-mobile);
  }
}

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
