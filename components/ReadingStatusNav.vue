<script setup>
import { ref } from 'vue'

const options = ref([
  {
    id: 1,
    name: 'LEÍDOS',
    title: 'Información 1',
    description: 'Descripción de la opción 1.',
  },
  {
    id: 2,
    name: 'EN PROGRESO',
    title: 'Información 2',
    description: 'Descripción de la opción 2.',
  },
  {
    id: 3,
    name: 'POR LEER',
    title: 'Información 3',
    description: 'Descripción de la opción 3.',
  },
])

const selectedOption = ref(options.value[0].id)
const info = ref(options.value[0])
const selectOption = (id) => {
  selectedOption.value = id
  info.value = options.value.find((option) => option.id === id) || null
}
</script>

<template>
  <div class="info-navigator">
    <div class="buttons">
      <button
        v-for="option in options"
        :key="option.id"
        :class="{ active: selectedOption === option.id }"
        @click="selectOption(option.id)"
      >
        {{ option.name }}
      </button>
    </div>

    <div v-if="info" class="info-box">
      <h2>{{ info.title }}</h2>
      <p>{{ info.description }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.info-navigator {
  margin: 0 auto;
  text-align: center;
  background-color: var(--c-graphite);
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 0.625rem;
  margin-bottom: 1.25rem;
  padding: 2.2rem 0 2.2rem;
}

button {
  margin: 0 3rem;
  padding: 0 0 0.5rem;
  font-size: 1.2rem;
  color: var(--c-grey-medium);
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;
}

button:hover {
  color: var(--c-white);
}

button.active {
  position: relative;
  text-decoration: none;
  color: var(--c-white);
  border-bottom: 0.2rem solid white;
  &::after {
    content: '';
    position: absolute;
    bottom: -0.125rem;
    left: 0;
    width: 0;
    height: 0.125rem;
    background-color: var(--c-white);
    transition: width 0.3s ease;
  }
}

.info-box {
  border: 0.0625rem solid #ddd;
  padding: 1.25rem;
  border-radius: 0.3125rem;
  background-color: #f9f9f9;
  margin-top: 0.625rem;
}

.info-box h2 {
  margin: 0 0 0.625rem;
}

.info-box p {
  margin: 0;
}
</style>
