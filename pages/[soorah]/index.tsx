import React from "react"
import Head from "next/head"
import { GetServerSideProps } from "next"

import { MainLayout } from "../../layouts/MainLayout"
import { SoorahAyah } from "../../components/SoorahAyah/SoorahAyah"

import soorah_list_object from "../../assets/soorah-list-object"
import { getApiData } from "../../utility/getApiData/getApiData"
import { DisplayData, PageStates } from "../../lib/types"
import { Bismillah } from "../../ui/Bismillah/Bismillah"

export const Soorah = ({ out, data, error }): JSX.Element => {
  if (error === PageStates.NOT_FOUND) {
    return (
      <MainLayout>
        <div className="text-center">
          <div className="col-sm-12 alert alert-danger">Surə tapılmamışdır</div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <Head>
        <title>
          {soorah_list_object[data.s]["title"]} surəsi | Öz Kitabını oxu |
          quran.az
        </title>
        <meta
          name="description"
          content={out
            .slice(0, 15)
            .map(({ content }) => content)
            .join(" ")}
        />
      </Head>
      <ul className="list-none divide-y divide-gray-100 bg-white text-gray-700">
        {data.s !== 9 && <Bismillah />}
        {out.map((data: DisplayData) => (
          <SoorahAyah data={data} key={data.id} />
        ))}
      </ul>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params, query } = context
  const translator =
    query?.t?.toString() || process.env.NEXT_PUBLIC_DEFAULT_TRANSLATOR
  console.log(translator)

  const res = await getApiData(`/api/${params.soorah}?t=${translator}`)

  if (!res?.out.length) {
    return {
      props: {
        error: PageStates.NOT_FOUND,
        out: [],
        data: { s: 0, a: "", translator },
      },
    }
  }

  return {
    props: {
      error: "",
      out: res.out,
      data: res.data,
    },
  }
}

export default Soorah
