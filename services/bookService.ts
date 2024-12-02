import { useCacheStore } from '~/stores/cache'
const BASE_URL = 'https://booknookapi-production.up.railway.app/books'

export const getBooks = async () => {
  const cacheStore = useCacheStore()

  const cachedData = cacheStore.getCache('books')
  if (cachedData) {
    console.log('Datos obtenidos del cache')
    return cachedData
  }

  try {
    const response = await fetch(`${BASE_URL}`)
    if (!response.ok) throw new Error('Error al obtener los libros')
    const data = await response.json()

    cacheStore.setCache('books', data)
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
export const getBookByTitle = async (bookTitle: string) => {
  const cacheStore = useCacheStore()

  const cachedData = cacheStore.getCache(`book-${bookTitle}`)
  if (cachedData) {
    console.log('Datos obtenidos del cache')
    return cachedData
  }
  try {
    const response = await fetch(`${BASE_URL}/title/${bookTitle}`)
    if (!response.ok) throw new Error('Error al obtener el libro')
    const data = await response.json()
    cacheStore.setCache(`book-${bookTitle}`, data)
    return data
  } catch (error) {
    console.error(`Error al obtener el libro con titulo ${bookTitle}:`, error)
    throw error
  }
}

export const getBooksByCategories = async (categoryIds: number[]) => {
  console.log(categoryIds)
  const cacheStore = useCacheStore()

  const cachedData = cacheStore.getCache(`books-category-${categoryIds.join('-')}`)
  if (cachedData) {
    console.log('Datos obtenidos del cache')
    return cachedData
  }
  try {
    const response = await fetch(
      `${BASE_URL}/categories?category_ids=${categoryIds.join(',')}`,
    )

    if (!response.ok) throw new Error('Error al obtener el libro')
    const data = await response.json()
    cacheStore.setCache(`books-category-${categoryIds.join('-')}`, data)
    return data
  } catch (error) {
    console.error(`Error al obtener los libros con categoria ${categoryIds}:`, error)
    throw error
  }
}
