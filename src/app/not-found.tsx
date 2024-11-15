import Link from 'next/link'

import { ShieldAlertIcon } from 'lucide-react'

const NotFoundPage = () => (
  <div className="flex flex-col items-center justify-center bg-red-100 py-10">
    <ShieldAlertIcon size={48} className="text-red-600" />

    <h1 className="mt-4 text-2xl font-bold text-red-600">Axtarışınız nəticəsiz alınıb</h1>

    <Link href="/" className="text-red-600 hover:text-red-800">
      <u>Baş səhifəyə</u> keçid edib yenidən cəhd edin
    </Link>
  </div>
)
export default NotFoundPage
