<script setup lang="ts">
import Searcher from '@/components/navbar/Searcher.vue'
import MainButton from '@/components/ui/buttons/MainButton.vue'
</script>
<template>
  <section class="nav-buttons">
    <Searcher />
    <MainButton
      bg-color="var(--c-primary)"
      padding="0.5em 1em"
      color="var(--c-black)"
      font-size="0.9em"
      width="11rem"
      hover-color="var(--c-black)"
    >
      Iniciar Sesión
    </MainButton>
  </section>
</template>

<style lang="scss" scoped>
.nav-buttons {
  @include flex($gap: 1rem);
}
</style>
