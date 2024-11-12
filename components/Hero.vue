<script lang="ts" setup>
const props = defineProps<{
  title: string
  subtitle: string
  backgroundImage: string
  buttonText?: string
  buttonLink?: string
}>()
</script>

<template>
  <section class="hero">
    <div class="hero__content">
      <h1 class="hero__title">{{ title }}</h1>
      <p class="hero__subtitle">{{ subtitle }}</p>
      <NuxtLink v-if="buttonText" :to="buttonLink" class="hero__button">
        {{ buttonText }}
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60vh;
  padding: 2rem;
  color: var(--c-white);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(v-bind('backgroundImage'));
  text-align: center;
  &__content {
    max-width: 40rem;
  }
  &__title {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  &__subtitle {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
  }
  &__button {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    color: var(--c-white);
    background-color: var(--c-primary);
    border-radius: 0.5rem;
    text-decoration: none;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: var(--c-primary-dark);
    }
  }
  &__img {
    width: 15rem;
    height: 15rem;
  }
}
</style>
