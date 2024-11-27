const BASE_URL = 'https://booknookapi-production.up.railway.app/categories'

export const getCategories = async () => {
  /* const cacheStore = useCacheStore()

  const cachedData = cacheStore.getCache('books')
  if (cachedData) {
    console.log('Datos obtenidos del cache')
    return cachedData
  } */

  try {
    const response = await fetch(`${BASE_URL}`)
    if (!response.ok) throw new Error('Error al obtener las categorias')
    const data = await response.json()

    /*     cacheStore.setCache('books', data)
     */ return data
  } catch (error) {
    console.error('Error en la solicitud a la API:', error)
    throw error
  }
}
