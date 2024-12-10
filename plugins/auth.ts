import { useAuthStore } from '@/stores/auth'
import { userService } from '~/services/userService'

export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore()
  try {
    const user = await userService.decodeToken()

    console.log(user)

    authStore.login(user)
  } catch (error) {}
})
