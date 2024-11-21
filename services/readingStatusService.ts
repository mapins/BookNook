import type { BooksStatusByUser, ReadingStatus } from '~/interfaces/readingStatus'

const BASE_URL = 'https://booknookapi-production.up.railway.app/reading-status'

export const readingStatusService = {
  async saveStatus(readingStatus: ReadingStatus) {
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
      return await response.json()
    } catch (error) {
      console.error('Error saving reading status:', error)
      throw error
    }
  },

  async getBooksByStatus(booksStatusByUser: BooksStatusByUser) {
    const authStore = useAuthStore()

    const userId = authStore.userId
    if (!userId) {
      throw new Error('Usuario no autenticado')
    }
    try {
      console.log(booksStatusByUser)
      const response = await fetch(
        `${BASE_URL}/user/${booksStatusByUser.user_id}/status/${booksStatusByUser.status}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      if (!response.ok) {
        throw new Error('Error fetching books by status')
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching books by status:', error)
      throw error
    }
  },
}