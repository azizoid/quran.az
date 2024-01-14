import Link from 'next/link'
import { MdError } from 'react-icons/md'

export const dynamic = 'force-static'

const NotFoundPage = () => (
  <div className="flex flex-col items-center justify-center min-h-full py-10 bg-red-100">
    <MdError className="text-red-600 text-6xl" />
    <h1 className="text-2xl font-bold text-red-600 mt-4">Axtarışınız nəticəsiz alınıb</h1>
    <Link href="/" className="text-red-600 hover:text-red-800">
      Baş səhifəyə keçid edib yenidən cəhd edin
    </Link>
  </div>
)
export default NotFoundPage
