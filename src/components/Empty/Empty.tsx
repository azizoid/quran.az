import Link from 'next/link'

import { Card } from '@/ui'
import { SoorahList } from 'src/components'

export const Empty = (): JSX.Element => (
  <div className="space-y-4">
    <ol className="py-2 w-full flex justify-center text-gray-500 space-x-5 text-sm md:text-base">
      <li>
        <Link href="/1">Fatihə surəsi</Link>
      </li>
      <li>
        <Link href="/36">Ya-sin surəsi</Link>
      </li>
      <li>
        <Link href="/55">Ər-Rəhman surəsi</Link>
      </li>
      <li>
        <Link href="/67">Əl-Mülk surəsi</Link>
      </li>
      <li>
        <Link href="/2/255">Ayətul-Kürsi</Link>
      </li>
    </ol>

    <SoorahList />

    <div className="col">
      <h6 className="alert alert-success">
        Axtarışınızın <strong>uğurlu</strong> olması üçün aşağıdakı <strong>qaydalara</strong>{' '}
        riayət edin:
      </h6>
    </div>

    <div className="grid grid-1 md:grid-cols-3 gap-2 py-4">
      <Card title="	İstifadə qaydaları" size="small">
        quran.az/<code>[surə]</code>
        <br />
        quran.az/<code>[surə]</code>/<code>[ayə]</code>
        <br />
        quran.az/search/<code>[kəlmə]</code>
      </Card>
      <Card title="Hərf səhvləri" size="small">
        Axtarış zamanı etdiyiniz qrammatik səhvlər sözlərin tapılmamasına səbəb ola bilər
        <br />
        Məsələn: <code>mekke</code> əvəzinə <code>Məkkə</code> sözünü axtarın
      </Card>
      <Card title="Fərqli söz və tərcümə" size="small">
        Axtardığınız fikir tərcümədə olmaya bilər; <br />
        Müəlliflərdən qaynaqlanaraq tərcümələrdəki sözlər və fikirlər fərqli ola bilər
      </Card>
    </div>
  </div>
)
