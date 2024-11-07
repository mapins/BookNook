export interface ReadingStatus {
  status_id: number
  book_id: number
  user_id: number
  status: 'read' | 'reading' | 'desired'
  update_date: string // timestamp
}
