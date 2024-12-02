export function useCreateSlug() {
  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .trim()
  }

  const deleteSlug = (slug: string) => {
    return encodeURIComponent(slug.trim())
  }

  return { createSlug, deleteSlug }
}
