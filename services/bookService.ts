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
  try {
    const response = await fetch(`${BASE_URL}/${bookId}`)
    if (!response.ok) throw new Error('Error al obtener el libro')
    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Error al obtener el libro con ID ${bookId}:`, error)
    throw error
  }
}
