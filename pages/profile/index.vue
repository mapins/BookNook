<script setup lang="ts">
import { ref } from 'vue'
import type { UserData } from '~/interfaces/user'
import { userService } from '~/services/userService'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()

const currentUser = ref<UserData | null>(null)

onMounted(async () => {
  try {
    const user = await userService.getUserById(authStore.userId)
    currentUser.value = user
  } catch (error) {
    console.error('Error al obtener el usuario:', error)
  }
})

const formData = ref<UserData>({
  first_name: '',
  last_name: '',
  user_handle: '',
  email_address: '',
  password: '',
})

const handleSubmit = async () => {
  try {
    const userId = authStore.userId

    if (formData.value.first_name) {
      await userService.updateUser(userId, { first_name: formData.value.first_name })
      console.log('Nombre actualizado:', formData.value.first_name)
    }

    if (formData.value.last_name) {
      await userService.updateUser(userId, { last_name: formData.value.last_name })
      console.log('Apellido actualizado:', formData.value.last_name)
    }

    if (formData.value.user_handle) {
      await userService.updateUser(userId, { user_handle: formData.value.user_handle })
      console.log('Nombre de usuario actualizado:', formData.value.user_handle)
    }

    if (formData.value.email_address) {
      await userService.updateUser(userId, {
        email_address: formData.value.email_address,
      })
      console.log('Correo electrónico actualizado:', formData.value.email_address)
    }

    if (formData.value.password) {
      await userService.updateUser(userId, { password: formData.value.password })
      console.log('Contraseña actualizada.')
    }
  } catch (error) {
    console.error('Error al enviar el formulario:', error)
  }
}
</script>

<template>
  <section class="user-edit">
    <h1>Editar Perfil</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="firstName">Nombre</label>
        <input
          type="text"
          id="firstName"
          v-model="formData.first_name"
          :placeholder="currentUser?.first_name"
        />
      </div>

      <div class="form-group">
        <label for="lastName">Apellidos</label>
        <input
          type="text"
          id="lastName"
          v-model="formData.last_name"
          :placeholder="currentUser?.last_name"
        />
      </div>

      <div class="form-group">
        <label for="username">Nombre de usuario:</label>

        <input
          type="text"
          id="username"
          v-model="formData.user_handle"
          :placeholder="currentUser?.user_handle"
        />
      </div>

      <div class="form-group">
        <label for="email">Correo Electrónico</label>
        <input
          type="email"
          id="email"
          v-model="formData.email_address"
          :placeholder="currentUser?.email_address"
        />
      </div>

      <div class="form-group">
        <label for="password">Contraseña</label>
        <input
          type="password"
          v-model="formData.password"
          placeholder="Nueva contraseña"
        />
      </div>

      <button type="submit" class="btn-save">Guardar Cambios</button>
    </form>
  </section>
</template>

<style scoped lang="scss">
.user-edit {
  color: white;
  max-width: 37.5rem;
  margin: 0 auto;
  padding: 2rem;
  h1 {
    text-align: center;
    margin-bottom: 1.5rem;
  }
  .form-group {
    margin-bottom: 1.5rem;
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: bold;
    }
    input {
      width: 100%;
      padding: 0.8rem;
      border: 0.0625rem solid #ccc;
      border-radius: 0.25rem;
    }
  }
  .btn-save {
    display: block;
    width: 100%;
    padding: 1rem;
    background-color: #007bff;
    color: white;
    text-align: center;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    font-size: 1.2rem;
    &:hover {
      background-color: #0056b3;
    }
  }
}
</style>
