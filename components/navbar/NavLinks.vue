<script setup>
import Home from '../svg/Home.vue'
import Book from '../svg/Book.vue'
import Compass from '../svg/Compass.vue'
import Star from '../svg/Star.vue'
import Lens from '@/components/svg/Lens.vue'
</script>
<template>
  <section class="nav-link">
    <ul class="nav-link__ul">
      <li class="nav-link__li">
        <NuxtLink href="#"><Home class="nav-link__icon" /></NuxtLink>
      </li>
      <li class="nav-link__li">
        <NuxtLink to="#"> <Book class="nav-link__icon" /></NuxtLink>
      </li>
      <li class="nav-link__li">
        <NuxtLink to="#"> <Compass class="nav-link__icon" /></NuxtLink>
      </li>
      <li class="nav-link__li">
        <NuxtLink to="#"> <Star class="nav-link__icon" /></NuxtLink>
      </li>
      <li class="nav-link__li">
        <NuxtLink to="#"> <Lens class="nav-link__icon" /> </NuxtLink>
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
.nav-link {
  @include responsive() {
    width: 100%;
    margin: 0;
  }
  &__ul {
    @include flex(column, $gap: 5em);
    @include responsive() {
      width: 100%;
      @include flex(column, flex-start);
      margin: 0;
    }
  }
  &__li {
    max-height: 4em;
  }
  &__a {
    @include flex();
  }
  &__icon {
    transition:
      fill 0.3s ease,
      transform 0.3s ease;
    &:hover {
      fill: var(--c-primary);
      transform: scale(1.1);
      stroke: var(--c-primary);
    }
  }
}
</style>
