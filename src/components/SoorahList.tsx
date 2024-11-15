import Link from 'next/link'

import { soorahList } from '@/assets/soorah-list-object'

import { RevealPlace } from './RevealPlace'

export const SoorahList = () => (
  <div className="mt-2 border-t border-gray-300">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 pt-4">
      {soorahList.map((soorah) => (
        <Link
          key={soorah.id}
          href={`/${soorah.id}`}
          className="group flex w-full overflow-hidden bg-white rounded-l-xl text-gray-600 text-sm"
          prefetch={false}
        >
          <div className="flex items-center justify-center w-14  bg-gray-50 group-hover:bg-emerald-300 group-hover:font-semibold">
            {soorah.id}
          </div>
          <div className="px-2 py-2 flex flex-row w-full items-center justify-between group-hover:bg-gray-100">
            <div className="ml-2">
              <span className="font-semibold text-base text-emerald-400 group-hover:text-emerald-600">
                {soorah.fullTitle}
              </span>
              <span>
                <RevealPlace city={soorah.city} />
              </span>
            </div>
          </div>
          <div className="flex flex-col w-40 items-center justify-center px-5 bg-gray-50 group-hover:bg-emerald-300">
            <span className="whitespace-nowrap text-lg font-semibold">{soorah.arabic}</span>
            <span className="text-xs">{soorah.ayahCount} ayə</span>
          </div>
        </Link>
      ))}
    </div>
  </div>
)
