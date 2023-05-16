import { sirasayi } from 'sirasayi'

import { SOORAH_LIST } from 'src/assets/soorah-list-object'

export const soorahAyahTitle = (soorah: number, ayah: number): string =>
  `${soorah}. ${SOORAH_LIST[soorah]['fullTitle']}, ${sirasayi(ayah)} ayə`
