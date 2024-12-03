import type { currentUserBook, ReadingStatus } from '~/interfaces/readingStatus'
import { useCacheStore } from '~/stores/cache'

const BASE_URL = 'https://booknookapi-production.up.railway.app/reading-status'

export const readingStatusService = {
  async saveStatus(readingStatus: ReadingStatus) {
    try {
      const response = await fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(readingStatus),
      })
      if (!response.ok) {
        throw new Error('Error saving reading status')
      }

      const savedData = await response.json()

      const cacheStore = useCacheStore()

      const cacheKey = `user-${readingStatus.user_id}-book-${readingStatus.book_id}-readingStatus`
      cacheStore.clearCache(cacheKey)
      cacheStore.setCache(cacheKey, savedData)

      return savedData
    } catch (error) {
      console.error('Error saving reading status:', error)
      throw error
    }
  },

  async deleteStatus(currentUserBook: currentUserBook) {
    try {
      const response = await fetch(
        `${BASE_URL}/${currentUserBook.user_id}/${currentUserBook.book_id}`,
        {
          method: 'DELETE',
        },
      )

      if (!response.ok) {
        throw new Error('Error deleting status')
      }

      const data = await response.json()

      const cacheStore = useCacheStore()

      const cacheKey = `user-${currentUserBook.user_id}-book-${currentUserBook.book_id}-readingStatus`
      cacheStore.clearCache(cacheKey)
      cacheStore.setCache(cacheKey, data)

      return data
    } catch (error) {
      console.error('Error deleting status:', error)
      throw error
    }
  },

  async getBookByStatus(currentUserBook: currentUserBook) {
    const authStore = useAuthStore()

    const userId = authStore.userId
    if (!userId) {
      throw new Error('Usuario no autenticado')
    }
    const cacheStore = useCacheStore()
    const cacheKey = `user-${currentUserBook.user_id}-book-${currentUserBook.book_id}-readingStatus`

    const cachedData = cacheStore.getCache(cacheKey)

    if (cachedData) {
      console.log(
        `Estado del libro con ID ${currentUserBook.book_id} obtenidos del caché`,
      )
      return cachedData
    }

    try {
      const response = await fetch(
        `${BASE_URL}/user/${currentUserBook.user_id}/book/${currentUserBook.book_id}/status`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      if (!response.ok) {
        throw new Error('Error when searching for the users books with his status:')
      }

      const data = response.json()

      cacheStore.setCache(cacheKey, data)
      return data
    } catch (error) {
      console.error('Error when searching for the users books with his status:', error)
      throw error
    }
  },
}
