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
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error registering user')
      }

      const loginData: LoginData = {
        email_address: userData.email_address,
        password: userData.password,
      }

      const loginResponse = await this.login(loginData)

      return loginResponse
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
  async decodeToken() {
    const response = await fetch(`${BASE_URL}/tokens`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error sending cookies')
    }
    const data = await response.json()

    return data
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

  async getUserById(userId: number | null) {
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

  async updateUser(userId: number | null, updatedData: { [key: string]: string }) {
    try {
      const response = await fetch(`${BASE_URL}/${userId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al actualizar el usuario')
      }

      const responseText = await response.text()
      if (responseText) {
        return JSON.parse(responseText)
      } else {
        return {}
      }
    } catch (error) {
      console.error('Error actualizando el usuario:', error)
      throw error
    }
  },
  async deleteUser(userId: number | null) {
    try {
      const response = await fetch(`${BASE_URL}/${userId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al ELIMINAR el usuario')
      }

      const result = await response.json()
      const authStore = useAuthStore()
      authStore.logout()
    } catch (error) {
      console.error('Error eliminando el usuario:', error)
      throw error
    }
  },
}
