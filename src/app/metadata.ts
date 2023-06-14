import { Metadata } from 'next'

const metadataTitle = {
  template: '%s | Quran.az | Öz Kitabını oxu',
  default: 'Quran.az | Öz Kitabını oxu',
}
const metadataUrl = new URL('https://quran.az')

const metadataDescription = 'Qurani-Kərimin Azərbaycanca və Rusca tərcüməsi axtarış sistemi.'

export const MainMetadata: Metadata = {
  icons: './favicon.ico',
  title: metadataTitle,
  description: metadataDescription,
  themeColor: '#155724',
  keywords: [
    'Quran Azərbaycan dilinə tərcümə',
    'Azərbaycanca Quran kitabı',
    'Islam Azərbaycan dilində',
    'Müsəlmanların müqəddəs kitabı Azərbaycan dilində',
    'Quran Azərbaycan dilində',
    'Quran ayələrinin azərbaycanca tərcüməsi',
    'Azərbaycanda Islam və Quran',
    'Azərbaycanca Quranın onlayn tərcüməsi',
    'Quranı Azərbaycan dilində öyrənin',
    'Qurani azərbaycanca dərk etmək',
    'Azərbaycan dilində rəqəmsal Quran',
    'Onlayn Azərbaycan Quran axtarışı',
    'Quran ayələrini Azərbaycan dilində axtarın',
    'Rus və azərbaycanca Quran tərcümələri',
    'Quranı Azərbaycan dilində öyrənin',
    'Перевод Корана на азербайджанский и русском язык',
    'Книга Корана на азербайджанском и русском языке',
    'Ислам на азербайджанском и русском языке',
    'Священная книга мусульман на азербайджанском и русском языке',
    'Коран на азербайджанском и русском языке',
    'Азербайджанский перевод аятов Корана',
    'Ислам и Коран в Азербайджане',
    'Коран на азербайджанском и русском языке',
    'Изучайте Коран на азербайджанском и русском языке',
    'Понимание Корана на азербайджанском и русском языке',
    'Цифровой Коран на азербайджанском и русском языке',
    'Онлайн - поиск Корана на азербайджанском и русском языке',
    'Ищите аяты Корана на азербайджанском и русском языке',
    'Русские и азербайджанские переводы Корана',
    'Изучайте Коран на азербайджанском и русском языке',
  ],
  metadataBase: metadataUrl,
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    images: 'https://quran.az/img/kuran.jpg',
    type: 'website',
    url: metadataUrl,
  },
  twitter: {
    ...metadataTitle,
    description: metadataDescription,
    creator: '@azizoid',
    images: 'https://quran.az/img/kuran.jpg',
    card: 'summary_large_image',
  },
}
