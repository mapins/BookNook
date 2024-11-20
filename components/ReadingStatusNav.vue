<script lang="ts" setup>
import { ref } from 'vue'
import type { BooksStatusByUser } from '~/interfaces/readingStatus'
import { readingStatusService } from '~/services/readingStatusService'
import { useAuthStore } from '@/stores/auth'

const { userId } = useAuthStore()

const books = ref([])
const selectedStatus = ref<'read' | 'reading' | 'desired'>('read')

const getBooksByStatus = async (status: 'read' | 'reading' | 'desired') => {
  selectedStatus.value = status
  const statusData: BooksStatusByUser = {
    user_id: userId,
    status,
  }
  try {
    const fetchedBooks = await readingStatusService.getBooksByStatus(statusData)
    books.value = fetchedBooks || []
  } catch (error) {
    console.error('Error getting status books:', error)
  }
}

getBooksByStatus(selectedStatus.value)
</script>

<template>
  <div class="info-navigator">
    <div class="buttons">
      <button
        v-for="(status, index) in ['read', 'reading', 'desired']"
        :key="index"
        :class="{ active: selectedStatus === status }"
        @click="getBooksByStatus(status as 'read' | 'reading' | 'desired')"
      >
        {{
          status === 'read' ? 'LEÍDOS' : status === 'reading' ? 'EN PROGRESO' : 'POR LEER'
        }}
      </button>
    </div>

    <Listing :books="books" />
  </div>
</template>

<style scoped lang="scss">
.info-navigator {
  margin: 0 auto;
  text-align: center;
  background-color: var(--c-graphite);
  color: var(--c-white);
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
  color: var(--c-white);
  border-bottom: 0.2rem solid var(--c-white);
}
</style>
