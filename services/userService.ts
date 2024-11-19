import type { UserData, LoginData } from '~/interfaces/user'

const BASE_URL = 'https://booknookapi-production.up.railway.app/users'

export const userService = {
  async register(userData: UserData) {
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
      if (!response.ok) {
        const errorMessage = await response.text()
        console.error('Server response:', errorMessage)
        throw new Error('Error registering user')
      }
      return await response.json()
    } catch (error) {
      console.error('Error registering user:', error)
      throw error
    }
  },

  async login(loginData: LoginData) {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      })
      if (!response.ok) {
        throw new Error('Error logging in user')
      }
      const data = await response.json()

      const authStore = useAuthStore()
      authStore.login(data.loggedUser)
      return data
    } catch (error) {
      console.error('Error logging in user:', error)
      throw error
    }
  },

  async logout() {
    try {
      const response = await fetch(`${BASE_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        throw new Error('Error logging out user')
      }
      const data = await response.json()

      const authStore = useAuthStore()
      authStore.logout()
      return data
    } catch (error) {
      console.error('Error logging out user:', error)
      throw error
    }
  },

  async getUserById(userId: number) {
    try {
      const response = await fetch(`${BASE_URL}/${userId}`)
      if (!response.ok) {
        throw new Error('Error fetching user')
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching user:', error)
      throw error
    }
  },
}
