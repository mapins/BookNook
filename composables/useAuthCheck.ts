import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'

export function useAuthCheck() {
  const authStore = useAuthStore()
  const { user } = storeToRefs(authStore)
  const router = useRouter()

  const isUserLogged = computed(() => !!user.value)

  const handleActionIfNotLoggedIn = () => {
    if (!isUserLogged.value) {
      router.push('/login')
    }
  }

  return {
    handleActionIfNotLoggedIn,
  }
}
