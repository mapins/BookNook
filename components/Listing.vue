<script setup lang="ts">
import type { Book } from '@/interfaces'

defineProps<{
  books: Book[]
}>()
</script>
<template>
  <div class="listing">
    <ul class="listing__list">
      <li v-for="(book, index) in books" :key="index" class="listing__item">
        <Card
          :coverpage="book.coverpage"
          :book_id="book.book_id"
          :title="book.title"
          :slug="book.slug"
        />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.listing {
  padding: 1rem;
  max-height: 80vh;
  overflow-y: auto;
  background-color: var(--c-graphite);
  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 0;
    margin: 0;
    list-style: none;
    overflow-y: auto;
  }
  &__item {
    flex: 1 1 100%;
    max-width: 100%;
    @media (min-width: 40rem) {
      flex: 1 1 calc(50% - 1rem);
      max-width: calc(50% - 1rem);
    }
    @media (min-width: 64rem) {
      flex: 1 1 calc(25% - 1rem);
      max-width: calc(25% - 1rem);
    }

    display: flex;
    justify-content: center;
    padding: 1rem;
  }
}
</style>
