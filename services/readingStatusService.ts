import type {
  BooksStatusByUser,
  currentUserBook,
  ReadingStatus,
} from '~/interfaces/readingStatus'

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
      return await response.json()
    } catch (error) {
      console.error('Error saving reading status:', error)
      throw error
    }
  },

  async getBooksByStatus(booksStatusByUser: BooksStatusByUser) {
    console.log(booksStatusByUser)
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
      return await response.json()
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
      return await response.json()
    } catch (error) {
      console.error('Error when searching for the users books with his status:', error)
      throw error
    }
  },
}
