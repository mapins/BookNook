<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { getBookById } from '~/services/bookService'
import { ref, onMounted } from 'vue'
import BookInfo from '~/components/BookInfo.vue'
import type { Book } from '~/interfaces'

const route = useRoute()
const bookId = Number(route.params.id)

// Initialize book with type Book or null
const book = ref<Book>()

onMounted(async () => {
  try {
    const fetchedBook = await getBookById(bookId)
    book.value = fetchedBook
    console.log(book.value)
  } catch (error) {
    console.error('Error al obtener los libros:', error)
  }
})
</script>

<template>
  <section v-if="book" class="book">
    <Hero
      :title="book.title"
      :authors="book.author"
      :publication-date="book.publicationdate"
      :subtitle="book.description"
    />

    <BookInfo
      :coverpage="book.coverpage"
      :title="book.title"
      :authors="book.author"
      :publication-date="book.publicationdate"
      :page-count="book.pagecount"
      :subtitle="book.description"
    />
  </section>
</template>

<style>
.book {
  color: white;
}
</style>
