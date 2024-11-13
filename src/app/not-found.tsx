import Link from 'next/link'

import { ShieldAlertIcon } from 'lucide-react'

const NotFoundPage = () => (
  <div className="flex flex-col items-center justify-center py-10 bg-red-100  ">
    <ShieldAlertIcon size={48} className="text-red-600" />

    <h1 className="text-2xl font-bold text-red-600 mt-4">Axtarışınız nəticəsiz alınıb</h1>

    <Link href="/" className="text-red-600 hover:text-red-800">
      <u>Baş səhifəyə</u> keçid edib yenidən cəhd edin
    </Link>
  </div>
)
export default NotFoundPage
