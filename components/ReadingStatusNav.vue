<script setup lang="ts">
import { ref } from 'vue'
import type { BooksStatusByUser } from '~/interfaces/readingStatus'
import { getBooksByStatusAndRating } from '~/services/bookService'

const authStore = useAuthStore()

const booksFound = ref(false)
const books = ref([])
const selectedStatus = ref<BooksStatusByUser['status']>('read')
const selectedRating = ref<number | null>(null)

const getBooksByStatus = async (
  status: BooksStatusByUser['status'],
  rating: number | null,
) => {
  console.log(status)
  books.value = []
  selectedStatus.value = status

  try {
    const fetchedBooks = await getBooksByStatusAndRating(
      authStore.userId,
      status,
      rating !== null ? rating : null,
    )

    books.value = fetchedBooks || []
    booksFound.value = books.value.length > 0
  } catch (error) {
    console.error('Error getting status and rating books:', error)
  }
}

onMounted(() => {
  if (authStore.userId) {
    getBooksByStatus(selectedStatus.value, selectedRating.value)
  }
})

watch(selectedRating, (newRating) => {
  getBooksByStatus(selectedStatus.value, newRating)
})
</script>

<template>
  <div class="info-navigator">
    <div class="buttons">
      <button
        v-for="(status, index) in ['read', 'reading', 'desired']"
        :key="index"
        :class="{ active: selectedStatus === status }"
        @click="
          getBooksByStatus(status as 'read' | 'reading' | 'desired', selectedRating)
        "
      >
        {{
          status === 'read' ? 'LEÍDOS' : status === 'reading' ? 'EN PROGRESO' : 'POR LEER'
        }}
      </button>
    </div>

    <select v-model="selectedRating">
      <option :value="null">Todos</option>
      <option :value="1">1 Estrella</option>
      <option :value="2">2 Estrellas</option>
      <option :value="3">3 Estrellas</option>
      <option :value="4">4 Estrellas</option>
      <option :value="5">5 Estrellas</option>
    </select>

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

select {
  background-color: white;
}
</style>
