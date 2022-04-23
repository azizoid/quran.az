import { SoorahListProps } from '@/assets/soorah-list-object'
import Link from 'next/link'

export type SoorahListItemProps = {
  soorah: SoorahListProps
}

export const SoorahListItem = ({ soorah }: SoorahListItemProps): JSX.Element => (
  <Link href={`/${soorah.id}`}>
    <a className="flex w-full my-4 mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex items-center justify-center w-12 bg-emerald-50 hover:bg-emerald-500">
        <span className="badge badge-white">{soorah.id}</span>
      </div>

      <div className="px-4 py-2 -mx-3">
        <div className="mx-3">
          <span className="font-semibold text-emerald-500 dark:text-emerald-400">
            {soorah.title}
          </span>
          <p className="text-sm text-gray-600 dark:text-gray-200">{soorah.fullTitle}</p>
          <span className="text-sm text-gray-600 dark:text-gray-200">{soorah.ayahCount} ayə</span>
        </div>
      </div>
    </a>
  </Link>
)
