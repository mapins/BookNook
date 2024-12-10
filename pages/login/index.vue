<script setup lang="ts">
import UserLogin from '@/components/user/UserLogin.vue'
definePageMeta({
  layout: 'no-footer',
  middleware: 'auth',
})
</script>
<template>
  <UserLogin />
</template>
