import { SoorahListProps } from '@/assets/soorah-list-object'
import Link from 'next/link'
import { FaKaaba, FaMosque } from 'react-icons/fa'

export type SoorahListItemProps = {
  soorah: SoorahListProps
}

export const SoorahListItem = ({ soorah }: SoorahListItemProps): JSX.Element => (
  <Link href={`/${soorah.id}`}>
    <a className="group flex w-full my-4 mx-auto overflow-hidden bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-center w-14 bg-emerald-50 group-hover:bg-emerald-500 group-hover:text-white">
        {soorah.id}
      </div>

      <div className="px-4 py-2 -mx-3 flex flex-row w-full items-center justify-between">
        <div className="mx-3">
          <span className="font-semibold text-emerald-500">{soorah.title}</span>

          <p className="text-sm text-gray-600 w-full flex flex-row justify-start gap-3">
            <span className="flex gap-1 align-middle whitespace-nowrap">
              {soorah.city === 'Mecca' ? (
                <>
                  <FaKaaba size={18} className="text-gray-300 group-hover:text-gray-600" />
                  Məkkə surəsi
                </>
              ) : (
                <>
                  <FaMosque size={18} className="text-gray-300 group-hover:text-gray-600" />
                  Mədinə surəsi
                </>
              )}
            </span>
            /<span>{soorah.ayahCount} ayə</span>
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center px-5 text-right whitespace-nowrap text-lg text-gray-600 bg-emerald-50 group-hover:bg-emerald-500 group-hover:text-white">
        {soorah.arabic}
      </div>
    </a>
  </Link>
)
