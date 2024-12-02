export interface ReadingStatus {
  book_id: number
  user_id: number | null
  status: 'read' | 'reading' | 'desired' | 'not_found' | null
}

export interface BooksStatusByUser {
  user_id: number | null
  status: 'read' | 'reading' | 'desired' | 'not_found' | null
}

export interface currentUserBook {
  book_id: number | null | undefined
  user_id: number | null
}
