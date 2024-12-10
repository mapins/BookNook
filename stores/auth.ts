import type { UserData } from '~/interfaces/user'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserData | null>(null)
  const userId = ref<number | null>(null)

  function login(userData: UserData) {
    user.value = userData
    userId.value = user.value?.user_id || null
  }

  function logout() {
    user.value = null
    userId.value = null
  }

  return {
    user,
    userId,
    login,
    logout,
  }
})
