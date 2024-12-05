import { useCacheStore } from '~/stores/cache'
const BASE_URL = 'https://booknookapi-production.up.railway.app/books'

export const getBooks = async () => {
  try {
    const response = await fetch(`${BASE_URL}`)
    if (!response.ok) throw new Error('Error al obtener los libros')
    const data = await response.json()

    return data
  } catch (error) {
    console.error('Error en la solicitud a la API:', error)
    throw error
  }
}

export const getBookById = async (bookId: number) => {
  console.log('SEMETI')
  const cacheStore = useCacheStore()

  const cachedData = cacheStore.getCache(`book-${bookId}`)
  if (cachedData) {
    console.log('Datos obtenidos del cache')
    return cachedData
  }
  try {
    const response = await fetch(`${BASE_URL}/${bookId}`)
    if (!response.ok) throw new Error('Error al obtener el libro')
    const data = await response.json()
    cacheStore.setCache(`book-${bookId}`, data)
    return data
  } catch (error) {
    console.error(`Error al obtener el libro con ID ${bookId}:`, error)
    throw error
  }
}
export const getBookBySlug = async (bookSlug: string) => {
  console.log(bookSlug)
  const cacheStore = useCacheStore()

  const cachedData = cacheStore.getCache(`book-${bookSlug}`)
  if (cachedData) {
    console.log('Datos obtenidos del cache')
    return cachedData
  }
  try {
    const response = await fetch(`${BASE_URL}/slug/${bookSlug}`)
    if (!response.ok) throw new Error('Error al obtener el libro')
    const data = await response.json()
    cacheStore.setCache(`book-${bookSlug}`, data)
    return data
  } catch (error) {
    console.error(`Error al obtener el libro con titulo ${bookSlug}:`, error)
    throw error
  }
}

export const getBooksByCategories = async (categoryIds: number[]) => {
  console.log(categoryIds)

  try {
    const response = await fetch(
      `${BASE_URL}/categories?category_ids=${categoryIds.join(',')}`,
    )

    if (!response.ok) throw new Error('Error al obtener el libro')
    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Error al obtener los libros con categoria ${categoryIds}:`, error)
    throw error
  }
}
export const getBookCategories = async (bookId: number) => {
  try {
    const response = await fetch(`${BASE_URL}/${bookId}/categories`)

    if (!response.ok) throw new Error('Error al obtener el libro')
    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Error al obtener las categorias con libro ID ${bookId}:`, error)
    throw error
  }
}
export const getBooksByStatusAndRating = async (
  userId: number | null,
  status: string | null,
  rating: number | null,
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/user/${userId}?status=${status}&rating=${rating}`,
    )

    if (!response.ok) throw new Error('Error al obtener el libro')
    const data = await response.json()
    return data
  } catch (error) {
    console.error(
      `Error al obtener los libros con estado ${status} y rating ${rating}:`,
      error,
    )
    throw error
  }
}
