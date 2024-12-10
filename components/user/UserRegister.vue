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

const errorMessage = ref<string>('')

const registerUser = async () => {
  try {
    const newUser = await userService.register(user.value)
    errorMessage.value = ''
    navigateTo('/')
  } catch (error) {
    if (error instanceof Error) {
      errorMessage.value = error.message
    } else {
      errorMessage.value = 'Error en el registro. Intenta de nuevo.'
    }
  }
}
</script>
<template>
  <div class="register">
    <h2 class="register__title">Registro</h2>
    <form @submit.prevent="registerUser" class="register__form">
      <div class="register__group">
        <input
          v-model="user.first_name"
          type="text"
          placeholder="Nombre"
          class="register__input"
          required
        />
      </div>
      <div class="register__group">
        <input
          v-model="user.last_name"
          type="text"
          placeholder="Apellido"
          class="register__input"
          required
        />
      </div>
      <div class="register__group">
        <input
          v-model="user.user_handle"
          type="text"
          placeholder="Nombre de usuario"
          class="register__input"
          required
        />
      </div>
      <div class="register__group">
        <input
          v-model="user.email_address"
          type="email"
          placeholder="Correo electrónico"
          class="register__input"
          required
        />
      </div>
      <div class="register__group">
        <input
          v-model="user.password"
          type="password"
          placeholder="Contraseña"
          class="register__input"
          required
        />
      </div>
      <button type="submit" class="register__button">Registrar</button>
    </form>
    <p v-if="errorMessage" class="register__error">{{ errorMessage }}</p>
    <p class="register__login">
      ¿Ya tienes una cuenta?
      <NuxtLink to="/login" class="register__login-link"> Inicia sesión aquí </NuxtLink>
    </p>
  </div>
</template>

<style scoped lang="scss">
.register {
  color: var(--c-white);
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 2rem;
  background-color: var(--c-black);
  border-radius: 0.5rem;
  @include responsive() {
    height: 92vh;
  }
  &__title {
    text-align: center;
    margin-bottom: 1.5rem;
    font-size: 2rem;
    color: var(--c-primary);
  }
  &__form {
    width: 25rem;
    @include responsive() {
      width: 20rem;
    }
  }
  &__group {
    margin-bottom: 1rem;
  }
  &__input {
    width: 100%;
    padding: 0.8rem;
    border-radius: 0.25rem;
    background-color: var(--c-graphite);
    font-size: 1rem;
    &:focus {
      border-color: var(--c-primary);
      outline: none;
    }
  }
  &__button {
    width: 100%;
    padding: 0.8rem;
    background-color: var(--c-primary);
    color: var(--c-white);
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
    &:hover {
      background-color: var(--c-primary-dark);
    }
  }
  &__error {
    color: var(--c-primary);
    margin-top: 1rem;
    text-align: center;
  }
  &__login {
    margin-top: 1rem;
    color: var(--c-gray);
  }
  &__login-link {
    color: var(--c-primary);
    text-decoration: underline;
  }
}
</style>
