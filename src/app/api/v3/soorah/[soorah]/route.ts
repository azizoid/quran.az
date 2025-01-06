import { notFound } from 'next/navigation'
import { NextResponse } from 'next/server'

import { z } from 'zod'

import { TRANSLATOR_LIST } from '@/assets/translatorList'
import { soorahValidation, translatorValidation } from '@/helpers/validations'
import { getSoorahService } from '@/servises/getSoorahService'

const QuerySchema = z.object({
  soorah: soorahValidation,
  t: translatorValidation.refine((t) => [1, 2, 3].includes(t), {
    message: 'Translator must be one of 1, 2, or 3',
  }),
})

interface ResponseProps {
  params: Promise<{
    soorah: string
  }>
}

export const GET = async (req: Request, { params }: ResponseProps) => {
  const soorahParam = Number((await params).soorah)

  const url = new URL(req.url)
  const tParam = Number(url.searchParams.get('t'))

  const validationResult = QuerySchema.safeParse({ soorah: soorahParam, t: tParam })

  if (!validationResult.success) {
    return notFound()
  }

  const { soorah: soorahValidated, t: translatorValidated } = validationResult.data

  try {
    const soorahContent = await getSoorahService({
      soorah: soorahValidated,
      translator: translatorValidated,
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
