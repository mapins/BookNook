import type { Rating } from '~/interfaces'

const BASE_URL = 'https://booknookapi-production.up.railway.app/ratings'

export const ratingsService = {
  async saveRating(rating: Rating) {
    try {
      const response = await fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rating),
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

  async getRatingByUserAndBook(rating: Rating) {
    try {
      const response = await fetch(
        `${BASE_URL}/user/${rating.user_id}/book/${rating.book_id}/rating`,
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
