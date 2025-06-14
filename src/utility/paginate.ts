import { DataPropsLatinized } from '@/helpers/types'

export type PaginationProps = {
  currentPage: number
  perPage: number
  total: number
}

export const initialPaginate: PaginationProps = {
  total: 0,
  perPage: 30,
  currentPage: 1,
}

export const paginate = (array: DataPropsLatinized[], page_size: number, page_number: number) =>
  array.slice((page_number - 1) * page_size, page_number * page_size)
