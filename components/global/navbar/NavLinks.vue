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
        <NuxtLink href="/"><SvgHome class="nav-link__icon" /></NuxtLink>
      </li>
      <li class="nav-link__li">
        <NuxtLink to="/my-books"> <SvgBook class="nav-link__icon" /></NuxtLink>
      </li>

      <li class="nav-link__li">
        <NuxtLink to="#"> <SvgStar class="nav-link__icon" /></NuxtLink>
      </li>
      <li class="nav-link__li">
        <NuxtLink to="/search">
          <SvgLens class="nav-link__icon" />
        </NuxtLink>
      </li>
      <li class="nav-link__li">
        <MainButton
          v-if="!isLoggedIn"
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
        <div v-else class="nav-link__logged">
          <SvgProfile class="nav-link__icon" />
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
  @include responsive() {
    width: 100%;
    margin: 0;
  }
  &__ul {
    @include flex(column, $gap: 7em);
    @include responsive() {
      width: 100%;
      @include flex(column, flex-start, $gap: 8em);
      margin: 0;
    }
  }
  &__li {
    max-height: 4em;
  }
  &__a {
    @include flex();
  }
  &__icon {
    transition:
      fill 0.3s ease,
      transform 0.3s ease;
    svg {
      fill: var(--c-primary);
    }
    &:hover {
      fill: var(--c-primary);
      transform: scale(1.1);
      stroke: var(--c-primary);
    }
  }
  &__logged {
    display: flex;
    flex-direction: column;
    gap: 7rem;
  }
}
</style>
