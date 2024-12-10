<script setup lang="ts">
import { markRaw } from 'vue'
import MainButton from '@/components/ui/buttons/MainButton.vue'
import { useAuthStore } from '@/stores/auth'
import Book from '~/components/svg/Book.vue'
import Home from '~/components/svg/Home.vue'
import Lens from '~/components/svg/Lens.vue'
import { userService } from '~/services/userService'

const route = useRoute()

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const isUserLogged = computed(() => !!user.value)
const selectedLink = ref(route.path)

onMounted(() => {
  selectedLink.value = route.path
})

watch(
  () => route.path,
  (newPath) => {
    selectedLink.value = newPath
  },
)

const links = ref([
  { name: 'home', path: '/', icon: markRaw(Home) },
  { name: 'my-books', path: '/my-books', icon: markRaw(Book) },
  { name: 'search', path: '/search', icon: markRaw(Lens) },
])

function logout() {
  userService.logout()
  reloadNuxtApp()
}
</script>
<template>
  <section class="nav-link">
    <ul class="nav-link__ul">
      <li v-for="link in links" :key="link.name" class="nav-link__li">
        <NuxtLink :to="link.path" class="nav-link__item">
          <component
            :is="link.icon"
            class="nav-link__icon"
            :class="{ active: selectedLink === link.path }"
          />
        </NuxtLink>
      </li>

      <li v-if="!isUserLogged" class="nav-link__li">
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
          <NuxtLink to="/profile">
            <SvgProfile
              class="nav-link__icon"
              :class="{ active: selectedLink === '/profile' }"
            />
          </NuxtLink>
        </div>
      </li>
      <li v-if="isUserLogged" class="nav-link__li">
        <div class="nav-link__logged">
          <NuxtLink to="/" class="nav-link__leave" @click="logout()">
            <SvgLeave />
          </NuxtLink>
        </div>
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
@import '/assets/styles/load.css';

.nav-link {
  height: 100%;
  animation: fadeInUp 1.5s ease-out;
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
    transition: fill 0.3s ease;
  }
  .active {
    fill: var(--c-primary);
    stroke: var(--c-primary);
  }
}
</style>
