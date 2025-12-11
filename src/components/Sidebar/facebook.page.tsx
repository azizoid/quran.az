import Image from 'next/image'
import Link from 'next/link'
import { FaFacebookSquare, FaInstagramSquare } from 'react-icons/fa'

import { Card } from '@/components/Card'

import fbPageLogo from '../../assets/img/fb-page-logo.jpg'

export const FacebookPage = () => (
  <Card title="BİZİ BƏYƏN" className='relative bg-[url("/img/kuran.jpg")] bg-cover'>
    <div className="absolute inset-0 bg-black opacity-30" />
    <div className="relative z-10 flex h-40 w-full flex-col justify-between p-2">
      <div className="flex flex-row gap-2">
        <div className="h-16 w-16 border-2 bg-sky-500">
          <Image
            src={fbPageLogo}
            alt="facebook page"
            width={64}
            height={64}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex grow flex-col font-semibold text-white">
          <span className="text-lg">quran.az</span>
          <span className="text-xs">8.255 followers</span>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <Link
          href="https://facebook.com/quranaz"
          target="_blank"
          className="flex flex-row items-center gap-1 bg-white px-1.5 py-0.5 font-bold"
        >
          <FaFacebookSquare size="16" /> Follow on Facebook
        </Link>
        <Link
          href="https://instagram.com/quranaz"
          target="_blank"
          className="flex flex-row items-center gap-1 bg-white px-1.5 py-0.5 font-bold"
        >
          <FaInstagramSquare size="16" /> Follow on Instagram
        </Link>
      </div>
    </div>
  </Card>
)
