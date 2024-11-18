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
    console.log(books.value)
  } catch (error) {
    console.error('Error al obtener los libros:', error)
  }
})
</script>
<template>
  <div class="home" v-if="!isShowing">
    <Hero
      title="Descubre, los mejores libros"
      subtitle="Todo tipos de libros a tu alcance, averigua sobre ellos"
      button-text="Crea tu cuenta"
      button-link="/register"
    />
    <Carousel :books />
  </div>
  <div v-else class="listing">
    <transition name="slidedown">
      <SearchForm />
    </transition>
  </div>
</template>
