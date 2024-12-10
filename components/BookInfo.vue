<script setup lang="ts">
defineProps<{
  bookId: number
  title: string
  subtitle: string
  publicationDate?: number
  authors?: { name: string }[]
  pageCount?: number
  categories?: { name: string }[]
  coverpage?: string
}>()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const isUserLogged = computed(() => !!user.value)

const handleActionIfNotLoggedIn = () => {
  if (!isUserLogged) {
    navigateTo('/login')
  }
}
</script>
<template>
  <section class="book-info">
    <div class="book-info__title--principal">
      <h1>INFORMACIÓN</h1>
    </div>

    <section class="book-info__container">
      <div class="book-info__actions">
        <div class="book-info__img">
          <NuxtImg :src="coverpage" class="book-info__coverpage" />
        </div>
        <div class="book-info__methods">
          <ReadingStatusSelect
            @click="handleActionIfNotLoggedIn"
            :bookId="$props.bookId"
          />
          <StarRating
            @click="handleActionIfNotLoggedIn"
            :bookId="$props.bookId"
            class="book-info__stars"
          />
        </div>
      </div>

      <div class="book-info__content">
        <h1 class="book-info__title">{{ title }}</h1>
        <p class="book-info__subtitle">{{ subtitle }}</p>
        <section class="book-info__data">
          <ul class="book-info__ul">
            <li class="book-info__li">
              <p class="book-info__label"><strong>Año de publicación</strong></p>
              <p class="book-info__value">{{ publicationDate }}</p>
            </li>
            <li class="book-info__li">
              <p class="book-info__label"><strong>Autores</strong></p>
              <span
                class="book-info__value"
                v-for="(author, index) in authors"
                :key="index"
              >
                {{ author.name }}<span v-if="index < authors.length - 1">, </span>
              </span>
            </li>
            <li class="book-info__li">
              <p class="book-info__label"><strong>Número de páginas</strong></p>
              <p class="book-info__value">{{ pageCount }}</p>
            </li>

            <li class="book-info__li">
              <p class="book-info__label"><strong>Categoría</strong></p>
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
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__header {
    text-align: center;
    position: relative;
    &-title {
      display: inline-block;
      font-size: 2.4rem;
      margin-bottom: 1rem;
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
    gap: 2rem;
    color: var(--c-white);
    @include responsive() {
      flex-direction: column;
      align-items: center;
    }
  }
  &__actions {
    width: 50rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5rem 0;
  }
  &__img {
    min-width: 20rem;
    display: flex;
    justify-content: center;
  }
  &__methods {
    width: 100%;
    padding: 1rem 0;
  }
  &__stars {
    display: flex;
    justify-content: center;
  }
  &__coverpage {
    width: 19rem;
    object-fit: cover;
    @include responsive() {
      height: 16rem;
      width: auto;
      margin-bottom: 1rem;
    }
  }
  &__content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    @include responsive() {
      text-align: center;
    }
  }
  &__ul {
    display: flex;
    flex-wrap: wrap;
  }
  &__li {
    width: 50%;
    padding: 1rem;
  }
  &__label {
    max-width: 10rem;
  }
  &__subtitle {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: var(--c-light-gray);
  }
  &__details {
    &-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    &-item {
      display: flex;
      gap: 0.5rem;
      &-label {
        width: 8rem;
        font-weight: bold;
        color: var(--c-light-gray);
        @include responsive() {
          width: auto;
          flex: 1;
        }
      }
      &-value {
        flex: 2;
        color: var(--c-white);
        font-size: 1rem;
        span:not(:last-child)::after {
          content: ', ';
        }
      }
    }
  }
}
</style>
