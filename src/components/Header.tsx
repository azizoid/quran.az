import Image from 'next/image'
import { TiSocialFacebookCircular, TiSocialInstagram } from 'react-icons/ti'

import LogoSvg from '@/assets/img/logo.svg'
import { Link } from '@/components/Link'

export const Header = () => (
  <div className="bg-gray-50 bg-[url('/img/ornament.gif')] bg-bottom bg-repeat-x px-3 pb-[33px]">
    <nav className="container mx-auto flex h-12 justify-between">
      <Link
        href="/"
        className="flex content-start items-center gap-1 py-3 text-gray-500 hover:opacity-75"
      >
        <Image src={LogoSvg} alt={'Quran.az Logo'} width={32} height={32} />
        Quran.az
      </Link>

      <ul className="flex items-center gap-2">
        {/* <li>
          <Link href="https://nam.az/" target="_blank">Yeni Ramazan Təqvimi</Link>
        </li> */}
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
      </ul>
    </nav>
  </div>
)
