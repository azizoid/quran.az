import Link from 'next/link'
import { Card } from '../../ui/Card/Card'

export const Empty = (): JSX.Element => (
  <div className="space-y-4">
    <ol className="py-2 w-full flex justify-center text-gray-500 space-x-5 text-sm md:text-base">
      <li>
        <Link href="/1">
          <a>Fatihə surəsi</a>
        </Link>
      </li>
      <li>
        <Link href="/36">
          <a>Ya-sin surəsi</a>
        </Link>
      </li>
      <li>
        <Link href="/55">
          <a>Ər-Rəhman surəsi</a>
        </Link>
      </li>
      <li>
        <Link href="/67">
          <a>Əl-Mülk surəsi</a>
        </Link>
      </li>
      <li>
        <Link href="/2/255">
          <a>Ayətul-Kürsi</a>
        </Link>
      </li>
    </ol>

    <div className="col">
      <h6 className="alert alert-success">
        Axtarışınızın <strong>uğurlu</strong> olması üçün aşağıdakı{' '}
        <strong>qaydalara</strong> riayət edin:
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
        Axtarış zamanı etdiyiniz qrammatik səhvlər sözlərin tapılmamasına səbəb
        ola bilər
        <br />
        Məsələn: <code>mekke</code> əvəzinə <code>Məkkə</code> sözünü axtarın
      </Card>
      <Card title="Fərqli söz və tərcümə" size="small">
        Axtardığınız fikir tərcümədə olmaya bilər; <br />
        Müəlliflərdən qaynaqlanaraq tərcümələrdəki sözlər və fikirlər fərqli ola
        bilər
      </Card>
    </div>
  </div>
)

export default Empty
