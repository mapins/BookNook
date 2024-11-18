export const useElementStore = defineStore('element', () => {
  const showElement = ref(false)

  const handleElement = () => {
    showElement.value = !showElement.value
  }

  const closeElement = () => {
    showElement.value = false
  }

  const isShowing = computed(() => showElement.value)

  return {
    isShowing,
    handleElement,
    closeElement,
  }
})
