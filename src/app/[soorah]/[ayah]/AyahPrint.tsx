'use client'

import { Bismillah, SoorahCaption, soorahAyahTitle } from "@/ui";
import { AyahViewProps } from "./AyahView";
import { useEffect, useRef } from "react";
import { toPng } from 'html-to-image';


export const AyahPrint = ({ soorah, ayah, content, translator }: Pick<AyahViewProps, 'soorah' | 'ayah' | 'content' | 'translator'>) => {
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (printRef.current) {
        toPng(printRef.current, { width: 540, height: 540 })
          .then((dataUrl) => {
            const link = document.createElement('a');
            const filename = `quran.az-${soorah}-${ayah}-${translator}.png`;
            link.href = dataUrl;
            link.download = filename;
            link.click();
          })
          .catch((err) => {
            console.error('Error generating image', err);
          });
      }
    }
  }, [])

  return (
    <div
      ref={printRef}
      className="w-[540px] h-[540px] flex items-center justify-center bg-white"
    >
      <div className="page-template-list" id="ayahPrintComponent">
        <SoorahCaption soorah={soorah} translator={translator} />
        <Bismillah />

        <div className="ayah-list-item flex flex-col">
          <div className="mb-4 flex items-center justify-between w-full" id="titleAndContent">
            <span className="text-gray-400">{soorahAyahTitle(soorah, ayah)}</span>
          </div>

          <div>
            {content}
          </div>
          <div className="mb-4 pr-4 text-end w-full text-gray-400">
            {`https://quran.az/${soorah}/${ayah}/`}
          </div>

        </div>
      </div>
    </div>
  )
}