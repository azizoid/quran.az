import { GiArabicDoor } from 'react-icons/gi'
import { Tooltip } from 'ui/Tooltip/Tooltip'

export const Sajda = (): JSX.Element => (
  <Tooltip message="Səcdə ayəsi">
    <GiArabicDoor size={14} style={{ display: 'inline' }} />
  </Tooltip>
)