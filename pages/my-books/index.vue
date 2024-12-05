<script setup>
import ReadingStatusNav from '~/components/ReadingStatusNav.vue'
definePageMeta({
  layout: 'no-footer',
  middleware: 'auth',
})
</script>
<template>
  <ReadingStatusNav />
</template>
