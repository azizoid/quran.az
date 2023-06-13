'use client'
import { useEffect, useState } from 'react'

import { useParams, useSearchParams } from 'next/navigation'

import Pagination from 'react-js-pagination'
import useSWR from 'swr'

import { ResponseProps } from '@/app/api/v2/search/route'
import { SOORAH_LIST } from '@/assets/soorah-list-object'
import { SearchAyah } from '@/components/SearchAyah/SearchAyah'
import { Loader } from '@/ui'
import { fetcher } from '@/utility/fetcher'

const Search = () => {
  const params = useParams()
  const searchParams = useSearchParams()

  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  const translator = searchParams?.get('t')

  const searchBody = {
    search: params?.search,
    page: String(currentPage),
    t: translator
  }

  const { data, isLoading, error, mutate } = useSWR<ResponseProps>(
    searchQuery?.length > 2 ? '/api/v2/search' : undefined,
    (url: string) => fetcher(url, searchBody, 'POST'),
    {
      // revalidateOnFocus: true,
      // refreshInterval: 5000,
      // revalidateOnMount: true,
      dedupingInterval: 60 * 60 * 1000, // TTL of 1 hour
    }
  )

  useEffect(() => {
    if (typeof params?.search === 'string' && params.search.length > 2) {
      setSearchQuery(decodeURIComponent(params.search.toString()))
    }
  }, [params?.search])

  useEffect(() => {
    mutate()
  }, [mutate, currentPage, translator, params?.search])

  if (isLoading) {
    return <Loader />
  }

  if (error || !data) {
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

export default Search
