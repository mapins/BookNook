export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false)
  const authCookie = useCookie('auth_token')

  onMounted(() => {
    const savedStatus = localStorage.getItem('isLoggedIn')
    isLoggedIn.value = savedStatus === 'true'
  })

  function login(token: string) {
    isLoggedIn.value = true
    authCookie.value = token
  }

  function logout() {
    isLoggedIn.value = false
    authCookie.value = null
  }

  return {
    isLoggedIn,
    login,
    logout,
  }
})
