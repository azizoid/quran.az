import { SOORAH_LIST as soorahList } from '@/assets/soorah-list-object'
import { SoorahListItem } from '../SoorahLIstItem/SoorahListItem'

export const SoorahList = () => (
  <div className="mt-2 border-t border-gray-300">
    {soorahList.map((soorah) => (
      <SoorahListItem key={soorah.id} soorah={soorah} />
    ))}
  </div>
)
