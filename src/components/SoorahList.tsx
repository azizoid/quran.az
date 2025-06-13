import { soorahList } from '@/assets/soorah-list-object'
import { Link } from '@/components/Link'

import { RevealPlace } from './RevealPlace'

export const SoorahList = () => (
  <div className="mt-2 border-t border-gray-300">
    <div className="grid grid-cols-1 gap-2 pt-4 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
      {soorahList.map((soorah) => (
        <Link
          key={soorah.id}
          href={`/${soorah.id}`}
          className="group flex w-full overflow-hidden rounded-l-xl bg-white/50 text-sm text-gray-600"
        >
          <div className="flex w-14 items-center justify-center  group-hover:bg-emerald-300 group-hover:font-semibold">
            {soorah.id}
          </div>
          <div className="flex w-full flex-row items-center justify-between px-2 py-2 group-hover:bg-gray-100">
            <div className="ml-2">
              <span className="text-base font-semibold text-emerald-400 group-hover:text-emerald-600">
                {soorah.fullTitle}
              </span>
              <span>
                <RevealPlace city={soorah.city} />
              </span>
            </div>
          </div>
          <div className="flex w-40 flex-col items-center justify-center bg-gray-50 px-5 group-hover:bg-emerald-300">
            <span className="whitespace-nowrap text-lg font-semibold">{soorah.arabic}</span>
            <span className="text-xs">{soorah.ayahCount} ayə</span>
          </div>
        </Link>
      ))}
    </div>
  </div>
)
