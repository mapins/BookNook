import { useAuthStore } from '@/stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  const { user } = storeToRefs(authStore)

  if (user && (to.path === '/login' || to.path === '/register')) {
    return abortNavigation()
  }

  if (!user && to.path !== '/login' && to.path !== '/register') {
    return navigateTo('/login')
  }
})
