import {
  Pagination as PaginationShadcn,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"

import { soorahList } from '@/assets/soorah-list-object'
import { buildUrl } from '@/helpers/buildUrl'

export type PaginateAyahProps = {
  soorah: number
  ayah: number
}

export const PaginateAyah = ({ soorah, ayah }: PaginateAyahProps) => {
  const soorahIndex = soorah - 1

  const prevAyah = ayah === 1 ? null : ayah - 1
  const nextAyah = ayah === soorahList[soorahIndex]?.ayahCount ? null : ayah + 1

  return (
    <PaginationShadcn>
      <PaginationContent>
        {prevAyah && (
          <>
            {prevAyah > 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationLink href={buildUrl(soorah, prevAyah)}>{prevAyah}</PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationLink href="#" isActive>{ayah}</PaginationLink>
        </PaginationItem>

        {nextAyah && (
          <>
            <PaginationItem>
              <PaginationLink href={buildUrl(soorah, nextAyah)}>{nextAyah}</PaginationLink>
            </PaginationItem>

            {nextAyah < soorahList[soorahIndex].ayahCount && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}


      </PaginationContent>
    </PaginationShadcn>
  )
}
