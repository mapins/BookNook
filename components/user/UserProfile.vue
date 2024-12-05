<script setup lang="ts">
import { useUser } from '~/composables/useUser'
import type { UpdateUserData } from '~/interfaces/user'
import { userService } from '~/services/userService'

const { fetchUser, placeholders, updateUser } = useUser()
const authStore = useAuthStore()

const formData = ref<UpdateUserData>({
  first_name: '',
  last_name: '',
  user_handle: '',
  email_address: '',
  password: '',
})

onMounted(fetchUser)

const handleSubmit = async () => {
  const updatedFields: { [key: string]: string } = {}

  for (const key in formData.value) {
    // Lo que hago es que si me han escrito algo y es distinto al placeholder y no esta vacío es decir lo han modificado, lo mete el updatedFields
    if (
      formData.value[key] !== placeholders.value[key] &&
      formData.value[key].trim() !== ''
    ) {
      updatedFields[key] = formData.value[key]
    }
  }

  if (Object.keys(updatedFields).length > 0) {
    await updateUser(updatedFields) // Paso solo los campos que han cambiado
    formData.value = {
      first_name: '',
      last_name: '',
      user_handle: '',
      email_address: '',
      password: '',
    }

    console.log('Perfil actualizado exitosamente.')
  }
}

const deleteUser = async () => {
  const confirmDelete = await alertService.confirmDelete()
  if (confirmDelete) {
    try {
      await userService.deleteUser(authStore.userId)
      alertService.showSuccess('Tu cuenta ha sido eliminada con éxito')
      navigateTo('/')
    } catch (error) {
      alertService.showError('Hubo un problema al eliminar tu cuenta')
    }
  } else {
    console.log('Eliminación de cuenta cancelada')
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
          :placeholder="placeholders.first_name"
        />
      </div>

      <div class="form-group">
        <label for="lastName">Apellidos</label>
        <input
          type="text"
          id="lastName"
          v-model="formData.last_name"
          :placeholder="placeholders.last_name"
        />
      </div>

      <div class="form-group">
        <label for="username">Nombre de usuario</label>
        <input
          type="text"
          id="username"
          v-model="formData.user_handle"
          :placeholder="placeholders.user_handle"
        />
      </div>

      <div class="form-group">
        <label for="email">Correo Electrónico</label>
        <input
          type="email"
          id="email"
          v-model="formData.email_address"
          :placeholder="placeholders.email_address"
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

      <p class="user-edit__delete">
        ¿Desea eliminar su cuenta?
        <NuxtLink @click="deleteUser" class="user-edit__delete-link">
          Eliminar cuenta
        </NuxtLink>
      </p>
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
    margin-bottom: 1rem;
  }
  .form-group {
    margin-bottom: 1rem;
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: bold;
    }
    input {
      width: 100%;
      padding: 0.8rem;
      border: 0.0625rem solid var(--c-graphite);
      border-radius: 0.25rem;
    }
  }
  .btn-save {
    display: block;
    width: 100%;
    padding: 1rem;
    background-color: var(--c-primary);
    color: white;
    text-align: center;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    font-size: 1.2rem;
    &:hover {
      background-color: var(--c-primary-hover);
    }
  }
  &__delete {
    text-align: center;
    margin-top: 1.5rem;
    &-link {
      color: var(--c-primary);
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
