<script setup lang="ts">
import Carousel from '@/components/Carousel.vue'
import Hero from '@/components/Hero.vue'
</script>
<template>
  <Hero
    title="Descubre, los mejores libros"
    subtitle="Todo tipos de libros a tu alcance, averigua sobre ellos"
    button-text="Crea tu cuenta"
    button-link="/register"
  />
  <Carousel />
</template>
