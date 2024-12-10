<script setup lang="ts">
import { useAuthCheck } from '@/composables/useAuthCheck'

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
const { handleActionIfNotLoggedIn } = useAuthCheck()
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
  display: flex;
  flex-direction: column;
  align-items: center;
  @include responsive() {
    padding: 2rem var(--s-padding-lateral-mobile);
  }
  &__title--principal {
    text-align: center;
    font-size: 2.5rem;
    color: var(--c-white);
    margin-bottom: 1rem;
    @include responsive() {
      font-size: 2rem;
    }
  }
  &__container {
    display: flex;
    align-items: flex-start;
    gap: 2rem;
    width: 100%;
    max-width: 75rem;
    color: var(--c-white);
    @include responsive() {
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }
  }
  &__actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 40%;
    @include responsive() {
      width: 100%;
      align-items: center;
    }
  }
  &__img {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
  }
  &__coverpage {
    width: 100%;
    max-width: 18rem;
    object-fit: cover;
    border-radius: 0.5rem;
    @include responsive() {
      max-width: 16rem;
      height: auto;
    }
  }
  &__methods {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }
  &__stars {
    display: flex;
    justify-content: center;
  }
  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    @include responsive() {
      text-align: center;
      width: 100%;
    }
  }
  &__ul {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 0;
    margin: 0;
    list-style: none;
    @include responsive() {
      flex-direction: column;
    }
  }
  &__li {
    width: calc(50% - 1rem);
    @include responsive() {
      width: 100%;
    }
  }
  &__label {
    font-weight: bold;
    color: var(--c-light-gray);
  }
  &__subtitle {
    font-size: 1.25rem;
    color: var(--c-light-gray);
    margin-bottom: 1rem;
    @include responsive() {
      font-size: 1.1rem;
    }
  }
}
</style>
