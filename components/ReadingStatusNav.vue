<script setup lang="ts">
import { ref } from 'vue'
import type { BooksStatusByUser } from '~/interfaces/readingStatus'
import { readingStatusService } from '~/services/readingStatusService'

const authStore = useAuthStore()

const booksFound = ref(false)
const books = ref([])
const selectedStatus = ref<BooksStatusByUser['status']>('read')

const getBooksByStatus = async (status: BooksStatusByUser['status']) => {
  console.log(status)
  books.value = []
  selectedStatus.value = status
  const statusData: BooksStatusByUser = {
    user_id: authStore.userId,
    status: selectedStatus.value,
  }
  try {
    const fetchedBooks = await readingStatusService.getBooksByStatus(statusData)
    console.log(fetchedBooks)
    books.value = fetchedBooks || []

    if (books.value.length === 0) {
      booksFound.value = false
    } else {
      booksFound.value = true
    }
  } catch (error) {
    console.error('Error getting status books:', error)
  }
}

onMounted(() => {
  if (authStore.userId) {
    console.log('se mete aaaaaaaaaa')
    getBooksByStatus(selectedStatus.value)
  }
})
</script>

<template>
  <div class="info-navigator">
    <div class="buttons">
      <button
        v-for="(status, index) in ['read', 'reading', 'desired']"
        :key="index"
        :class="{ active: selectedStatus === status }"
        @click="getBooksByStatus(status as 'read' | 'reading' | 'desired')"
      >
        {{
          status === 'read' ? 'LEÍDOS' : status === 'reading' ? 'EN PROGRESO' : 'POR LEER'
        }}
      </button>
    </div>

    <Listing v-if="booksFound" :books="books" />

    <div v-else>
      <SvgBooks />
      <h2>No hemos enontrado nada...</h2>
    </div>
  </div>
</template>

<style scoped lang="scss">
.info-navigator {
  margin: 0 auto;
  text-align: center;
  background-color: var(--c-graphite);
  color: var(--c-white);
  height: 100%;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 0.625rem;
  margin-bottom: 1.25rem;
  padding: 2.2rem 0 2.2rem;
}

button {
  margin: 0 3rem;
  padding: 0 0 0.5rem;
  font-size: 1.2rem;
  color: var(--c-grey-medium);
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;
}

button:hover {
  color: var(--c-white);
}

button.active {
  color: var(--c-white);
  border-bottom: 0.2rem solid var(--c-white);
}
</style>
