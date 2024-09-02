import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

import { DisplayData } from "@/lib/types";
import { soorahAyahTitle } from "@/ui";
import { fileNameNormalizer } from '@/utility/exportedImageFileName';

type ExportAyahProps = Pick<DisplayData, 'soorah' | 'ayah' | 'content' | 'translator'>

export const exportAyah = async ({ soorah, ayah, content, translator }: ExportAyahProps) => {
  try {
    const filePath = path.join(process.cwd(), 'public', 'images', fileNameNormalizer({ soorah, ayah, translator }));

    if (fs.existsSync(filePath)) {
      console.log('File already exists:', filePath);
      return filePath;
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const htmlContent = `
    <html>
      <body style="width: 540px; height: 540px; display: flex; align-items: center; justify-content: center; background-color: white;">
        <div style="text-align: center;">
          <div>
            <h2>${soorahAyahTitle(soorah, ayah)}</h2>
            <p>${content}</p>
            <p>Bismillah</p>
            <p>${translator}</p>
            <p style="color: gray;">https://quran.az/${soorah}/${ayah}</p>
          </div>
        </div>
      </body>
    </html>
  `;

    await page.setContent(htmlContent);
    const screenshotBuffer = await page.screenshot({ type: 'png', omitBackground: true });

    await browser.close();

    // Ensure the directory exists
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    // Save the image to the file system
    fs.writeFileSync(filePath, screenshotBuffer);

    return filePath; // Return the path to the newly created image
  } catch (error) {
    console.error('Error generating image', error);
  }
}