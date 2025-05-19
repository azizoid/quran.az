import dynamic from 'next/dynamic'
import { notFound, redirect } from 'next/navigation'

import { sirasayi } from 'sirasayi'

import { soorahList } from '@/assets/soorah-list-object'
import { WithFormProvider } from '@/providers/WithFormProvider'
import { getView } from '@/utility/getView/getView'

import { AyahView } from './AyahView'
import { getAyahService } from './getAyahService'

const AyahPrint = dynamic(() => import('./AyahPrint').then((mod) => mod.AyahPrint), {
  loading: () => <div>Loading...</div>,
})

type AyahProps = {
  params: {
    soorah: string
    ayah: string
  }
  searchParams: {
    t: string
    share: boolean
  }
}

export const generateMetadata = async ({ params }: AyahProps) => {
  const { soorah, ayah } = params
  const soorahTitle = soorahList.find((soorahItem) => soorahItem.id === Number(soorah))

  if (!soorahTitle) return

  const title = `${soorahTitle.fullTitle}, ${sirasayi(soorahTitle.id)} surə, ${sirasayi(
    Number(ayah)
  )} ayə`

  return {
    title,
    openGraph: { title },
    twitter: { title },
  }
}

const AyahPage = async ({
  params: { soorah: soorahParam, ayah: ayahParam },
  searchParams: { t: translatorParam, share },
}: AyahProps) => {
  const {
    s: soorah,
    a: ayah,
    t: translator,
    view,
  } = getView({ s: Number(soorahParam), a: Number(ayahParam), t: Number(translatorParam) })

  if (view !== 'ayah') {
    if (view === 'soorah') {
      redirect(`/${soorah}?t=${translator}`)
    }

    notFound()
  }

  const out = await getAyahService({ soorah, ayah, translator })

  if (share !== undefined) {
    return <AyahPrint {...out} />
  }

  return (
    <WithFormProvider>
      <AyahView {...out} />
    </WithFormProvider>
  )
}

export default AyahPage
