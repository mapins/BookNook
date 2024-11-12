<script lang="ts" setup>
defineProps<{
  book_id: String
  coverpage: String
  title: String
}>()
</script>

<template>
  <div class="card">
    <NuxtLink :to="{ path: `/book/${book_id}` }" class="card__link">
      <NuxtImg :src="coverpage" class="card__img" />
      <h2 class="card__title">{{ title }}</h2>

      <div class="card__rating">
        <div class="card__stars"></div>
      </div>
    </NuxtLink>
  </div>
</template>
<style scoped lang="scss">
.card {
  color: var(--c-white);
  &__img {
    height: 15rem;
    object-fit: contain;
    box-shadow: 0rem 2rem 5rem rgba(0, 0, 0, 0.35);
  }
  &__title {
    font-size: 1rem;
    text-align: center;
  }
}
</style>
