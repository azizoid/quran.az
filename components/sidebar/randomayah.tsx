import React, { useEffect, useState } from "react"

import soorah_list_object from "../../assets/soorah-list-object"
import { DisplayData } from "../../lib/types"
import { Card } from "../../ui/Card/Card"
import { getApiData } from "../../utility/getApiData/getApiData"

const RandomAyah = (): JSX.Element => {
  const [out, setOut] = useState<DisplayData>({
    id: "",
    soorah: 96,
    ayah: 1,
    content: "Yaradan Rəbbinin adı ilə oxu!",
    translator: Number(process.env.NEXT_PUBLIC_DEFAULT_TRANSLATOR),
  })

  useEffect(() => {
    getApiData(`/api/random`).then((data) => {
      if (data.success) {
        setOut(data.out)
      }
    })
  }, [])

  return (
    <Card title={`${soorah_list_object[out.soorah]["fullTitle"]}, ${out.ayah}`}>
      <h6 className="text-blue-400 hover:underline">
        <a href={`/${out.soorah}/${out.ayah}?t=${out.translator}`}>
          {out.content}
        </a>
      </h6>
    </Card>
  )
}
export default RandomAyah
