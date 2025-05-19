import fs from 'fs'
import path from 'path'
import puppeteer from 'puppeteer'

import { DisplayData } from '@/lib/types'
import { soorahAyahTitle } from '@/ui'
import { fileNameNormalizer } from '@/utility/exportedImageFileName'

type ExportAyahProps = Pick<DisplayData, 'soorah' | 'ayah' | 'content' | 'translator'>

export const exportAyah = async ({ soorah, ayah, content, translator }: ExportAyahProps) => {
  try {
    const filePath = path.join(
      process.cwd(),
      'public',
      'images',
      fileNameNormalizer({ soorah, ayah, translator })
    )

    if (fs.existsSync(filePath)) {
      console.log('File already exists:', filePath)
      return filePath
    }

    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    const htmlContent = `
      <html>
        <body style="font-family: ui-sans-serif, system-ui, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0;">
          <div style="text-align: center; margin: 20px;">&#65021;</div>

          <div style="text-align: center; margin: 20px;">
              <h3 style="font-size: 18px; margin: 0; color: #555; line-height: 1.6;">${soorahAyahTitle(soorah, ayah)}</h3>
              <p style="font-size: 16px; margin: 10px 0; color: #333; line-height: 1.8;">${content}</p>
          </div>

          <p style="text-align: center; color: #333; margin: 20px;">https://quran.az/${soorah}/${ayah}</p>
        </body>
      </html>`

    await page.setContent(htmlContent)
    const screenshotBuffer = await page.screenshot({ type: 'png', omitBackground: true })

    await browser.close()

    // Ensure the directory exists
    fs.mkdirSync(path.dirname(filePath), { recursive: true })

    // Save the image to the file system
    fs.writeFileSync(filePath, screenshotBuffer)

    return filePath // Return the path to the newly created image
  } catch (error) {
    console.error('Error generating image', error)
  }
}
