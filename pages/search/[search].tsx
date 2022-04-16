import React, { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router'

import Pagination from 'react-js-pagination'

import { MainLayout } from '@/layouts/MainLayout'

import { Loader } from '@/ui'
import { SearchAyah } from '@/components'
import { getApiData, PaginationProps } from '@/utility'
import { DisplayData, PageStates } from '@/lib/types'

import Head from 'next/head'

export const Search = (): JSX.Element => {
  const [paginate, setPaginate] = useState<PaginationProps>()
  const [out, setOut] = useState<DisplayData[]>()
  const [pageState, setPageState] = useState(PageStates.EMPTY)
  const [page, setPage] = useState(1)

  const router = useRouter()
  const query = router.query.search?.toString()
  const translator = router.query.t?.toString() || process.env.NEXT_PUBLIC_DEFAULT_TRANSLATOR

  const getData = useCallback(async () => {
    setPageState(PageStates.LOADING)

    await getApiData(`/api/search/${query}?page=${page}&t=${translator}`)
      .then(({ out, paginate, success }) => {
        if (success) {
          setOut(out)
          setPaginate({
            ...paginate,
            currentPage: Number(paginate.currentPage),
          })
          setPageState(PageStates.SEARCH)
        } else throw new Error('not found')
      })
      .catch(() => setPageState(PageStates.NOT_FOUND))
  }, [page, query, translator])

  useEffect(() => {
    setPage(1)
  }, [query])

  useEffect(() => {
    getData()
  }, [getData])

  if (pageState === PageStates.NOT_FOUND) {
    return (
      <MainLayout>
        <div className="col-sm-12 alert alert-danger">Kəlmə tapılmamışdır</div>
      </MainLayout>
    )
  }

  if (pageState === PageStates.LOADING) {
    return (
      <MainLayout>
        <Loader />
      </MainLayout>
    )
  }

  const paginateLinks = paginate?.total > paginate?.perPage && (
    <li className="list-group-item">
      <Pagination
        activePage={paginate.currentPage}
        itemsCountPerPage={paginate.perPage}
        totalItemsCount={paginate.total}
        pageRangeDisplayed={5}
        innerClass="pagination"
        itemClass="pagination-item"
        activeClass="pagination-active"
        onChange={setPage}
        hideDisabled={true}
      />
    </li>
  )

  return (
    <MainLayout>
      <Head>
        <title>Öz Kitabını oxu | quran.az</title>
      </Head>
      <ul className="list-none divide-y divide-gray-100 bg-white text-gray-700">
        {paginateLinks}

        {out?.map((ayah) => (
          <SearchAyah data={ayah} mark={query} key={ayah.id} />
        ))}

        {paginateLinks}
      </ul>
    </MainLayout>
  )
}

// eslint-disable-next-line import/no-default-export
export default Search
