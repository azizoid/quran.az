'use client'

import { useState, useRef } from 'react'

import { toPng } from 'html-to-image'

import { Bismillah, SoorahCaption, soorahAyahTitle } from '@/ui'

import { AyahViewProps } from './AyahView'

type AyahPrintProps = Pick<AyahViewProps, 'soorah' | 'ayah' | 'content' | 'translator'> & {
  width?: number
  height?: number
  onDownloadStart?: () => void
  onDownloadComplete?: () => void
  onError?: (error: Error) => void
}

export const AyahPrint = ({
  soorah,
  ayah,
  content,
  translator,
  width = 540,
  height = 540,
  onDownloadStart,
  onDownloadComplete,
  onError,
}: AyahPrintProps) => {
  const printRef = useRef<HTMLDivElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleDownload = async () => {
    if (!printRef.current) return

    try {
      setIsGenerating(true)
      onDownloadStart?.()

      const dataUrl = await toPng(printRef.current, {
        width,
        height,
        quality: 1.0,
        pixelRatio: 2, // For better quality on retina displays
      })

      const link = document.createElement('a')
      const filename = `quran.az-${soorah}-${ayah}-${translator}.png`
      link.href = dataUrl
      link.download = filename
      link.click()

      onDownloadComplete?.()
    } catch (err) {
      console.error('Error generating image:', err)
      onError?.(err instanceof Error ? err : new Error('Failed to generate image'))
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        ref={printRef}
        className="flex items-center justify-center bg-white bg-[url('/img/ornament.gif')] bg-repeat-x bg-top pt-[33px] px-3"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <div className="page-template-list" id="ayahPrintComponent">
          <SoorahCaption soorah={soorah} translator={translator} />
          <Bismillah />

          <div className="ayah-list-item flex flex-col">
            <div className="mb-4 flex items-center justify-between w-full" id="titleAndContent">
              <span className="text-gray-400">{soorahAyahTitle(soorah, ayah)}</span>
            </div>

            <div>{content}</div>
            <div className="mb-4 pr-4 text-end w-full text-gray-400">
              {`https://quran.az/${soorah}/${ayah}/`}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isGenerating ? 'Generating...' : 'Download Image'}
      </button>
    </div>
  )
}
