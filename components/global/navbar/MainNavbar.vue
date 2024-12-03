<script setup lang="ts">
import NavLinks from '@/components/global/navbar/NavLinks.vue'
</script>
<template>
  <nav class="nav">
    <NavLinks />
  </nav>
</template>

<style lang="scss" scoped>
.nav {
  position: fixed;
  left: 0;
  z-index: 5;
  height: 100%;
  width: 4.5rem;
  background-color: var(--c-black);
  @include responsive() {
    position: fixed;
    bottom: 0;
    z-index: 12;
    height: 4.5rem;
    background-color: var(--c-black);
    display: flex;
    justify-content: center;
    width: 100%;
  }
}
</style>
