<script setup></script>
<template>
  <section class="nav-link">
    <ul class="nav-link__ul">
      <li class="nav-link__li">
        <NuxtLink href="#"><SvgHome class="nav-link__icon" /></NuxtLink>
      </li>
      <li class="nav-link__li">
        <NuxtLink to="#"> <SvgBook class="nav-link__icon" /></NuxtLink>
      </li>
      <li class="nav-link__li">
        <NuxtLink to="#"> <SvgCompass class="nav-link__icon" /></NuxtLink>
      </li>
      <li class="nav-link__li">
        <NuxtLink to="#"> <SvgStar class="nav-link__icon" /></NuxtLink>
      </li>
      <li class="nav-link__li">
        <NuxtLink to="#"> <SvgLens class="nav-link__icon" /> </NuxtLink>
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
    svg {
      fill: var(--c-primary);
    }
    &:hover {
      fill: var(--c-primary);
      transform: scale(1.1);
      stroke: var(--c-primary);
    }
  }
}
</style>
