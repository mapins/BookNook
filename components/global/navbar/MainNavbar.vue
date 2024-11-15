<script setup lang="ts">
import NavLinks from '@/components/global/navbar/NavLinks.vue'
import NavButtons from '@/components/global/navbar/NavButtons.vue'
</script>
<template>
  <nav class="nav">
    <nav class="nav__logo">
      <a href="/"><img src="/assets/images/logo.png" alt="" /></a>
    </nav>

    <nav class="nav__links"><NavLinks /></nav>
    <nav class="nav__buttons"><NavButtons /></nav>
  </nav>
</template>

<style lang="scss" scoped>
.nav {
  @include flex(column, $justify: flex-start, $gap: 2rem);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  height: 100%;
  width: 6.5rem;
  background-color: #000;
  color: var(--c-white);
  border-right: 0.0625rem solid #202124;
  &__logo {
    width: 5rem;
    height: 5rem;
  }
}
</style>
