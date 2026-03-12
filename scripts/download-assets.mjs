#!/usr/bin/env node
/**
 * Скачивает ассеты по URL в public/images и public/videos.
 * Запуск: node scripts/download-assets.mjs
 * Для Figma-ссылок может потребоваться авторизация в браузере — тогда
 * скачайте файлы вручную по списку ниже и положите в public/images.
 */

import fs from 'fs';
import path from 'path';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { Readable } from 'stream';

const BASE = path.resolve(process.cwd(), 'public');
const IMAGES = path.join(BASE, 'images');
const VIDEOS = path.join(BASE, 'videos');

const ASSETS = [
  { url: 'https://www.figma.com/api/mcp/asset/82dc3410-af93-4256-8b32-df98a9fcb608', file: path.join(IMAGES, 'logo.png') },
  { url: 'https://www.figma.com/api/mcp/asset/f221297b-9e7b-4be5-a3e2-dab2780f2bf6', file: path.join(IMAGES, 'hero-bg.png') },
  { url: 'https://www.figma.com/api/mcp/asset/e3daf78b-08c3-4e8b-ae52-fb3990678c73', file: path.join(IMAGES, 'hero-play-circle.png') },
  { url: 'https://www.figma.com/api/mcp/asset/cec4425b-0a8d-42d3-9046-62b6587e556b', file: path.join(IMAGES, 'hero-play-icon.png') },
  { url: 'https://www.figma.com/api/mcp/asset/fef33872-7387-4293-9083-c18246ce487b', file: path.join(IMAGES, 'search-icon.png') },
  { url: 'https://www.figma.com/api/mcp/asset/30a1bd5b-59d2-496a-8320-383354a63f50', file: path.join(IMAGES, 'cart-icon.png') },
  { url: 'https://www.figma.com/api/mcp/asset/ba771f27-b385-4a91-9b4a-16eeca0d1718', file: path.join(IMAGES, 'process1.png') },
  { url: 'https://www.figma.com/api/mcp/asset/d1c621b2-e68f-483e-876b-ea5e41f6b887', file: path.join(IMAGES, 'process2.png') },
  { url: 'https://www.figma.com/api/mcp/asset/f5798a95-393b-4b7b-8f38-b40bd89a87d1', file: path.join(IMAGES, 'process3.png') },
  { url: 'https://www.figma.com/api/mcp/asset/7e8dc637-3a3b-4c18-91b0-9ea93e58a318', file: path.join(IMAGES, 'history1.png') },
  { url: 'https://www.figma.com/api/mcp/asset/276dbb8c-79bf-41b3-97ad-27f5d3603b88', file: path.join(IMAGES, 'history2.png') },
  { url: 'https://www.figma.com/api/mcp/asset/8cd573bf-2705-48ca-99df-dcce1ca35ea4', file: path.join(IMAGES, 'history3.png') },
  { url: 'https://www.figma.com/api/mcp/asset/14a85c61-afe3-4fd2-88c4-e82559bba377', file: path.join(IMAGES, 'cta-machine.png') },
  { url: 'https://videos.pexels.com/video-files/5529634/5529634-hd_1920_1080_30fps.mp4', file: path.join(VIDEOS, 'hero-video.mp4') },
];

async function download(url, filePath) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  await pipeline(Readable.fromWeb(res.body), createWriteStream(filePath));
}

async function main() {
  for (const { url, file } of ASSETS) {
    const name = path.basename(file);
    try {
      await download(url, file);
      const stat = fs.statSync(file);
      console.log(`OK ${name} (${(stat.size / 1024).toFixed(1)} KB)`);
    } catch (e) {
      console.error(`FAIL ${name}: ${e.message}`);
    }
  }
}

main();
