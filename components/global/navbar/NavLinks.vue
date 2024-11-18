<script setup>
const { handleElement } = useElementStore()
</script>
<template>
  <section class="nav-link">
    <ul class="nav-link__ul">
      <li class="nav-link__li">
        <NuxtLink href="/"><SvgHome class="nav-link__icon" /></NuxtLink>
      </li>
      <li class="nav-link__li">
        <NuxtLink to="/my-books"> <SvgBook class="nav-link__icon" /></NuxtLink>
      </li>
      <li class="nav-link__li">
        <NuxtLink to="#"> <SvgCompass class="nav-link__icon" /></NuxtLink>
      </li>
      <li class="nav-link__li">
        <NuxtLink to="#"> <SvgStar class="nav-link__icon" /></NuxtLink>
      </li>
      <li class="nav-link__li">
        <NuxtLink to="" @click="handleElement">
          <SvgLens class="nav-link__icon" />
        </NuxtLink>
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
    @include flex(column, $gap: 8em);
    @include responsive() {
      width: 100%;
      @include flex(column, flex-start, $gap: 8em);
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
