<script setup lang="ts">
import Carousel from '@/components/Carousel.vue'
import Hero from '@/components/Hero.vue'
import { useElementStore } from '~/stores/search'
import { getBooks } from '~/services/bookService'

const { isShowing } = storeToRefs(useElementStore())

const books = ref([])

onMounted(async () => {
  try {
    const fetchedBooks = await getBooks()
    books.value = fetchedBooks || []
  } catch (error) {
    console.error('Error al obtener los libros:', error)
  }
})
</script>
<template>
  <main class="main">
    <Hero
      title="Descubre, los mejores libros"
      subtitle="Todo tipos de libros a tu alcance, averigua sobre ellos"
      button-text="CREA TU CUENTA"
      button-link="/register"
    />
    <Carousel :books />
  </main>
</template>
