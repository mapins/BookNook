<script lang="ts" setup>
import { ref } from 'vue'
import { userService } from '@/services/userService'
import type { LoginData } from '~/interfaces/user'

const user = ref<LoginData>({
  email_address: '',
  password: '',
})

const loginUser = async () => {
  try {
    const existingUser = await userService.login(user.value)
    await navigateTo('/')
  } catch (error) {
    console.error('Error en el logeo', error)
  }
}
</script>
<template>
  <div class="all">
    <h2>Registro</h2>
    <form @submit.prevent="loginUser">
      <input v-model="user.email_address" type="email" placeholder="Correo electrónico" />
      <input v-model="user.password" type="password" placeholder="Contraseña" />
      <button type="submit">Registrar</button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.all {
  color: white;
}

button {
  background-color: white;
}
</style>
