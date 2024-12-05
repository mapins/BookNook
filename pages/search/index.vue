<script setup lang="ts">
import BookSearch from '@/components/global/search/BookSearch.vue'
definePageMeta({
  layout: 'no-footer',
})
</script>
<template>
  <transition name="slidedown">
    <BookSearch />
  </transition>
</template>
