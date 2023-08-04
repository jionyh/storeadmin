export interface Options {
  date?: string
  cat?: string
  period?: 'day' | 'week' | 'month' | 'year'
  pageNumber: number
  resultsPerPage: number
}