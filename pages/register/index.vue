<script setup lang="ts">
import UserRegister from '@/components/user/UserRegister.vue'
definePageMeta({
  layout: 'no-footer',
  middleware: 'auth',
})
</script>
<template>
  <UserRegister />
</template>
