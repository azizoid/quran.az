import { numberSuffixAz } from "../numberSuffixAz/numberSuffixAz";

export const soorahAyahTitle = (soorah: number, ayah: number): string => `${numberSuffixAz(soorah)} surə, ${numberSuffixAz(ayah)} ayə`