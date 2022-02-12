import { GetServerSideProps } from "next"
import Head from "next/head"
import { MainLayout } from "../../layouts/MainLayout"
import { ColoredText } from "../../ui/ColoredText/ColoredText"

import soorah_list_object from "../../assets/soorah-list-object"

import { getApiData } from "../../utility/getApiData/getApiData"
import { PageStates } from "../../lib/types"
import { Bismillah } from "../../ui/Bismillah/Bismillah"
import { PaginateAyah } from "../../ui/PaginateAyah/PaginateAyah"
import { SoorahCaption } from "../../components/SoorahCaption/SoorahCaption"

export const Ayah = ({ out, error }) => {
  if (error === PageStates.NOT_FOUND) {
    return (
      <MainLayout>
        <div className="col-sm-12 alert alert-danger">Ayə tapılmamışdır</div>
      </MainLayout>
    )
  }

  const {
    soorah,
    ayah,
    content,
    translator,
    arabic,
    transliteration,
    prev,
    next,
  } = out

  return (
    <MainLayout>
      <Head>
        <title>
          {`${soorah_list_object[soorah]["fullTitle"]} surəsi, ayə ${ayah}, 
           | Öz Kitabını oxu | quran.az`}
        </title>
        <meta name="description" content={content} />
      </Head>

      <ul className="list-none divide-y divide-gray-100 bg-white text-gray-700 mb-4">
        <SoorahCaption soorah={soorah} translator={translator} />
        {soorah !== 1 && ayah !== 1 && <Bismillah />}
        <li className="ayah-list-item flex flex-col">
          <span className="text-gray-400">
            {soorah}:{ayah}
          </span>
          {content}
        </li>
        <li className="ayah-list-item ">
          <ColoredText key="transliteration" content={transliteration} />
        </li>
        <li
          className="ayah-list-item text-3xl font-Nunito text-right"
          dir="rtl"
        >
          {arabic}
        </li>
        <li>
          <PaginateAyah {...{ soorah, ayah, prev, next, translator }} />
        </li>
      </ul>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const soorah = query.soorah
  const ayah = query.ayah
  const translator =
    query?.t?.toString() || process.env.NEXT_PUBLIC_DEFAULT_TRANSLATOR

  const res = await getApiData(`/api/${soorah}/${ayah}?t=${translator}`)

  if (res?.success) {
    return {
      props: {
        error: "",
        out: res.out,
        data: res.data,
      },
    }
  }

  return {
    props: {
      error: PageStates.NOT_FOUND,
      out: {},
      data: { s: 0, a: "", translator },
    },
  }
}

export default Ayah
