import { useEffect, useState, useCallback, ReactElement } from 'react'
import { useRouter } from 'next/router'

import Pagination from 'react-js-pagination'

import { MainLayout } from '@/layouts/MainLayout'

import { Loader } from '@/ui'
import { SearchAyah } from '@/components'
import { getApiData, PaginationProps } from '@/utility'
import { DisplayData, PageStates } from '@/lib/types'

import Head from 'next/head'
import { SOORAH_LIST } from '@/assets/soorah-list-object'

export const Search = (): JSX.Element => {
  const [paginate, setPaginate] = useState<PaginationProps>()
  const [out, setOut] = useState<DisplayData[]>()
  const [pageState, setPageState] = useState(PageStates.EMPTY)
  const [page, setPage] = useState(1)

  const router = useRouter()
  const query =
    typeof router.query?.search === 'string' && router.query?.search?.length > 2
      ? router.query?.search
      : undefined

  const translator =
    Number(router.query.t?.toString()) || process.env.NEXT_PUBLIC_DEFAULT_TRANSLATOR

  const getData = useCallback(async () => {
    setPageState(PageStates.LOADING)

    if (!query) {
      setPageState(PageStates.NOT_FOUND)
      return
    }

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
    return <div className="col-sm-12 alert alert-danger">Kəlmə tapılmamışdır</div>
  }

  if (pageState === PageStates.LOADING) {
    return <Loader />
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
    <>
      <Head>
        <title>{`Öz Kitabını oxu | quran.az`}</title>
      </Head>
      <ul className="list-none divide-y divide-gray-100 bg-white text-gray-700">
        {paginateLinks}

        {out?.map((ayah) => {
          const sajda = SOORAH_LIST[ayah.soorah]?.sajda
          return <SearchAyah data={ayah} sajda={sajda} mark={query} key={ayah.id} />
        })}

        {paginateLinks}
      </ul>
    </>
  )
}

Search.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

// eslint-disable-next-line import/no-default-export
export default Search
