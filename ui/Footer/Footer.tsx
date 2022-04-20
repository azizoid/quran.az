import Link from 'next/link'

export const Footer = (): JSX.Element => (
  <nav className="py-4 bg-gray-700 text-slate-300">
    <ol className="container mx-auto w-lg flex">
      <li className="active mr-6" aria-current="page">
        &copy; 2003-{new Date().getFullYear()}
      </li>
      <li className="mr-6">
        <Link href="/">
          <a>Quran.az</a>
        </Link>
      </li>
      <li>
        <a href="https://nam.az" target="_blank" rel="noreferrer">
          Nam.az
        </a>
      </li>
    </ol>
  </nav>
)
