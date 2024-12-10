import type { UpdateUserData } from '~/interfaces/user'
import { userService } from '~/services/userService'
import { useAuthStore } from '~/stores/auth'

export function useUser() {
  const authStore = useAuthStore()
  const { userId } = storeToRefs(authStore)
  const currentUser = ref<UpdateUserData | null>(null)

  const fetchUser = async () => {
    try {
      const user = await userService.getUserById(userId.value)
      currentUser.value = user
    } catch (error) {
      console.error('Error al obtener el usuario:', error)
    }
  }

  const placeholders = computed<UpdateUserData>(() => ({
    first_name: currentUser.value?.first_name || '',
    last_name: currentUser.value?.last_name || '',
    user_handle: currentUser.value?.user_handle || '',
    email_address: currentUser.value?.email_address || '',
    password: currentUser.value?.password || '',
  }))

  // Aqui lo que hago es que recojo el campo que quiero actualizar, y value es el nuevo valor que le asignare, llamo al servicio (le paso por field el campo a actualizar y value el nuevo valor) y lo actualizo, si va bien lo actualizo en currentUser.
  const updateUser = async (updatedFields: { [key: string]: string }) => {
    try {
      await userService.updateUser(userId.value, updatedFields)
      if (currentUser.value) {
        // Actualizo los campos de mi elemento local
        Object.keys(updatedFields).forEach((field) => {
          if (currentUser.value && field in currentUser.value) {
            currentUser.value[field] = updatedFields[field]
          }
        })
      }
    } catch (error) {
      console.error('Error al actualizar los campos:', error)
    }
  }

  return {
    currentUser,
    fetchUser,
    placeholders,
    updateUser,
  }
}
