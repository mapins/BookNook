export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isLoggedIn = ref(false)
  const authToken = useCookie('authToken')

  onMounted(() => {
    if (authToken.value) {
      isLoggedIn.value = true
    } else {
      isLoggedIn.value = false
    }
  })

  function login(userData: any) {
    user.value = userData
    isLoggedIn.value = true
  }

  function logout() {
    user.value = null
    isLoggedIn.value = false
  }

  return {
    user,
    isLoggedIn,
    login,
    logout,
  }
})
