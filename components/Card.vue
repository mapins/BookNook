<script setup lang="ts">
defineProps<{
  book_id: number
  coverpage: string
  title: string
  slug: string
}>()
</script>

<template>
  <div class="card">
    <NuxtLink :to="{ path: `/book/${slug}` }" class="card__link">
      <div class="card__cover">
        <NuxtImg :src="coverpage" class="card__img" />
      </div>
    </NuxtLink>
    <h2 class="card__title">{{ title }}</h2>
    <div class="card__status">
      <ReadingStatusSelect :bookId="book_id" />
    </div>
    <div class="card__rating">
      <div class="card__stars">
        <StarRating :bookId="book_id" />
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import '/assets/styles/load.css';

.card {
  width: 16rem;
  height: 40rem;
  color: var(--c-white);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  box-shadow: rgba(0, 0, 0, 0.35);
  animation: fadeInUp 1.5s ease-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  @include responsive() {
    width: 14rem;
    height: 30rem;
  }
  &__cover {
    padding: 1rem;
    overflow: visible;
  }
  &__img {
    width: 17rem;
    height: 21rem;
    object-fit: fill;
    border-radius: 0.5rem;
    transition:
      transform 0.5s,
      box-shadow 0.5s;
    &:hover {
      transform: scale(1.05);
      box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.5);
    }
    @include responsive() {
      width: 12rem;
      height: 18rem;
    }
  }
  &__title {
    margin-top: 1rem;
    font-size: 1.3rem;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 85%;
    color: var(--c-white);
  }
  &__rating {
    margin-top: 0.5rem;
  }
  &__status {
    width: 12rem;
    margin-top: 1rem;
  }
}
</style>
