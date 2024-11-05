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
  @include flex($justify: space-around);
  position: sticky;
  top: 0;
  height: 8rem;
  max-width: 120rem;
  z-index: 10;
  padding: 0 var(--s-padding-lateral);
  color: rgb(42, 42, 42);
  &__logo {
    width: 10rem;
    height: 10rem;
  }
}
</style>
