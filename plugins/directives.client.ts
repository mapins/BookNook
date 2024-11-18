import { outsideClick } from '@/directives'
export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.directive('outside-click', outsideClick)
})
