import type { Book } from '~/interfaces'

export function useFilterBooks() {
  const filteredBooks = ref<Book[]>([])
  function searchBook(searchItem: string, books: Book[]) {
    filteredBooks.value = books.filter((book: any) => {
      const normalizedTitle = book.title
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()

      const normalizedSearch = searchItem
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()

      return normalizedTitle.startsWith(normalizedSearch)
    })
  }

  return {
    filteredBooks,
    searchBook,
  }
}
