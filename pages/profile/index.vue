<script setup lang="ts">
import UserProfile from '~/components/user/UserProfile.vue'
definePageMeta({
  layout: 'no-footer',
  middleware: 'auth',
})
</script>
<template>
  <UserProfile />
</template>
