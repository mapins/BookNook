<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/scrollbar'
import 'swiper/css/navigation'
import { Keyboard, Scrollbar, Navigation } from 'swiper/modules'

import Card from '@/components/Card.vue'
import { getBooks } from '~/services/bookService'

const modules = [Keyboard, Scrollbar, Navigation]

const books = ref([])

onMounted(async () => {
  try {
    const fetchedBooks = await getBooks()
    books.value = fetchedBooks
  } catch (error) {
    console.error('Error al obtener los libros:', error)
  }
})
</script>

<template>
  <Swiper
    class="slider-banner"
    :slidesPerGroupSkip="0"
    :slidesPerView="5"
    :centeredSlides="false"
    :grabCursor="true"
    :keyboard="{ enabled: true }"
    :breakpoints="{
      '769': { slidesPerView: 5, slidesPerGroup: 5 },
    }"
    :scrollbar="true"
    :navigation="{
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }"
    :modules="modules"
  >
    <SwiperSlide v-for="(book, index) in books" :key="index">
      <Card :coverpage="book.coverpage" :book_id="book.book_id" :title="book.title" />
    </SwiperSlide>

    <div class="swiper-button-next" aria-label="Next slide"></div>
    <div class="swiper-button-prev" aria-label="Previous slide"></div>
  </Swiper>
</template>

<style scoped lang="scss">
.swiper-button-next,
.swiper-button-prev {
  display: flex;
  padding: 1em;
  width: 2.5em;
  height: 100%;
  top: 1rem;
  &::after {
    font-size: 2em;
    font-weight: 1000;
    color: var(--c-white);
  }
  &:hover {
    background: rgba(0, 0, 0, 0.5);
    color: var(--c-white);
    transition:
      opacity 0.25s ease,
      background-color 0.25s ease;
  }
}

.swiper {
  width: 85vw;
  height: auto;
}

.swiper-slide {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 10rem;
}

.swiper-slide img {
  display: block;
  width: 10rem;
  height: 20rem;
}

.book-image {
  width: 100%;
  height: 15rem;
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
