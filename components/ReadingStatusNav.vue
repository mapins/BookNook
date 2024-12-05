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
    <div class="my-books__select">
      <select v-model="selectedRating">
        <option :value="null">Ninguna estrella</option>
        <option :value="1">⭐</option>
        <option :value="2">⭐⭐</option>
        <option :value="3">⭐⭐⭐</option>
        <option :value="4">⭐⭐⭐⭐</option>
        <option :value="5">⭐⭐⭐⭐⭐</option>
      </select>
    </div>

    <Listing v-if="booksFound" :books="books" />
  </div>
</template>

<style scoped lang="scss">
.info-navigator {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  text-align: center;
  background-color: var(--c-graphite);
  color: var(--c-white);
  height: 100vh;
  padding: var(--s-padding-lateral);
  @include responsive() {
    padding: 0 var(--s-padding-lateral-mobile);
  }
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 0.625rem;
  padding-top: 1rem;
  button {
    margin: 0 3rem;
    padding: 0 0 0.5rem;
    font-size: 1.2rem;
    color: var(--c-grey-medium);
    cursor: pointer;
    transition:
      background-color 0.3s,
      color 0.3s;
    @include responsive() {
      font-size: 1rem;
      margin: 0 1rem;
    }
  }
  button:hover {
    color: var(--c-white);
  }
  button.active {
    color: var(--c-white);
    border-bottom: 0.2rem solid var(--c-white);
  }
}

.my-books {
  &__select {
    position: relative;
    display: flex;
    width: 100%;
    max-width: 18.75rem;
    margin: 0 auto;
    padding: 1rem;
    @include responsive() {
      margin: auto;
      padding-left: 0;
    }
    select {
      appearance: none;
      width: 100%;
      padding: 1rem 1.5rem;
      background-color: var(--c-black);
      border: 0.125rem solid transparent;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 500;
      color: var(--c-white);
      cursor: pointer;
      box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease-in-out;
      &:hover {
        background-color: var(--c-black);
      }
      &:focus {
        outline: none;
        border-color: var(--c-primary);
        box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.2);
      }
    }
    &::after {
      content: '';
      position: absolute;
      top: 48%;
      right: 2rem;
      width: 0.625rem;
      height: 0.625rem;
      border: solid var(--c-primary);
      border-width: 0 0.125rem 0.125rem 0;
      transform: translateY(-50%) rotate(45deg);
      pointer-events: none;
      transition: transform 0.3s ease;
    }
    select:focus + &::after {
      transform: translateY(-50%) rotate(-135deg);
    }
  }
}
</style>
