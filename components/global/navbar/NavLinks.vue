<script setup lang="ts">
import MainButton from '@/components/ui/buttons/MainButton.vue'
import { useAuthStore } from '@/stores/auth'
import { userService } from '~/services/userService'

const authStore = useAuthStore()
const { isLoggedIn } = storeToRefs(authStore)

onMounted(() => {
  console.log(isLoggedIn.value)
})
</script>
<template>
  <section class="nav-link">
    <ul class="nav-link__ul">
      <li class="nav-link__li">
        <NuxtLink href="/" class="nav-link__item">
          <SvgHome class="nav-link__icon" />
        </NuxtLink>
      </li>
      <li class="nav-link__li">
        <NuxtLink to="/my-books" class="nav-link__item">
          <SvgBook class="nav-link__icon" />
        </NuxtLink>
      </li>
      <li class="nav-link__li">
        <NuxtLink to="/search" class="nav-link__item">
          <SvgLens class="nav-link__icon" />
        </NuxtLink>
      </li>

      <li v-if="!isLoggedIn" class="nav-link__li">
        <MainButton
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
      </li>
      <li v-else class="nav-link__li">
        <div class="nav-link__logged">
          <NuxtLink to="/profile" class="nav-link__profile">
            <SvgProfile class="nav-link__icon" />
          </NuxtLink>

          <NuxtLink to="/" class="nav-link__leave" @click="userService.logout()">
            <SvgLeave />
          </NuxtLink>
        </div>
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
.nav-link {
  height: 100%;
  @include responsive() {
    z-index: 5;
    width: 80vw;
    height: 4.5rem;
    background-color: #000;
  }
  &__ul {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    @include responsive() {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
  &__li {
    color: white;
  }
  &__logged {
    display: flex;
    flex-direction: column;
    gap: 6rem;
    @include responsive() {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 3rem;
    }
  }
}
</style>
