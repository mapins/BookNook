<script setup lang="ts">
defineProps<{
  books: object
}>()
</script>
<template>
  <div class="listing">
    <ul>
      <li v-for="(book, index) in books" :key="index">
        <Card :coverpage="book.coverpage" :book_id="book.book_id" :title="book.title" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.listing ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: scroll;
  height: 80vh;
  padding: 1rem;
}

.listing li {
  flex: 0 1 calc(25% - 1rem);
  list-style: none;
  display: flex;
}
</style>
