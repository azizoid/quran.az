export const buildUrl = (soorah: number, ayah?: number, translator?: number): string => {
  const ayahPart = ayah ? `/${ayah}` : ''
  const translatorPart = translator ? `?t=${translator}` : ''
  return `/${soorah}${ayahPart}${translatorPart}`
}
