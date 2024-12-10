<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { readingStatusService } from '../services/readingStatusService'
import type { ReadingStatus } from '~/interfaces/readingStatus'
import { useAuthStore } from '@/stores/auth'

import { useAuthCheck } from '@/composables/useAuthCheck'

const { handleActionIfNotLoggedIn } = useAuthCheck()

const props = defineProps<{
  bookId: number
}>()

const authStore = useAuthStore()
const { userId } = storeToRefs(authStore)

const bookReadingStatus = ref<ReadingStatus | null>({
  book_id: props.bookId,
  user_id: null,
  status: null,
})
onMounted(async () => {
  if (userId.value && !isNaN(props.bookId)) {
    try {
      const status = await readingStatusService.getBookByStatus({
        book_id: props.bookId,
        user_id: userId.value,
      })
      bookReadingStatus.value = {
        book_id: props.bookId,
        user_id: userId.value,
        status: status?.status || null,
      }
    } catch (error) {
      console.error('Error fetching reading status:', error)
    }
  }
})

const saveStatus = async () => {
  if (userId.value && bookReadingStatus.value?.status !== null) {
    try {
      await readingStatusService.saveStatus(bookReadingStatus.value)
      await alertService.successSaveStatus()
    } catch (error) {
      console.error('Error saving status:', error)
    }
  }
}
const deleteStatus = async () => {
  if (userId.value) {
    try {
      await readingStatusService.deleteStatus({
        user_id: userId.value,
        book_id: props.bookId,
      })
      await alertService.successRemoveStatus()

      if (bookReadingStatus.value) bookReadingStatus.value.status = null
    } catch (error) {
      console.error('Error deleting status:', error)
    }
  }
}

async function changeStatus(status: any) {
  if (!userId.value) return
  if (status !== 'not_found') {
    await saveStatus()
  } else {
    await deleteStatus()
  }
}
</script>
<template>
  <div class="reading-status" @click="handleActionIfNotLoggedIn">
    <form class="reading-status__form">
      <div class="reading-status__form-group">
        <label for="status" class="reading-status__label">Estado:</label>
        <select
          v-model="bookReadingStatus.status"
          @change="changeStatus(bookReadingStatus?.status)"
          class="reading-status__select"
        >
          <option value="not_found"></option>
          <option value="read">Leído</option>
          <option value="reading">En progreso</option>
          <option value="desired">Por leer</option>
        </select>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.reading-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  max-width: 30rem;
  @include responsive() {
    padding: 0 1rem;
    max-width: 90%;
  }
  &__form {
    &-group {
      display: flex;
      flex-direction: row;
      gap: 0.5rem;
      width: 100%;
      position: relative;
      &::after {
        content: '▼';
        position: absolute;
        top: 50%;
        right: 0.75rem;
        transform: translateY(-50%);
        pointer-events: none;
        font-size: 0.75rem;
        color: var(--c-white);
      }
    }
  }
  &__label {
    font-size: 1rem;
    font-weight: 500;
    color: var(--c-white);
    margin: auto;
  }
  &__select {
    width: 7rem;
    padding: 0.75rem;
    padding-right: 2rem;
    border: 0.0625rem solid var(--c-white);
    border-radius: 0.5rem;
    font-size: 1rem;
    color: var(--c-white);
    background-color: var(--c-graphite-dark);
    appearance: none;
    background-image: none;
    transition: border-color 0.3s ease;
    &:focus {
      border-color: var(--c-white);
      outline: none;
    }
  }
  &__button {
    padding: 0.75rem;
    border: none;
    border-radius: 0.5rem;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &--submit {
      background-color: var(--c-graphite);
      color: white;
      margin-top: 1rem;
    }
    &--delete {
      background-color: var(--c-graphite);
      color: white;
      margin-top: 1rem;
    }
  }
}
</style>
