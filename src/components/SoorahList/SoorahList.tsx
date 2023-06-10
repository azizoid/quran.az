import { soorahList } from '@/assets/soorah-list-object'

import { SoorahListItem } from './SoorahListItem'

export const SoorahList = () => (
  <div className="mt-2 border-t border-gray-300">
    {soorahList.map((soorah) => (
      <SoorahListItem key={soorah.id} soorah={soorah} />
    ))}
  </div>
)
