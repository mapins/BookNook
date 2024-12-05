const BASE_URL = 'https://booknookapi-production.up.railway.app/categories'

export const getCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}`)
    if (!response.ok) throw new Error('Error al obtener las categorias')
    const data = await response.json()

    return data
  } catch (error) {
    console.error('Error en la solicitud a la API:', error)
    throw error
  }
}
