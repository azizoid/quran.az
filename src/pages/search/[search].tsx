import { ReactElement, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import Pagination from 'react-js-pagination'
import { useQuery } from 'react-query'

import { SOORAH_LIST } from 'src/assets/soorah-list-object'
import { SearchAyah } from 'src/components'
import { MainLayout } from 'src/layouts/MainLayout'
import { ReponseProps } from 'src/pages/api/search/[search]'
import { Loader } from 'src/ui'

export const Search = () => {
  const { query } = useRouter()

  const [currentPage, setCurrentPage] = useState(1)

  const searchQuery =
    typeof query?.search === 'string' && query?.search?.length > 2 ? query.search : undefined

  const translator = Number(query.t?.toString()) || process.env.NEXT_PUBLIC_DEFAULT_TRANSLATOR

  const { data, isLoading, error, refetch } = useQuery<ReponseProps>(
    ['out', { page: currentPage, perPage: 30 }],
    () =>
      fetch(`/api/search/${searchQuery}?page=${currentPage}&t=${translator}`).then((res) =>
        res.json()
      ),
    {
      enabled: !!searchQuery,
    }
  )

  useEffect(() => {
    if (!!searchQuery) {
      refetch()
    }
  }, [refetch, searchQuery, translator])

  if (isLoading) {
    return <Loader />
  }

  if (error || !data?.success) {
    return <div className="col-sm-12 alert alert-danger">Kəlmə tapılmamışdır</div>
  }

  const paginateLinks = data?.paginate?.total > data?.paginate?.perPage && (
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
  )

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
