<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { getBookById, getBookByTitle } from '~/services/bookService'
import { ref, onMounted } from 'vue'
import BookInfo from '~/components/BookInfo.vue'
import type { Book } from '~/interfaces'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const route = useRoute()

const bookTitle = String(route.params.title)

onMounted(() => {
  console.log()
})
const book = ref<Book>()

onMounted(async () => {
  try {
    const fetchedBook = await getBookByTitle(bookTitle)
    book.value = fetchedBook
    console.log(book.value)
  } catch (error) {
    console.error('Error al obtener los libros:', error)
  }
})

const handleActionIfNotLoggedIn = () => {
  if (!authStore.isLoggedIn) {
    navigateTo('/login')
  }
}
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
    <ReadingStatusSelect @click="handleActionIfNotLoggedIn" :bookId="book.book_id" />
    <StarRating @click="handleActionIfNotLoggedIn" :bookId="book.book_id" />
  </section>
</template>

<style>
.book {
  color: white;
}
</style>
