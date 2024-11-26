<script setup>
import Listing from '~/components/Listing.vue'
import { useFilterBooks } from '~/composables/useFilterBooks'
import { getBooks } from '~/services/bookService'
import Cross from '~/components/svg/Cross.vue'
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
        <Cross />
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
