<script setup>
import { useFilterBooks } from '~/composables/useFilterBooks'
import { getBooks } from '~/services/bookService'
import { useElementStore } from '@/stores/search'
const { handleElement, closeElement, isShowing } = useElementStore()
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
  console.log(books.value)
  searchBook(newTerm, books.value)
  console.log(filteredBooks.value)
})

const handleOutsideClick = () => {
  alert('hola cerda')
}
</script>
<template>
  <form @submit.prevent>
    <div class="field">
      <input
        v-outside-click="handleOutsideClick"
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

    <div class="listing">
      <ul>
        <li v-for="(book, index) in filteredBooks" :key="index">
          <Card :coverpage="book.coverpage" :book_id="book.book_id" :title="book.title" />
        </li>
      </ul>
    </div>
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

.listing ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: scroll;
  height: 80vh;
  padding: 1rem;
}

.listing li {
  flex: 0 1 calc(25% - 1rem); /* Cada libro ocupa un 25% del espacio, ajustable según lo que necesites */
  list-style: none;
  display: flex;
}
</style>
