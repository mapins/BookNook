<script setup lang="ts">
import MainNavbar from '@/components/global/navbar/MainNavbar.vue'
import MainFooter from '@/components/global/footer/MainFooter.vue'
</script>

<template>
  <div>
    <MainNavbar />
    <slot />
    <MainFooter />
  </div>
</template>
