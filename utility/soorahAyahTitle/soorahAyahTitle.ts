import { numberSuffixAz } from "../numberSuffixAz/numberSuffixAz";
import soorah_list_object from "../../assets/soorah-list-object"

export const soorahAyahTitle = (soorah: number, ayah: number): string =>
  `${soorah}. ${soorah_list_object[soorah]["fullTitle"]
  }, ${numberSuffixAz(ayah)} ayə`