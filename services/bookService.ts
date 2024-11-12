const BASE_URL = 'http://localhost:3001'

export const getBooks = async () => {
  try {
    const response = await fetch(`${BASE_URL}/books`)
    if (response) console.log('fetch bien')
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
    const response = await fetch(`${BASE_URL}/books/${bookId}`)
    if (!response.ok) throw new Error('Error al obtener el libro')
    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Error al obtener el libro con ID ${bookId}:`, error)
    throw error
  }
}