'use client'
import { PaginateAyah } from '@/components/PaginateAyah/PaginateAyah'
import { Bismillah, ColoredText, SoorahCaption, soorahAyahTitle } from '@/ui'
import { PaginateSoorahList } from '@/components/PaginateSoorahList/PaginateSoorahList';


export type AyahViewProps = {
  arabic: any;
  transliteration: any;
  juz: any;
  prev: number | null;
  next: number | null;
  soorah: number;
  ayah: number;
  translator: number;
  id: string;
  detail_id: number;
  content: string;
  content_latinized: string;
}

export const AyahView = ({
  soorah, ayah, translator, content, arabic, transliteration
}: AyahViewProps) => (
  <div id="ayah">
    <SoorahCaption soorah={soorah} translator={translator} />

    <Bismillah />

    <div className="ayah-list-item flex flex-col">
      <div className="mb-4 flex items-center justify-between w-full" id="titleAndContent">
        <span className="text-gray-400">{soorahAyahTitle(soorah, ayah)}</span>
      </div>

      <div className="content" id="content">
        {content}
      </div>
    </div>
    <div className="ayah-list-item" id="transliteration">
      <ColoredText key="transliteration" content={transliteration} />
    </div>
    <div className="ayah-list-item text-3xl font-Nunito text-right" dir="rtl" id="arabic">
      {arabic}
    </div>
    <div>
      <PaginateAyah {...{ soorah, ayah, translator }} />
    </div>

    <PaginateSoorahList soorah={soorah} translator={translator} />
  </div>
)