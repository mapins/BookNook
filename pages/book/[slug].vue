<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { getBookBySlug, getBookCategories } from '~/services/bookService'
import { ref, onMounted } from 'vue'
import BookInfo from '~/components/BookInfo.vue'
import type { Book } from '~/interfaces'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const route = useRoute()

const bookSlug = String(route.params.slug)

onMounted(() => {
  console.log()
})
const book = ref<Book>()
const categories = ref()

onMounted(async () => {
  try {
    const fetchedBook = await getBookBySlug(bookSlug)
    const bookCategories = await getBookCategories(fetchedBook.book_id)
    book.value = fetchedBook
    categories.value = bookCategories
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
      :categories="categories"
    />
    <ReadingStatusSelect @click="handleActionIfNotLoggedIn" :bookId="book.book_id" />
    <StarRating @click="handleActionIfNotLoggedIn" :bookId="book.book_id" class="stars" />
  </section>
</template>

<style lang="scss" scoped>
.book {
  color: white;
}

.stars {
  padding: var(--s-padding-lateral);
  @include responsive() {
    padding: 3rem var(--s-padding-lateral-mobile);
  }
}
</style>
