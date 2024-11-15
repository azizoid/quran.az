import Link from 'next/link'

export const Footer = () => (
  <nav className="bg-gray-700 py-4 text-slate-300">
    <ol className="w-lg container mx-auto flex">
      <li className="active mr-6" aria-current="page">
        &copy; 2003-{new Date().getFullYear()}
      </li>
      <li className="mr-6">
        <Link href="/">Quran.az</Link>
      </li>
      <li>
        <a href="https://nam.az" target="_blank" rel="noreferrer">
          Nam.az
        </a>
      </li>
    </ol>
  </nav>
)
