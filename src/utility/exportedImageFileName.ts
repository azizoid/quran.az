import { DisplayData } from "@/lib/types";

type FileNameNormalizerProps = Pick<DisplayData, 'soorah' | 'ayah' | 'translator'>

export const fileNameNormalizer = ({ soorah, ayah, translator }: FileNameNormalizerProps) =>
  `quran.az-${soorah}-${ayah}-${translator}.png`