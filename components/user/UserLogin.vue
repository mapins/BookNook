<script lang="ts" setup>
import { ref } from 'vue'
import { userService } from '@/services/userService'
import type { LoginData } from '~/interfaces/user'

const user = ref<LoginData>({
  email_address: '',
  password: '',
})

const errorMessage = ref<string>('')

const loginUser = async () => {
  try {
    const existingUser = await userService.login(user.value)
    errorMessage.value = ''
    await navigateTo('/')
  } catch (error) {
    console.error('Error en el logeo', error)
    errorMessage.value = 'Nombre de usuario o contraseña incorrectos.'
  }
}
</script>
<template>
  <div class="login">
    <h2 class="login__title">Iniciar Sesión</h2>
    <form @submit.prevent="loginUser" class="login__form">
      <input
        v-model="user.email_address"
        type="email"
        placeholder="Correo electrónico"
        class="login__input"
        required
      />
      <input
        v-model="user.password"
        type="password"
        placeholder="Contraseña"
        class="login__input"
        required
      />
      <button type="submit" class="login__button">Iniciar Sesión</button>
    </form>
    <p v-if="errorMessage" class="login__error">{{ errorMessage }}</p>
    <p class="login__register">
      ¿No tienes una cuenta?
      <NuxtLink to="/register" class="login__register-link"> Regístrate aquí </NuxtLink>
    </p>
  </div>
</template>

<style scoped lang="scss">
.login {
  color: var(--c-white);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 2rem;
  box-shadow: 0 0.25rem 0.625rem rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  &__title {
    font-size: 2rem;
    margin-bottom: 2rem;
    color: var(--c-primary);
  }
  &__form {
    width: 100%;
    max-width: 25rem;
  }
  &__input {
    width: 100%;
    padding: 1rem;
    margin: 0.5rem 0;
    border: 0.0625rem solid var(--c-gray);
    border-radius: 0.25rem;
    font-size: 1rem;
    background-color: var(--c-graphite);
    &:focus {
      border-color: var(--c-primary);
      outline: none;
    }
  }
  &__button {
    width: 100%;
    padding: 1rem;
    background-color: var(--c-primary);
    color: white;
    border: none;
    border-radius: 0.25rem;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  &__button:hover {
    background-color: var(--c-primary-dark);
  }
  &__error {
    color: var(--c-primary);
    margin-top: 1rem;
  }
  &__register {
    margin-top: 1rem;
    color: var(--c-gray);
  }
  &__register-link {
    color: var(--c-primary);
    text-decoration: underline;
  }
}
</style>
