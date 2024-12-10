<script setup lang="ts">
import Carousel from '@/components/Carousel.vue'
import Hero from '@/components/Hero.vue'
import type { Book } from '~/interfaces'
import type { Category } from '~/interfaces/category'
import { getBooks, getBooksByCategories } from '~/services/bookService'
import { getCategories } from '~/services/categoriesService'

const allBooks = ref<Book[]>([])
const currentBookIndex = ref(0)
const categories = ref<Category[]>([])
const booksByCategory = ref<Record<number, Book[]>>({})

onMounted(async () => {
  try {
    allBooks.value = await getBooks()

    /* setInterval(() => {
      currentBookIndex.value = (currentBookIndex.value + 1) % allBooks.value.length
    }, 15000) */

    categories.value = await getCategories()
    for (const category of categories.value) {
      const books = await getBooksByCategories([category.category_id])
      booksByCategory.value[category.category_id] = books
    }
  } catch (error) {
    console.error('Error al obtener los libros:', error)
  }
})
</script>
<template>
  <main class="home">
    <!-- <Hero
      :title="allBooks[currentBookIndex].title"
      :authors="allBooks[currentBookIndex].author"
      :publicationDate="allBooks[currentBookIndex].publicationdate"
      :pageCount="allBooks[currentBookIndex].pagecount"
      :subtitle="allBooks[currentBookIndex].description"
      button-text="CREA TU CUENTA"
      button-link="/register"
    /> -->
    <h3 class="home__title">Todos los Libros</h3>
    <Carousel :books="allBooks" />

    <div v-for="category in categories" :key="category.category_id">
      <h3 class="home__title">{{ category.name }}</h3>
      <Carousel :books="booksByCategory[category.category_id]" />
    </div>
  </main>
</template>

<style scoped lang="scss">
.home {
  background-color: var(--c-graphite);
  &__title {
    background-color: var(--c-graphite);
    color: var(--c-white);
    margin: 0 5rem;
    padding: 3rem 0 0 0;
  }
}
</style>
