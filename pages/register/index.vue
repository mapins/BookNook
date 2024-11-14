<template>
  <div class="all">
    <h2>Registro</h2>
    <form @submit.prevent="registerUser">
      <input v-model="user.first_name" type="text" placeholder="Nombre" />
      <input v-model="user.last_name" type="text" placeholder="Apellido" />
      <input v-model="user.user_handle" type="text" placeholder="Nombre de usuario" />
      <input v-model="user.email_address" type="email" placeholder="Correo electrónico" />
      <input v-model="user.password" type="password" placeholder="Contraseña" />
      <button type="submit">Registrar</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { userService } from '@/services/userService'
import type { UserData } from '~/interfaces/user'

const user = ref<UserData>({
  user_handle: '',
  email_address: '',
  password: '',
  first_name: '',
  last_name: '',
})

const registerUser = async () => {
  try {
    const newUser = await userService.register(user.value)
    console.log('Usuario registrado:', newUser)
  } catch (error) {
    console.error('Error en el registro', error)
  }
}
</script>

<style scoped lang="scss">
.all {
  color: white;
}

button {
  background-color: white;
}
</style>
