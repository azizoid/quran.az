import { ReactElement, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import Pagination from 'react-js-pagination'
import useSWR from 'swr'

import { SOORAH_LIST } from '@/assets/soorah-list-object'
import { SearchAyah } from '@/components'
import { MainLayout } from '@/layouts/MainLayout'
import { Loader } from '@/ui'
import { fetcher } from '@/utility'
import { ReponseProps } from 'src/pages/api/search/[search]'

export const Search = () => {
  const { query } = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  const translator = Number(query.t?.toString()) || process.env.NEXT_PUBLIC_DEFAULT_TRANSLATOR

  const { data, isLoading, error } = useSWR<ReponseProps>(
    !!searchQuery ? `/api/search/${encodeURIComponent(searchQuery)}?page=${currentPage}&t=${translator}` : undefined, fetcher, {
    revalidateOnMount: true,
    dedupingInterval: 60 * 60 * 1000, // TTL of 1 hour
  }
  )

  useEffect(() => {
    if (typeof query?.search === 'string' && query.search.length > 2) {
      setSearchQuery(query.search)
    }
  }, [query])

  if (isLoading) {
    return <Loader />
  }

  if (error || !data?.success) {
    return <div className="col-sm-12 alert alert-danger">Kəlmə tapılmamışdır</div>
  }

  const paginateLinks =
    data?.paginate?.total > data?.paginate?.perPage ? (
      <li className="list-group-item">
        <Pagination
          activePage={data?.paginate.currentPage}
          itemsCountPerPage={data?.paginate.perPage}
          totalItemsCount={data?.paginate.total}
          pageRangeDisplayed={5}
          innerClass="pagination"
          itemClass="pagination-item"
          activeClass="pagination-active"
          onChange={setCurrentPage}
          hideDisabled={true}
        />
      </li>
    ) : null

  return (
    <ul className="list-none divide-y divide-gray-100 bg-white text-gray-700">
      {paginateLinks}

      {data?.out?.map((ayah) => {
        const sajda = SOORAH_LIST[ayah.soorah]?.sajda
        return <SearchAyah data={ayah} sajda={sajda} mark={searchQuery} key={ayah.id} />
      })}

      {paginateLinks}
    </ul>
  )
}

Search.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

// eslint-disable-next-line import/no-default-export
export default Search
