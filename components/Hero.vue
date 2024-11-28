<script lang="ts" setup>
defineProps<{
  title: string
  authors?: { name: string }[]
  publicationDate?: number
  pageCount?: number
  subtitle: string
  backgroundImage?: string
  buttonText?: string
  buttonLink?: string
}>()
</script>

<template>
  <section class="hero">
    <div class="hero__content">
      <h1 class="hero__title">{{ title }}</h1>
      <section class="info">
        <span v-if="authors && authors.length > 0">
          <span v-for="(author, index) in authors" :key="index">
            {{ author.name }}<span v-if="index < authors.length - 1">, </span>
          </span>
        </span>
        <span v-else>No hay autores disponibles</span>
        <p>{{ publicationDate }}</p>
        <p>{{ pageCount }}</p>
      </section>
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
  justify-content: flex-start;
  padding: 5rem;
  height: 60vh;
  color: var(--c-white);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
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
