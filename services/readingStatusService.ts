import type { ReadingStatus } from '~/interfaces/readingStatus'

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
}
