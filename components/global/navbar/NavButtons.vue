<script setup lang="ts">
import MainButton from '@/components/ui/buttons/MainButton.vue'
const authStore = useAuthStore()
</script>
<template>
  <section class="nav-buttons">
    <MainButton
      v-if="authStore.isLoggedIn"
      bg-color="var(--c-primary)"
      padding="0.2em 1em"
      color="var(--c-white)"
      font-size="0.9em"
      width="5rem"
      hover-color="var(--c-white)"
      to="/login"
    >
      INICIA SESIÓN
    </MainButton>

    <SvgProfile v-else />
  </section>
</template>
