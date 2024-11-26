export const useCacheStore = defineStore('cache', {
  state: () => ({
    cache: {} as Record<string, any>,
  }),

  actions: {
    getCache(key: string): any {
      if (this.cache[key]) {
        return this.cache[key]
      }

      const cachedData = localStorage.getItem(key)
      if (cachedData) {
        this.cache[key] = JSON.parse(cachedData)
        return this.cache[key]
      }

      return null
    },

    setCache(key: string, value: any) {
      this.cache[key] = value
      localStorage.setItem(key, JSON.stringify(value))
    },

    clearCache(key: string) {
      delete this.cache[key]
      localStorage.removeItem(key)
    },

    removeCache() {
      this.cache = {}
      localStorage.clear()
    },
  },
})
