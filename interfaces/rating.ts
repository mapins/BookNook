export interface Rating {
  rating_id: number
  book_id: number
  user_id: number
  rating: number
  rating_date: string
  commentary: string | null
}
