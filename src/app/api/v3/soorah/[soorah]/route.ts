import { NextResponse } from 'next/server'

import { TRANSLATOR_LIST } from '@/assets/translatorList'
import { getSoorahService } from '@/servises/getSoorahService'

export const dynamic = 'force-static'

interface RouteContext {
  params: Promise<{
    soorah: string
  }>
  searchParams: Promise<{
    t?: string
  }>
}

export const GET = async (req: Request, segmentData: RouteContext) => {
  const soorahParam = (await segmentData.params).soorah

  const url = new URL(req.url)
  const tParam = url.searchParams.get('t') ?? '2'

  const translatorParam = ['1', '2', '3'].includes(tParam) ? tParam : 1

  try {
    const soorahContent = await getSoorahService({
      soorah: Number(soorahParam),
      translator: Number(translatorParam),
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
        'Access-Control-Allow-Origin': '*', // TODO: specify where from
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
