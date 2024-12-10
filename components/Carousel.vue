<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/scrollbar'
import 'swiper/css/navigation'
import { Keyboard, Scrollbar, Navigation } from 'swiper/modules'

import Card from '@/components/Card.vue'
import type { Book } from '@/interfaces'

const modules = [Keyboard, Navigation]

defineProps<{
  books: Book[]
}>()
</script>

<template>
  <section class="carousel">
    <Swiper
      class="slider-banner"
      :slidesPerView="1"
      :slidesPerGroup="1"
      :centeredSlides="false"
      :grabCursor="true"
      :keyboard="{ enabled: true }"
      :breakpoints="{
        640: { slidesPerView: 1, slidesPerGroup: 1 },
        768: { slidesPerView: 2, slidesPerGroup: 2 },
        1024: { slidesPerView: 3, slidesPerGroup: 3 },
        1280: { slidesPerView: 4, slidesPerGroup: 4 },
      }"
      :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }"
      :modules="modules"
    >
      <SwiperSlide v-for="(book, index) in books" :key="index">
        <Card
          :coverpage="book.coverpage"
          :book_id="book.book_id"
          :title="book.title"
          :slug="book.slug"
        />
      </SwiperSlide>

      <div class="swiper-button-next" aria-label="Next slide"></div>
      <div class="swiper-button-prev" aria-label="Previous slide"></div>
    </Swiper>
  </section>
</template>

<style scoped lang="scss">
.carousel {
  height: 32rem;
  background-color: var(--c-graphite);
  margin: 0 5rem;
  @include responsive() {
    padding: 1rem var(--s-padding-lateral-mobile);
    margin: 0 2rem;
  }
}

.swiper-button-next,
.swiper-button-prev {
  display: flex;
  width: 2.5em;
  height: 100%;
  top: -2rem;
  &::after {
    font-size: 2em;
    font-weight: 1000;
    color: var(--c-white);
  }
  &:hover {
    background: rgba(0, 0, 0, 0.2);
    color: var(--c-white);
    transition:
      opacity 0.5s ease,
      background-color 0.5s ease;
  }
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.swiper-slide img {
  display: block;
  width: 10rem;
}

.book-image {
  width: 100%;
}

@media only screen and (min-width: 48.0625rem) {
  .swiper-slide:first-child {
    transition: transform 1s;
  }
  .swiper-slide:first-child img {
    transition: box-shadow 5s;
  }
  .swiper-slide.swiper-slide-active:first-child img {
    box-shadow: 0rem 2rem 5rem rgba(0, 0, 0, 0.35);
  }
  .swiper-slide:nth-child(2) {
    transition: transform 1s;
  }
}
</style>
