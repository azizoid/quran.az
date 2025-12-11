'use client'
import { useParams, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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

  // Memoize search body to prevent unnecessary re-renders
  const searchBody = useMemo(
    () => ({
      search: searchQuery,
      page: String(currentPage),
      t: translator,
    }),
    [searchQuery, currentPage, translator]
  )

  // Memoize the fetcher function
  const fetcherWithBody = useCallback(
    (url: [string, string]) => fetcher(url, searchBody, 'POST'),
    [searchBody]
  )

  const { data, error, isLoading, mutate } = useSWR<ResponseProps>(
    searchQuery?.length > 2 ? ['/api/v2/search', searchBody] : null,
    fetcherWithBody,
    {
      refreshInterval: 0,
      dedupingInterval: 60 * 60 * 1000, // TTL of 1 hour
      keepPreviousData: false,
    }
  )

  // Update search query when URL params change and reset to page 1
  useEffect(() => {
    if (typeof params?.search === 'string' && params.search.length > 2) {
      const decodedSearch = decodeURIComponent(params.search.toString())
      setSearchQuery(decodedSearch)
      setCurrentPage(1)
    }
  }, [params?.search])

  // Reset to page 1 when translator changes (new search context)
  // Only reset if we have a valid search query
  const prevTranslatorRef = useRef(translator)
  useEffect(() => {
    if (searchQuery.length > 2 && prevTranslatorRef.current !== translator) {
      setCurrentPage(1)
      prevTranslatorRef.current = translator
    }
  }, [translator, searchQuery])

  // Trigger mutate when search parameters change
  // Explicitly include all values that should trigger a refetch
  useEffect(() => {
    // Reference currentPage and translator to ensure effect runs when they change
    // translator can be null, so we only check searchQuery length
    if (searchQuery.length > 2) {
      // Reference currentPage and translator to satisfy exhaustive-deps
      void currentPage
      void translator
      mutate()
    }
  }, [searchQuery, currentPage, translator, mutate])

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
