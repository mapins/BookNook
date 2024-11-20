<script setup>
import Listing from '~/components/Listing.vue'
import { useFilterBooks } from '~/composables/useFilterBooks'
import { getBooks } from '~/services/bookService'
import { useElementStore } from '@/stores/search'
const { handleElement } = useElementStore()
const { filteredBooks, searchBook } = useFilterBooks()

const books = ref([])
const isLoading = ref(false)

const searchTerm = ref('')

onMounted(async () => {
  try {
    isLoading.value = true
    books.value = await getBooks()
    filteredBooks.value = [...books.value]
    isLoading.value = false
  } catch (error) {
    console.error('Error al carga los libros filtrados:', error)
  }
})
watch(searchTerm, (newTerm) => {
  searchBook(newTerm, books.value)
})
</script>
<template>
  <form @submit.prevent>
    <div class="field">
      <input
        v-model="searchTerm"
        id="search"
        name="search"
        type="text"
        placeholder="Search for a book..."
      />

      <button type="button" aria-label="Close" @click="handleElement">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 15 15"
        >
          <g
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-miterlimit="10"
            stroke-width="1.5"
          >
            <path d="M.75.75l13.5 13.5M14.25.75L.75 14.25" />
          </g>
        </svg>
      </button>
    </div>

    <Listing :books="filteredBooks" />
  </form>
</template>

<style lang="scss" scoped>
form {
  position: fixed;
  top: 0;
  right: 0;
  left: 6.5rem;
  z-index: 10;
  input[type='text'] {
    flex: 1;
    height: 6rem;
    padding: 2.1rem 1.5rem;
    font-size: 1.6rem;
    color: #fff;
    background: none;
    border: 0;
    outline: 0;
  }
  button {
    display: flex;
    align-items: center;
    padding: 0 1.5rem;
    background: none;
  }
}

.field {
  display: flex;
  background-color: var(--c-graphite);
}
</style>
