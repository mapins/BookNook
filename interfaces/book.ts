export interface Book {
  book_id: number
  title: string
  author: string
  editorial: string | null
  description: string | null
  coverpage: string | null
  pagecount: number
  publicationdate: string // Date
  averagerating: number | null
  totalratings: number | null
}
