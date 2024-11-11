import { soorahList } from '@/assets/soorah-list-object'

import Link from 'next/link'
import { CityAndSize } from '../CityAndSize/CityAndSize'

export const SoorahList = () => (
  <div className="mt-2 border-t border-gray-300">
    {soorahList.map((soorah) => (
      <Link
        key={soorah.id}
        href={`/${soorah.id}`}
        className="group flex w-full my-4 mx-auto overflow-hidden bg-white rounded-lg shadow-md"
        prefetch={false}
      >
        <div className="flex items-center justify-center w-14 bg-emerald-100 group-hover:bg-emerald-500 group-hover:text-white">
          <span className="px-2 py-1 rounded-full bg-white group-hover:text-black">{soorah.id}</span>
        </div>
        <div className="px-4 py-2 -mx-3 flex flex-row w-full items-center justify-between">
          <div className="mx-3">
            <span className="font-semibold text-emerald-400 group-hover:text-emerald-600">
              {soorah.fullTitle}
            </span>

            <p className="text-sm text-gray-600 w-full flex flex-row justify-start gap-3">
              <CityAndSize city={soorah.city} ayahCount={soorah.ayahCount} size="md" />
            </p>
          </div>
        </div>
        <div className="flex w-40 items-center justify-center px-5 text-right whitespace-nowrap text-lg text-gray-600 bg-emerald-50 group-hover:bg-emerald-500 group-hover:text-white">
          {soorah.arabic}
        </div>
      </Link>
    ))}
  </div>
)
