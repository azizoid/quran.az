import { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { useQuery } from 'react-query'
import Pagination from 'react-js-pagination'

import { MainLayout } from '@/layouts/MainLayout'

import { Loader } from '@/ui'
import { SOORAH_LIST } from '@/assets/soorah-list-object'
import { SearchAyah } from '@/components'
import { ReponseProps } from 'pages/api/search/[search]'

export const Search = () => {
  const { query } = useRouter()

  const [currentPage, setCurrentPage] = useState(1)

  const searchQuery =
    typeof query?.search === 'string' && query?.search?.length > 2 ? query?.search : undefined

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

  if (error) {
    return <div className="col-sm-12 alert alert-danger">Kəlmə tapılmamışdır</div>
  }

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    )
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
    <>
      <Head>
        <title>{`Öz Kitabını oxu | quran.az`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {data?.out.length === 0 && (
        <div className="col-sm-12 alert alert-danger">Kəlmə tapılmamışdır</div>
      )}

      {data?.out.length > 0 && (
        <ul className="list-none divide-y divide-gray-100 bg-white text-gray-700">
          {paginateLinks}

          {data?.out?.map((ayah) => {
            const sajda = SOORAH_LIST[ayah.soorah]?.sajda
            return <SearchAyah data={ayah} sajda={sajda} mark={searchQuery} key={ayah.id} />
          })}

          {paginateLinks}
        </ul>
      )}
    </>
  )
}

Search.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

// eslint-disable-next-line import/no-default-export
export default Search
