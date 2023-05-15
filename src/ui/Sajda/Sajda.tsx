import { GiArabicDoor } from 'react-icons/gi'
import { Tooltip } from 'src/ui/Tooltip/Tooltip'

export const Sajda = (): JSX.Element => (
  <Tooltip message="Səcdə ayəsi">
    <GiArabicDoor size={14} style={{ display: 'inline' }} />
  </Tooltip>
)
