import { NextResponse } from 'next/server'

import { soorahList } from '@/assets/soorah-list-object'
import { selectRandomItems } from '@/utility/selectRandomItems'

export const revalidate = 10

export async function GET() {
  const randomItems = selectRandomItems(soorahList, 5)
  return NextResponse.json(randomItems)
}
