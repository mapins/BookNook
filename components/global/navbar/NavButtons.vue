<script setup lang="ts">
import MainButton from '@/components/ui/buttons/MainButton.vue'
</script>
<template>
  <section class="nav-buttons">
    <MainButton
      bg-color="var(--c-primary)"
      padding="0.2em 1em"
      color="var(--c-white)"
      font-size="0.9em"
      width="5rem"
      hover-color="var(--c-white)"
      to="/login"
    >
      Inicia Sesión
    </MainButton>
  </section>
</template>

<style lang="scss" scoped>
.nav-buttons {
  @include flex(column, $gap: 5rem);
}
</style>
