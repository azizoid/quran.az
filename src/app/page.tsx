import Link from 'next/link'

import { Card } from '@/components/Card/Card'
import { SoorahList } from '@/components/SoorahList/SoorahList'

const topLinks = [
  ['/1', 'Fatihə surəsi'],
  ['/36', 'Ya-sin surəsi'],
  ['/55', 'Ər-Rəhman surəsi'],
  ['/67', 'Əl-Mülk surəsi'],
  ['/2/255', 'Ayətul-Kürsi'],
]

const Home = () => (
  <div className="space-y-4">
    <ol className="py-2 w-full flex justify-center text-gray-500 space-x-5 text-sm md:text-base">
      {topLinks.map(([url, urlText]) => (
        <li key={url}>
          <Link href={url} prefetch={false}>
            {urlText}
          </Link>
        </li>
      ))}
    </ol>

    <SoorahList />

    <div className="prose !max-w-none alert alert-success">
      Axtarışınızın <strong>uğurlu</strong> olması üçün aşağıdakı <strong>qaydalara</strong> riayət
      edin:
    </div>

    <div className="grid grid-1 md:grid-cols-3 gap-2 py-4">
      <Card title="İstifadə qaydaları">
        quran.az/<code>[surə]</code>
        <br />
        quran.az/<code>[surə]</code>/<code>[ayə]</code>
        <br />
        quran.az/search/<code>[kəlmə]</code>
      </Card>

      <Card title="Hərf səhvləri">
        Axtarış zamanı etdiyiniz qrammatik səhvlər sözlərin tapılmamasına səbəb ola bilər
        <br />
        Məsələn: <code>mekke</code> əvəzinə <code>Məkkə</code> sözünü axtarın
      </Card>

      <Card title="Fərqli söz və tərcümə">
        Axtardığınız fikir tərcümədə olmaya bilər; <br />
        Müəlliflərdən qaynaqlanaraq tərcümələrdəki sözlər və fikirlər fərqli ola bilər
      </Card>
    </div>
  </div>
)

export default Home
