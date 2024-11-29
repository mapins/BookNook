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
  <form @submit.prevent class="search-form">
    <div class="search-form__content">
      <input
        v-model="searchTerm"
        id="search"
        name="search"
        type="text"
        placeholder="Search for a book..."
        class="search-form__input"
      />
      <button
        type="button"
        aria-label="Close"
        @click="handleElement"
        class="search-form__button"
      >
        <Cross />
      </button>
    </div>

    <div class="search-form__selected-categories">
      <span
        v-for="categoryId in selectedCategories"
        :key="categoryId"
        class="search-form__selected-category"
      >
        {{ categories.find((category) => category.category_id === categoryId)?.name }}
        <button
          type="button"
          @click="removeCategory(categoryId)"
          class="search-form__remove-category"
        >
          <Cross />
        </button>
      </span>
    </div>

    <div class="search-form__categories">
      <h3 class="search-form__categories-title">Choose categories</h3>
      <div class="search-form__category-options">
        <label
          v-for="category in categories"
          :key="category.category_id"
          class="search-form__category-option"
        >
          <input
            type="checkbox"
            :value="category.category_id"
            v-model="selectedCategories"
            class="search-form__category-option-input"
          />
          {{ category.name }}
        </label>
      </div>
    </div>

    <Listing :books="filteredBooks" class="search-form__listing" />
  </form>
</template>

<style lang="scss" scoped>
.search-form {
  color: white;
  position: fixed;
  top: 0;
  right: 0;
  left: 6.5rem;
  z-index: 10;
}

.search-form__field {
  display: flex;
  background-color: var(--c-graphite);
}

.search-form__input {
  flex: 1;
  height: 6rem;
  padding: 2.1rem 1.5rem;
  font-size: 1.6rem;
  color: #fff;
  background: none;
  border: 0;
  outline: 0;
}

.search-form__button {
  display: flex;
  align-items: center;
  background: none;
}

.search-form__selected-categories {
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.search-form__selected-category {
  display: flex;
  align-items: center;
  background-color: var(--c-primary);
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  border-radius: 1rem;
  color: white;
}

.search-form__remove-category {
  padding: 0 0 0 1rem;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

.search-form__categories {
  color: #fff;
  margin-top: 1.5rem;
}

.search-form__categories-title {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.search-form__category-options {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.search-form__category-option {
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
}

.search-form__category-option-input {
  margin-right: 0.5rem;
  accent-color: var(--c-primary);
  width: 1.25rem;
  height: 1.25rem;
  border: 0.0625rem solid #fff;
  background-color: #fff;
}

.search-form__category-option input[type='checkbox']:checked {
  background-color: var(--c-primary);
  border-color: var(--c-primary);
}

.search-form__listing {
  margin-top: 2rem;
}
</style>
