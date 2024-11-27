<script setup lang="ts">
import BookSearch from '~/components/global/search/BookSearch.vue'
</script>
<template>
  <transition name="slidedown">
    <BookSearch />
  </transition>
</template>
