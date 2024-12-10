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
      <NuxtImg :src="coverpage" class="card__img" />
      <h2 class="card__title">{{ title }}</h2>

      <div class="card__rating">
        <div class="card__stars"><StarRating :bookId="book_id" /></div>
      </div>
    </NuxtLink>
  </div>
</template>
<style scoped lang="scss">
.card {
  width: 17rem;
  height: 28rem;
  color: var(--c-white);
  padding: 1rem;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  box-shadow: rgba(0, 0, 0, 0.35);
  @include flex(column, $justify: space-between);
  &__link {
    @include flex(column, $gap: 0.5rem);
    text-decoration: none;
  }
  &__img {
    height: 21rem;
    width: 15rem;
    object-fit: fill;
    border-radius: 0.5rem;
    transition:
      transform 0.5s,
      box-shadow 0.5s;
    &:hover {
      transform: scale(1.05);
      box-shadow: 0rem 1rem 3rem rgba(0, 0, 0, 0.5);
    }
  }
  &__title {
    display: flex;
    flex-wrap: wrap;
    font-size: 1.2rem;
    text-align: center;
    margin: 0.5rem 0;
  }
  &__rating {
    margin-top: 0.5rem;
  }
}
</style>
