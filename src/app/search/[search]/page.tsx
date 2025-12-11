'use client'
import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import Highlighter from 'react-highlight-words'
import useSWR from 'swr'

import type { ResponseProps } from '@/app/api/v2/search/route'
import { SOORAH_LIST } from '@/assets/soorah-list-object'
import { LoaderDots } from '@/components/LoaderDots'
import { TemplateAyahList } from '@/components/TemplateAyahList'
import { fetcher } from '@/utility/fetcher'

import { PaginateSearch } from '../components/PaginateSearch'

const SearchPage = () => {
  const params = useParams()
  const searchParams = useSearchParams()
  const translator = searchParams?.get('t')

  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  // Update search query from URL params and reset page when search changes
  useEffect(() => {
    if (typeof params?.search === 'string' && params.search.length > 2) {
      const decodedSearch = decodeURIComponent(params.search.toString())
      setSearchQuery(decodedSearch)
      setCurrentPage(1)
    }
  }, [params?.search])

  // Reset to page 1 when translator changes (new filter context)
  useEffect(() => {
    if (searchQuery.length > 2) {
      // Reset page when translator changes - reference translator to satisfy exhaustive-deps
      void translator
      setCurrentPage(1)
    }
  }, [translator, searchQuery])

  // Memoize search body - this is the key for SWR
  const searchBody = useMemo(
    () => ({
      search: searchQuery,
      page: String(currentPage),
      t: translator,
    }),
    [searchQuery, currentPage, translator]
  )

  // SWR key includes searchBody - SWR automatically refetches when key changes
  // No need for explicit mutate() calls - SWR handles this automatically
  // When searchBody changes, SWR sees a new key and automatically refetches
  const { data, error, isLoading } = useSWR<ResponseProps>(
    searchQuery.length > 2 ? ['/api/v2/search', searchBody] : null,
    ([url, body]) => fetcher([url, 'search'], body, 'POST'),
    {
      refreshInterval: 0,
      dedupingInterval: 60 * 60 * 1000, // TTL of 1 hour
      keepPreviousData: true, // Better UX - shows previous data while loading new page
    }
  )

  const paginateLinks = useMemo(() => {
    if (!data?.paginate?.total || data.paginate.total <= data?.paginate?.perPage) {
      return null
    }

    return (
      <li className="list-group-item py-2">
        <PaginateSearch
          activePage={data?.paginate.currentPage}
          itemsCountPerPage={data?.paginate.perPage}
          totalItemsCount={data?.paginate.total}
          pageRangeDisplayed={5}
          onChange={setCurrentPage}
        />
      </li>
    )
  }, [data?.paginate])

  if (isLoading) {
    return <LoaderDots />
  }

  if (error || data?.out === null) {
    return <div className="col-sm-12 alert alert-danger prose max-w-none!">Kəlmə tapılmamışdır</div>
  }

  return (
    <ul className="list-none divide-y divide-gray-100 bg-white text-gray-700">
      {paginateLinks}

      {data?.out?.map((ayah) => {
        const sajda = SOORAH_LIST[ayah.soorah]?.sajda
        const content = (
          <Highlighter
            searchWords={[searchQuery]}
            textToHighlight={ayah.content}
            autoEscape={true}
            highlightClassName="bg-warning"
          />
        )

        return <TemplateAyahList data={ayah} sajda={sajda} key={ayah.id} content={content} />
      })}

      {paginateLinks}
    </ul>
  )
}

export default SearchPage
