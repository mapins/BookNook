<script setup lang="ts">
import MainNavbar from '@/components/navbar/MainNavbar.vue'
</script>

<template>
  <div>
    <MainNavbar />
    <slot />
    <AppFooter />
  </div>
</template>
