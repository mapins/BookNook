<script setup lang="ts">
import Carousel from '@/components/Carousel.vue'
import Hero from '@/components/Hero.vue'
import { useElementStore } from '~/stores/search'

const { isShowing } = storeToRefs(useElementStore())
</script>
<template>
  <transition name="slidedown">
    <SearchForm v-if="isShowing" />
  </transition>
  <Hero
    title="Descubre, los mejores libros"
    subtitle="Todo tipos de libros a tu alcance, averigua sobre ellos"
    button-text="Crea tu cuenta"
    button-link="/register"
  />
  <Carousel />
</template>
