import type { UserData } from '~/interfaces/user'

export const useAuthStore = defineStore('auth', () => {
  const user = ref()
  const isLoggedIn = ref(false)
  const authToken = useCookie('authToken')
  const userId = ref()

  onMounted(() => {
    if (authToken.value) {
      isLoggedIn.value = true
    } else {
      isLoggedIn.value = false
    }
  })

  function login(userData: UserData) {
    user.value = userData
    isLoggedIn.value = true
    userId.value = user.value?.user_id || null
  }

  function logout() {
    user.value = null
    isLoggedIn.value = false
  }

  return {
    user,
    userId,
    isLoggedIn,
    login,
    logout,
  }
})
