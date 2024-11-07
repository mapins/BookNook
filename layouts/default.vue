<script setup lang="ts">
import MainNavbar from '@/components/global/navbar/MainNavbar.vue'
import MainFooter from '@/components/global/footer/MainFooter.vue'
</script>

<template>
  <div class="layout">
    <aside class="navbar">
      <MainNavbar />
    </aside>
    <div class="main">
      <main class="main__content">
        <slot />
      </main>
      <footer class="footer">
        <MainFooter />
      </footer>
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}

.navbar {
  width: 10rem;
}

.main {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.main__content {
  flex: 1;
  padding: 1.25rem;
}
</style>
