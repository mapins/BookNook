import type { currentUserBook, ReadingStatus } from '~/interfaces/readingStatus'

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

      return data
    } catch (error) {
      console.error('Error deleting status:', error)
      throw error
    }
  },

  async getBookByStatus(currentUserBook: currentUserBook) {
    console.log(currentUserBook.user_id)

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
      return data
    } catch (error) {
      console.error('Error when searching for the users books with his status:', error)
      throw error
    }
  },
}
