import { notFound } from 'next/navigation'
import { NextResponse } from 'next/server'

import { TRANSLATOR_LIST } from '@/assets/translatorList'
import { getSoorahService } from '@/servises/getSoorahService'

interface ResponseProps {
  params: Promise<{
    soorah: string
  }>
}

export const GET = async (req: Request, { params }: ResponseProps) => {
  const soorahParam = Number((await params).soorah)

  const url = new URL(req.url)
  const tParam = Number(url.searchParams.get('t'))

  if (!(soorahParam > 1 && soorahParam < 114 && [1, 2, 3].includes(tParam))) {
    return notFound()
  }

  try {
    const soorahContent = await getSoorahService({
      soorah: Number(soorahParam),
      translator: tParam,
    })

    const result = soorahContent.map(({ soorah, ayah, content, translator }) => ({
      soorah,
      ayah,
      content,
      translator: TRANSLATOR_LIST[translator],
    }))

    return Response.json(result, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // TODO: specify allowed origins
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
