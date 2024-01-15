import Link from 'next/link'
import { MdError } from 'react-icons/md'

import { WithFormProvider } from '@/providers/WithFormProvider'

export const dynamic = 'force-static'

const NotFoundPage = () => (
  <WithFormProvider>
    <div className="flex flex-col items-center justify-center py-10 bg-red-100  ">
      <MdError className="text-red-600 text-6xl" />

      <h1 className="text-2xl font-bold text-red-600 mt-4">Axtarışınız nəticəsiz alınıb</h1>

      <Link href="/" className="text-red-600 hover:text-red-800">
        Baş səhifəyə keçid edib yenidən cəhd edin
      </Link>
    </div>
  </WithFormProvider>
)
export default NotFoundPage
