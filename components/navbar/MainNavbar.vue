<script setup lang="ts">
import NavLinks from '@/components/navbar/NavLinks.vue'
import NavButtons from '@/components/navbar/NavButtons.vue'
</script>
<template>
  <header class="nav">
    <nav class="nav__logo">
      <a href="/"><img src="/assets/images/logo.png" alt="" /></a>
    </nav>

    <nav class="nav__links"><NavLinks /></nav>
    <nav class="nav__buttons"><NavButtons /></nav>
  </header>
</template>

<style lang="scss" scoped>
.nav {
  /* @include flex($justify: space-around);
  position: sticky;
  top: 0;
  height: 8rem;
  max-width: 120rem;
  z-index: 10;
  padding: 0 var(--s-padding-lateral); */
  @include flex(column, $justify: flex-start, $gap: 5em);

  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  height: 100%;
  width: 10rem;
  background-color: #000;
  color: var(--c-white);
  border-right: 0.0625rem solid #202124;
  &__logo {
    width: 8rem;
    height: 8rem;
  }
}
</style>
