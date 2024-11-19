export interface ReadingStatus {
  book_id: number
  user_id: number
  status: 'read' | 'reading' | 'desired'
}
