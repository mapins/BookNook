<script setup lang="ts">
import Carousel from '@/components/Carousel.vue'
import Loading from '@/components/svg/Loading.vue'
import HeroHome from '@/components/HeroHome.vue'
import type { Book } from '~/interfaces'
import type { Category } from '~/interfaces/category'
import { getBooks, getBooksByCategories } from '~/services/bookService'
import { getCategories } from '~/services/categoriesService'

const allBooks = ref<Book[]>([])
const categories = ref<Category[]>([])
const booksByCategory = ref<Record<number, Book[]>>({})
const isLoading = ref(true)

onMounted(async () => {
  try {
    allBooks.value = await getBooks()

    categories.value = await getCategories()
    for (const category of categories.value) {
      const books = await getBooksByCategories([category.category_id])
      booksByCategory.value[category.category_id] = books
    }
  } catch (error) {
    console.error('Error al obtener los libros:', error)
  } finally {
    isLoading.value = false
  }
})
</script>
<template>
  <main class="home">
    <HeroHome />
    <div v-if="isLoading" class="home__loading">
      <Loading />
    </div>
    <div v-else>
      <h3 v-if="allBooks.length" class="home__title">Todos los Libros</h3>
      <Carousel v-if="allBooks.length" :books="allBooks" />

      <div v-for="category in categories" :key="category.category_id">
        <h3 v-if="booksByCategory[category.category_id]?.length" class="home__title">
          {{ category.name }}
        </h3>
        <Carousel
          v-if="booksByCategory[category.category_id]?.length"
          :books="booksByCategory[category.category_id]"
        />
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
@import '/assets/styles/load.css';

.home {
  background-color: var(--c-graphite);
  animation: fadeInUp 1.5s ease-out;
  &__title {
    background-color: var(--c-graphite);
    color: var(--c-white);
    margin: 0 5rem;
    padding: 3rem 0 0 0;
  }
  &__loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20rem;
  }
}
</style>
