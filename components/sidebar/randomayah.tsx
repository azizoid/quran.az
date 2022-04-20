import { useEffect, useState } from 'react'

import { DisplayData } from '@/lib/types'
import { Card, soorahAyahTitle } from '@/ui'
import { getApiData } from '@/utility'

export const RandomAyah = (): JSX.Element => {
  const [out, setOut] = useState<DisplayData>({
    id: '',
    soorah: 96,
    ayah: 1,
    content: 'Yaradan Rəbbinin adı ilə oxu!',
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
    <Card title={soorahAyahTitle(out.soorah, out.ayah)}>
      <h6 className="text-blue-400 hover:underline">
        <a href={`/${out.soorah}/${out.ayah}?t=${out.translator}`}>{out.content}</a>
      </h6>
    </Card>
  )
}
