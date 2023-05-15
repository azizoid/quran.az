import { SOORAH_LIST } from 'src/assets/soorah-list-object'
import { numberSuffixAz } from 'src/utility'

export const soorahAyahTitle = (soorah: number, ayah: number): string =>
  `${soorah}. ${SOORAH_LIST[soorah]['fullTitle']}, ${numberSuffixAz(ayah)} ayə`
