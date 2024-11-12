<script setup lang="ts">
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/scrollbar'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Import required modules
import { Keyboard, Scrollbar, Navigation, Pagination } from 'swiper/modules'
import { getBooks } from '~/services/bookService'

const modules = [Keyboard, Scrollbar, Navigation, Pagination]

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
    :pagination="{ clickable: true }"
    :modules="modules"
  >
    <SwiperSlide v-for="(book, index) in books" :key="index">
      <img :src="book.coverpage" class="book-image" />
    </SwiperSlide>

    <div class="swiper-button-next" aria-label="Next slide"></div>
    <div class="swiper-button-prev" aria-label="Previous slide"></div>
  </Swiper>
</template>

<style scoped lang="scss">
.slider-banner {
  height: 25rem;
  --swiper-pagination-color: var(--c-primary);
  --swiper-pagination-bullet-inactive-color: #999999;
  --swiper-pagination-bullet-inactive-opacity: 1;
  --swiper-pagination-bullet-size: 1rem;
  --swiper-pagination-bullet-horizontal-gap: 0.375rem;
  --swiper-button-next-disabled-display: none;
}

.swiper-button-next,
.swiper-button-prev {
  display: flex;
  padding: 1em;
  width: 2.5em;
  height: 2.5em;
  &::after {
    font-size: 2em;
    font-weight: 1000;
    color: var(--c-primary);
  }
  &:hover {
    background-color: var(--c-grey-light);
    color: var(--c-white);
  }
}

.swiper {
  width: 85vw;
  height: 35vh;
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
  object-fit: contain;
  max-height: 100%;
}

.book-image {
  width: 100%;
  height: 15rem;
}

@media only screen and (min-width: 48.0625rem) {
  .swiper-slide:first-child {
    transition: transform 100ms;
  }
  .swiper-slide:first-child img {
    transition: box-shadow 500ms;
  }
  .swiper-slide.swiper-slide-active:first-child img {
    box-shadow: 0rem 2rem 5rem rgba(0, 0, 0, 0.35);
  }
  .swiper-slide:nth-child(2) {
    transition: transform 100ms;
  }
}
</style>
