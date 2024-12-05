<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
  publicationDate?: number
  authors?: { name: string }[]
  pageCount?: number
  categories?: string
  coverpage?: string
}>()
</script>
<template>
  <section class="book-info">
    <div class="book-info__title--principal">
      <h1>INFORMACIÓN</h1>
    </div>

    <section class="book-info__container">
      <NuxtImg :src="coverpage" class="book-info__coverpage" />

      <div class="book-info__content">
        <h1 class="book-info__title">{{ title }}</h1>
        <p class="book-info__subtitle">{{ subtitle }}</p>
        <section class="info">
          <ul class="book-info__ul">
            <li class="book-info__li">
              <p class="book-info__label">Año de publicación</p>
              <p class="book-info__value">{{ publicationDate }}</p>
            </li>
            <li class="book-info__li">
              <p class="book-info__label">Autores</p>
              <span
                class="book-info__value"
                v-for="(author, index) in authors"
                :key="index"
              >
                {{ author.name }}<span v-if="index < authors.length - 1">, </span>
              </span>
            </li>
            <li class="book-info__li">
              <p class="book-info__label">Número de páginas</p>
              <p class="book-info__value">{{ pageCount }}</p>
            </li>

            <li class="book-info__li">
              <p class="book-info__label">Categoría</p>
              <span
                class="book-info__value"
                v-for="(categorie, index) in categories"
                :key="index"
              >
                {{ categorie.name }}<span v-if="index < categories.length - 1">, </span>
              </span>
            </li>
          </ul>
        </section>
      </div>
    </section>
  </section>
</template>

<style lang="scss" scoped>
.book-info {
  padding: var(--s-padding-lateral);
  background-color: var(--c-graphite);
  @include responsive() {
    padding: 3rem var(--s-padding-lateral-mobile);
  }
  &__title--principal {
    text-align: center;
    position: relative;
    h1 {
      display: inline-block;
    }
    &::after {
      content: '';
      display: block;
      width: 22%;
      height: 0.125rem;
      background-color: var(--c-white);
      margin: 0.5rem auto;
    }
  }
  &__container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: var(--c-white);
    @include responsive() {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
  &__content {
    @include responsive() {
      display: flex;
      justify-content: center;
    }
  }
  &__title {
    font-size: 2.4rem;
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
  &__coverpage {
    height: 18.3125rem;
    width: 12.1875rem;
    object-fit: contain;
    margin: 0 5rem 0 0;
    @include responsive() {
      margin: 0;
    }
  }
  &__li {
    display: flex;
    gap: 1rem;
    padding: 0.2rem 0;
  }
  &__label {
    width: 6.875rem;
  }
  &__value {
    flex: 2;
  }
}
</style>
