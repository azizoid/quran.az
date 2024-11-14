import Image from 'next/image'
import Link from 'next/link'
import { FaFacebookSquare, FaInstagramSquare } from 'react-icons/fa'

import { Card } from '@/components/Card'

import fbPageLogo from '../../assets/img/fb-page-logo.jpg'

export const FacebookPage = () => (
  <Card title="BİZİ BƏYƏN" className='bg-[url("/img/kuran.jpg")] bg-cover relative'>
    <div className="absolute inset-0 bg-black opacity-30" />
    <div className="flex w-full h-40 flex-col justify-between p-2 relative z-10">
      <div className="flex flex-row gap-2">
        <div className="h-16 w-16 bg-sky-500 border-2">
          <Image src={fbPageLogo} alt="facebook page" />
        </div>
        <div className="grow flex flex-col text-white font-semibold">
          <span className="text-lg">quran.az</span>
          <span className="text-xs">8.255 followers</span>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <Link
          href="https://facebook.com/quranaz"
          target="_blank"
          className="bg-white flex flex-row items-center py-0.5 px-1.5 gap-1 font-bold"
        >
          <FaFacebookSquare size="16" /> Follow on Facebook
        </Link>
        <Link
          href="https://instagram.com/quranaz"
          target="_blank"
          className="bg-white flex flex-row items-center py-0.5 px-1.5 gap-1 font-bold"
        >
          <FaInstagramSquare size="16" /> Follow on Instagram
        </Link>
      </div>
    </div>
  </Card>
)
