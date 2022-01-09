import React from "react"
import Head from "next/head"
import { GetStaticPaths, GetStaticProps } from "next"

import { MainLayout } from "../../layouts/MainLayout"
import { SoorahAyah } from "../../components/SoorahAyah/SoorahAyah"

import SOORAH_LIST from "../../assets/soorahList"
import { getApiData } from "../../utility/getApiData/getApiData"
import { DisplayData, PageStates } from "../../lib/types"

export const Soorah = ({ out, data, error }): JSX.Element => {
  if (error === PageStates.NOT_FOUND) {
    return (
      <MainLayout>
        <div className="text-center">
          <div className="col-sm-12 alert alert-danger">
            Sura nije pronađena
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <Head>
        <title>
          Sura {SOORAH_LIST[data.s]} | Čitaj svoju knjigu | mojkuran.com
        </title>
        <meta
          name="description"
          content={out
            .slice(0, 15)
            .map((ayah) => ayah.content)
            .join(" ")}
        />
      </Head>
      <ul className="list-group list-group-flush">
        {data.s !== 9 && (
          <li className="list-group-item">
            <h3 className="text-center">&#65021;</h3>
          </li>
        )}
        {out.map((data: DisplayData) => (
          <SoorahAyah data={data} key={data.id} />
        ))}
      </ul>
    </MainLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Array.from({ length: 114 }, (_, i) => i + 1).map((soorah) => ({
    params: { soorah: soorah.toString() },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context

  const res = await getApiData(
    `${process.env.NEXTAUTH_URL}/api/${params.soorah}`
  )

  if (!res?.out.length) {
    return {
      props: {
        error: PageStates.NOT_FOUND,
        out: [],
        data: { s: 0, a: "" },
      },
    }
  }
  console.log(res.data)
  return {
    props: {
      error: "",
      out: res.out,
      data: res.data,
    },
  }
}

export default Soorah