import type { UserData } from '~/interfaces/user'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserData | null>(null)
  const isLoggedIn = ref(false)
  const userId = ref<number | null>(null)

  function login(userData: UserData) {
    user.value = userData
    isLoggedIn.value = true
    userId.value = user.value?.user_id || null
    localStorage.setItem('userId', userId.value?.toString() || '')
    localStorage.setItem('isLoggedIn', 'true')
  }

  function logout() {
    user.value = null
    isLoggedIn.value = false
    userId.value = null
    localStorage.removeItem('userId')
    localStorage.removeItem('isLoggedIn')
  }

  onMounted(() => {
    if (process.client) {
      const storedUserId = localStorage.getItem('userId')
      const storedIsLoggedIn = localStorage.getItem('isLoggedIn')

      if (storedIsLoggedIn === 'true' && storedUserId) {
        isLoggedIn.value = true
        userId.value = parseInt(storedUserId)
      } else {
        isLoggedIn.value = false
        userId.value = null
      }
    }
  })

  return {
    user,
    userId,
    isLoggedIn,
    login,
    logout,
  }
})
