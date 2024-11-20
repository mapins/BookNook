export interface ReadingStatus {
  book_id: number
  user_id: number | null
  status: 'read' | 'reading' | 'desired' | null
}

export interface BooksStatusByUser {
  user_id: number | null
  status: 'read' | 'reading' | 'desired' | null
}
