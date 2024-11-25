import type {
  BooksStatusByUser,
  currentUserBook,
  ReadingStatus,
} from '~/interfaces/readingStatus'
import { useCacheStore } from '~/stores/cache'

const BASE_URL = 'https://booknookapi-production.up.railway.app/reading-status'

export const readingStatusService = {
  async saveStatus(readingStatus: ReadingStatus) {
    console.log('ESTA GUARDANDO')
    console.log(JSON.stringify(readingStatus))
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

      const cacheKey = `book-${readingStatus.user_id}-user-${readingStatus.user_id}-status-${readingStatus.status}`
      cacheStore.clearCache(cacheKey)
      cacheStore.setCache(cacheKey, savedData)

      return savedData
    } catch (error) {
      console.error('Error saving reading status:', error)
      throw error
    }
  },

  async getBooksByStatus(booksStatusByUser: BooksStatusByUser) {
    console.log(booksStatusByUser)
    const cacheStore = useCacheStore()

    const cacheKey = `${booksStatusByUser.user_id}-${booksStatusByUser.status}`

    const cachedData = cacheStore.getCache(cacheKey)

    if (cachedData) {
      console.log('Datos obtenidos del cache')
      return cachedData
    }
    try {
      const response = await fetch(
        `${BASE_URL}/user/${booksStatusByUser.user_id}/status/${booksStatusByUser.status}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      if (!response.ok) {
        throw new Error('Error fetching books by status')
      }
      const data = await response.json()

      cacheStore.setCache(cacheKey, data)
      return data
    } catch (error) {
      console.error('Error fetching books by status:', error)
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
    const cacheKey = `book-${currentUserBook.user_id}-status-${currentUserBook.book_id}`

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
