import Image from 'next/image'
import Link from 'next/link'
import { TiSocialFacebookCircular, TiSocialInstagram, TiSocialGithub } from 'react-icons/ti'

import LogoSvg from '@/assets/img/logo.svg'

export const Header = () => (
  <div className="bg-[url('/img/ornament.gif')] bg-gray-50 bg-repeat-x bg-bottom pb-[33px] px-3">
    <nav className="h-12 container mx-auto flex justify-between">
      <Link
        href="/"
        className="py-3 flex gap-1 items-center content-start text-gray-500 hover:opacity-75"
        prefetch={false}
      >
        <Image src={LogoSvg} alt={'Quran.az Logo'} width={32} />
        Quran.az
      </Link>

      <ul className="flex items-center gap-2">
        <li>
          <a href="https://facebook.com/quranaz" target="_blank" rel="noreferrer">
            <TiSocialFacebookCircular color="#4267B2" size="24" />
          </a>
        </li>
        <li>
          <a href="https://instagram.com/quranaz" target="_blank" rel="noreferrer">
            <TiSocialInstagram color="#E1306C" size="24" />
          </a>
        </li>
        <li>
          <a href="https://github.com/azizoid/quran.az" target="_blank" rel="noreferrer">
            <TiSocialGithub color="#000" size="24" />
          </a>
        </li>
      </ul>
    </nav>
  </div>
)
