'use client'

// import { Card } from '../Card'

import { FacebookPage } from './facebook.page'
// import { PrayerWidget } from './prayer.widget'
import { RandomAyah } from './randomayah'

export const Sidebar = () => (
  <div className="text-small col-span-12 mx-4 flex flex-col justify-items-start gap-y-4 lg:col-span-4">
    <RandomAyah />
    <hr />
    <FacebookPage />
    {/*
    <div className="prose max-w-none! alert alert-success">
      Axtarışınızın <strong>uğurlu</strong> olması üçün aşağıdakı <strong>qaydalara</strong> riayət
      edin:
    </div>

    <div className="space-y-2">
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
    </div> */}
  </div>
)
