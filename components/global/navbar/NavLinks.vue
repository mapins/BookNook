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
          padding="0.1rem 0.5rem"
          color="var(--c-white)"
          font-size="0.9em"
          width="6rem"
          hover-color="var(--c-white)"
          to="/login"
        >
          INICIAR SESIÓN
        </MainButton>
      </li>
      <li v-else class="nav-link__li">
        <div class="nav-link__logged">
          <NuxtLink to="/profile" class="nav-link__profile">
            <SvgProfile class="nav-link__icon" />
          </NuxtLink>
        </div>
      </li>
      <li v-if="isLoggedIn" class="nav-link__li">
        <div class="nav-link__logged">
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
    background-color: var(--c-black);
  }
  &__ul {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    gap: 1rem;
    @include responsive() {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
    }
  }
  &__li {
    color: var(--c-white);
    display: flex;
    align-items: center;
  }
  &__icon {
    width: 2rem;
    height: 2rem;
  }
}
</style>
