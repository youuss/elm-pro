export interface PaginationProps {
  current: number
  pageSize: number
  total: number
  layout: string
  pageSizes: number[]
  isCustomTotal?: boolean
}
