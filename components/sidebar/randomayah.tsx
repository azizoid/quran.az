import React, { useEffect, useState } from "react"

import SOORAH_LIST from "../../assets/soorahList"
import { DisplayData } from "../../lib/types"
import { Card } from "../../ui/Card/Card"
import { getApiData } from "../../utility/getApiData/getApiData"

const RandomAyah = (): JSX.Element => {
  const [out, setOut] = useState<DisplayData>({
    id: "",
    soorah: 96,
    ayah: 1,
    content: "Yaradan Rəbbinin adı ilə oxu!",
    translator: Number(process.env.DEFAULT_TRANSLATOR),
  })

  useEffect(() => {
    getApiData(`${process.env.NEXTAUTH_URL}/api/random`).then((data) => {
      if (data.success) {
        setOut(data.out)
      }
    })
  }, [])

  return (
    <Card title={`${SOORAH_LIST[out.soorah]}, ${out.ayah}`}>
      <h6 className="text-blue-400 hover:underline">
        <a href={`/${out.soorah}/${out.ayah}`}>{out.content}</a>
      </h6>
    </Card>
  )
}
export default RandomAyah
