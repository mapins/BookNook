<script setup lang="ts">
import Listing from '~/components/Listing.vue'
import { getBooks, getBooksByCategories } from '~/services/bookService'
import Cross from '~/components/svg/Cross.vue'
import { getCategories } from '~/services/categoriesService'
import type { Book } from '~/interfaces'
import type { Category } from '~/interfaces/category'

const filteredBooks = ref<Book[]>([])
const books = ref<Book[]>([])
const isLoading = ref(false)
const searchTerm = ref('')
const selectedCategories = ref([])

const categories = (await getCategories()) as Category[]

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
watch([searchTerm, selectedCategories], () => {
  applyFilters()
})

const applyFilters = async () => {
  let filtered = [...books.value]

  if (selectedCategories.value.length > 0) {
    filtered = await getBooksByCategories(selectedCategories.value)
  }

  if (searchTerm.value) {
    filtered = filtered.filter((book) =>
      book.title.toLowerCase().startsWith(searchTerm.value.toLowerCase()),
    )
  }

  filteredBooks.value = filtered
}

async function handleElement() {
  searchTerm.value = ''
  selectedCategories.value = []
  books.value = await getBooks()
  applyFilters()
}

const removeCategory = (categoryId: number) => {
  selectedCategories.value = selectedCategories.value.filter((id) => id !== categoryId)
}
</script>

<template>
  <form @submit.prevent class="book-search">
    <div class="book-search__content">
      <input
        v-model="searchTerm"
        id="search"
        name="search"
        type="text"
        placeholder="Buscar un libro..."
        class="book-search__input"
      />
      <button
        type="button"
        aria-label="Close"
        @click="handleElement"
        class="book-search__button"
      >
        <Cross />
      </button>
    </div>

    <div class="book-search__categories">
      <h3 class="book-search__categories-title">Categorias</h3>
      <div class="book-search__category-options">
        <label
          v-for="category in categories"
          :key="category.category_id"
          class="book-search__category-option"
        >
          <input
            type="checkbox"
            :value="category.category_id"
            v-model="selectedCategories"
            class="book-search__category-option-input"
          />
          {{ category.name }}
        </label>
      </div>
    </div>
    <div class="book-search__selected-categories">
      <span
        v-for="categoryId in selectedCategories"
        :key="categoryId"
        class="book-search__selected-category"
      >
        {{ categories.find((category) => category.category_id === categoryId)?.name }}
        <button
          type="button"
          @click="removeCategory(categoryId)"
          class="book-search__remove-category"
        >
          <Cross />
        </button>
      </span>
    </div>

    <Listing :books="filteredBooks" class="book-search__listing" />
  </form>
</template>

<style lang="scss" scoped>
.book-search {
  display: flex;
  flex-direction: column;
  height: 100vh;
  color: white;
  position: fixed;
  z-index: 10;
  background-color: var(--c-graphite);
  padding: 2rem;
  box-shadow: 0 0.25rem 0.625rem rgba(0, 0, 0, 0.2);
  width: 93vw;
  @include responsive() {
    width: 100%;
  }
  &__content {
    display: flex;
    align-items: center;
    height: 4vh;
  }
  &__input {
    flex: 1;
    font-size: 1.3rem;
    color: #fff;
    background: none;
    border: 0;
    outline: 0;
    &:focus {
      border-color: var(--c-primary-hover);
      outline: none;
    }
  }
  &__button {
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
      background-color: var(--c-primary-hover);
    }
  }
  &__selected-categories {
    display: flex;
    flex-wrap: wrap;
    margin-top: 1rem;
  }
  &__selected-category {
    display: flex;
    align-items: center;
    background-color: var(--c-primary);
    padding: 0.5rem 1rem;
    margin-right: 1rem;
    margin-bottom: 1rem;
    border-radius: 1rem;
    color: white;
    transition: background-color 0.3s;
    &:hover {
      background-color: var(--c-primary-hover);
    }
  }
  &__remove-category {
    padding: 0 0 0 1rem;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
  }
  &__categories {
    margin-top: 1rem;
    height: 10vh;
    @include responsive() {
      margin-top: 0.5rem;
    }
  }
  &__categories-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    @include responsive() {
      font-size: 1.2rem;
    }
  }
  &__category-options {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    font-size: 1.2rem;
    @include responsive() {
      font-size: 0.8rem;
    }
  }
  &__category-option {
    display: flex;
    align-items: center;
    margin-bottom: 0.8rem;
    cursor: pointer;
    position: relative;
    &:hover {
      text-decoration: underline var(--c-white);
    }
  }
  &__category-option-input {
    margin-right: 0.5rem;
  }
  &__listing {
    margin-top: 2rem;
    border-top: 0.0625rem solid var(--c-grey-light);
    padding-top: 1rem;
  }
}
</style>
