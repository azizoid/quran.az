'use client'
import { useEffect, useState } from 'react'

import { useParams, useSearchParams } from 'next/navigation'

import Pagination from 'react-js-pagination'
import useSWR from 'swr'

import { ResponseProps } from '@/app/api/v2/search/route'
import { SOORAH_LIST } from '@/assets/soorah-list-object'
import { SearchAyah } from '@/components/SearchAyah/SearchAyah'
import { fetcher } from '@/utility/fetcher'

const Search = () => {
  const params = useParams()
  const searchParams = useSearchParams()

  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  const translator = searchParams?.get('t')

  const searchBody = {
    search: searchQuery,
    page: String(currentPage),
    t: translator
  }

  const { data, error, mutate } = useSWR<ResponseProps>(
    ['/api/v2/search', searchBody],
    searchQuery?.length > 2 ? (url: string) => fetcher(url[0], searchBody, 'POST') : null,
    {
      refreshInterval: 0,
      dedupingInterval: 60 * 60 * 1000, // TTL of 1 hour
      keepPreviousData: false,
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

  if (error || data?.error) {
    return <div className="col-sm-12 alert alert-danger">Kəlmə tapılmamışdır</div>
  }

  const paginateLinks =
    data?.paginate?.total && data.paginate.total > data?.paginate?.perPage ? (
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
