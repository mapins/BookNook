export interface Book {
  book_id: number
  title: string
  author: { name: string }[]
  editorial: string
  description: string
  coverpage: string
  pagecount: number
  publicationdate: number
  slug: string
}
