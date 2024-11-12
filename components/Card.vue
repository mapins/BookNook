<script lang="ts" setup>
import { NuxtLink } from '#build/components'

defineProps({
  book_id: String,
  coverpage: String,
  title: String,
  rating: Number,
})
</script>

<template>
  <div class="card">
    <NuxtLink :to="{ path: `/book/${book_id}` }" class="card__link">
      <div class="card__img">
        <NuxtImg :src="coverpage" />
      </div>

      <h2 class="card__name">{{ title }}</h2>

      <div class="card__rating">
        <div class="card__stars">
          <NuxtImg src="@/assets/images/stars.png" />
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
