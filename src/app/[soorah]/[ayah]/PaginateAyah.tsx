import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import { soorahList } from '@/assets/soorah-list-object'
import {
  Pagination as PaginationShadcn,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination'
import { buildUrl } from '@/helpers/buildUrl'
import { calculatePageBounds } from '@/utility/calculatePageBounds/calculatePageBounds'

export type PaginateAyahProps = {
  soorah: number
  activePage: number
  pageRangeDisplayed?: number
}

export const PaginateAyah = ({ soorah, activePage, pageRangeDisplayed = 5 }: PaginateAyahProps) => {
  const totalPages = soorahList[soorah - 1].ayahCount

  const { startPage, endPage } = calculatePageBounds(activePage, totalPages, pageRangeDisplayed)
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)

  return (
    <PaginationShadcn>
      <PaginationContent>
        {activePage > 1 && !pageNumbers.includes(1) && (
          <PaginationItem>
            <PaginationLink href={buildUrl(soorah, activePage - 1)}>
              <ChevronLeftIcon className="h-4 w-4" />
            </PaginationLink>
          </PaginationItem>
        )}

        {pageNumbers.map((page) => {
          const isCurrPage = page === activePage

          return (
            <PaginationItem key={page}>
              <PaginationLink href={buildUrl(soorah, page)} isActive={isCurrPage}>
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        {!pageNumbers.includes(activePage) && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {activePage !== totalPages && !pageNumbers.includes(totalPages) && (
          <PaginationItem>
            <PaginationLink href={buildUrl(soorah, activePage + 1)}>
              <ChevronRightIcon className="h-4 w-4" />
            </PaginationLink>
          </PaginationItem>
        )}
      </PaginationContent>
    </PaginationShadcn>
  )
}
