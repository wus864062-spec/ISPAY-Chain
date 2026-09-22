const fs = require('fs');
const path = require('path');
const { URL } = require('url');
const axios = require('axios');
const cheerio = require('cheerio');

const TARGET_URL = 'https://ispaychain.io/';
const ORIGIN = new URL(TARGET_URL).origin;
const DOWNLOAD_DIR = path.join(__dirname, 'downloads');
const IMAGE_EXT = /\.(png|jpe?g|gif|webp|svg|bmp|ico|avif)(?:$|\?)/i;
const MAX_PAGES = 30;

const http = axios.create({
  timeout: 20000,
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    Referer: TARGET_URL,
    Accept: '*/*',
  },
  maxRedirects: 5,
  validateStatus: (status) => status >= 200 && status < 400,
});

if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
}

function normalizeUrl(raw, base) {
  if (!raw) return null;
  const value = String(raw).trim().replace(/&amp;/g, '&');
  if (!value || value.startsWith('data:') || value.startsWith('blob:') || value.startsWith('javascript:')) {
    return null;
  }
  try {
    return new URL(value, base).href;
  } catch {
    return null;
  }
}

function collectCssUrls(cssText, cssBase) {
  const urls = [];
  const re = /url\(([^)]+)\)/gi;
  let match;
  while ((match = re.exec(cssText))) {
    const cleaned = match[1].trim().replace(/^['"]|['"]$/g, '');
    const abs = normalizeUrl(cleaned, cssBase);
    if (abs && IMAGE_EXT.test(abs)) urls.push(abs);
  }
  return urls;
}

function collectFromHtml(html, pageUrl) {
  const $ = cheerio.load(html);
  const images = new Set();
  const pages = new Set();
  const stylesheets = new Set();

  const addImage = (raw) => {
    if (!raw) return;
    String(raw)
      .split(',')
      .map((part) => part.trim().split(/\s+/)[0])
      .forEach((candidate) => {
        const abs = normalizeUrl(candidate, pageUrl);
        if (!abs) return;
        if (IMAGE_EXT.test(abs) || abs.includes('/wp-content/uploads/')) {
          images.add(abs.split('#')[0]);
        }
      });
  };

  $('img').each((_, el) => {
    const node = $(el);
    [
      'src',
      'data-src',
      'data-lazy-src',
      'data-original',
      'data-bg',
      'srcset',
      'data-srcset',
    ].forEach((attr) => addImage(node.attr(attr)));
  });

  $('source, video, picture').each((_, el) => {
    const node = $(el);
    addImage(node.attr('src'));
    addImage(node.attr('srcset'));
    addImage(node.attr('poster'));
  });

  $('[style]').each((_, el) => {
    collectCssUrls($(el).attr('style') || '', pageUrl).forEach((url) => images.add(url));
  });

  $('style').each((_, el) => {
    collectCssUrls($(el).html() || '', pageUrl).forEach((url) => images.add(url));
  });

  $('link[rel="icon"], link[rel="apple-touch-icon"], meta[property="og:image"], meta[name="twitter:image"]').each(
    (_, el) => {
      addImage($(el).attr('href') || $(el).attr('content'));
    }
  );

  $('link[rel="stylesheet"], link[rel="preload"][as="style"]').each((_, el) => {
    const abs = normalizeUrl($(el).attr('href'), pageUrl);
    if (abs && abs.startsWith(ORIGIN)) stylesheets.add(abs.split('#')[0]);
  });

  $('a[href]').each((_, el) => {
    const abs = normalizeUrl($(el).attr('href'), pageUrl);
    if (!abs || !abs.startsWith(ORIGIN)) return;
    const cleaned = abs.split('#')[0];
    if (IMAGE_EXT.test(cleaned)) {
      images.add(cleaned);
      return;
    }
    if (/\.(css|js|xml|json|pdf|zip|mp4|webm)(?:$|\?)/i.test(cleaned)) return;
    pages.add(cleaned);
  });

  return { images, pages, stylesheets };
}

function uniqueName(url, index, used) {
  const parsed = new URL(url);
  let fileName = path.basename(parsed.pathname) || `image_${index}.png`;
  fileName = decodeURIComponent(fileName).replace(/[<>:"/\\|?*]/g, '_');
  if (!path.extname(fileName)) fileName += '.png';
  let finalName = `${String(index).padStart(2, '0')}_${fileName}`;
  let n = 2;
  while (used.has(finalName.toLowerCase())) {
    const ext = path.extname(fileName);
    const stem = path.basename(fileName, ext);
    finalName = `${String(index).padStart(2, '0')}_${stem}_${n}${ext}`;
    n += 1;
  }
  used.add(finalName.toLowerCase());
  return finalName;
}

async function downloadImage(imgUrl, savePath) {
  const response = await http.get(imgUrl, { responseType: 'stream' });
  await new Promise((resolve, reject) => {
    const writer = fs.createWriteStream(savePath);
    response.data.pipe(writer);
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

async function main() {
  console.log(`正在抓取: ${TARGET_URL}`);
  const queue = [TARGET_URL];
  const seenPages = new Set();
  const allImages = new Set();
  const seenCss = new Set();

  while (queue.length && seenPages.size < MAX_PAGES) {
    const pageUrl = queue.shift();
    if (seenPages.has(pageUrl)) continue;
    seenPages.add(pageUrl);
    try {
      const { data: html } = await http.get(pageUrl, {
        headers: { Accept: 'text/html,application/xhtml+xml' },
      });
      const { images, pages, stylesheets } = collectFromHtml(html, pageUrl);
      images.forEach((url) => allImages.add(url));
      for (const cssUrl of stylesheets) {
        if (seenCss.has(cssUrl)) continue;
        seenCss.add(cssUrl);
        try {
          const { data: css } = await http.get(cssUrl);
          collectCssUrls(String(css), cssUrl).forEach((url) => allImages.add(url));
        } catch (error) {
          console.warn(`[跳过 CSS] ${cssUrl}: ${error.message}`);
        }
      }
      pages.forEach((url) => {
        if (!seenPages.has(url) && !queue.includes(url)) queue.push(url);
      });
      console.log(`[页面] ${pageUrl} -> 累计图片 ${allImages.size}`);
    } catch (error) {
      console.error(`[失败] 抓取页面 ${pageUrl}: ${error.message}`);
    }
  }

  const urls = [...allImages].filter((url) => IMAGE_EXT.test(url));
  console.log(`\n共提取到 ${urls.length} 张图片，开始下载...\n`);

  const usedNames = new Set();
  let ok = 0;
  let fail = 0;
  for (let i = 0; i < urls.length; i++) {
    const imgUrl = urls[i];
    const fileName = uniqueName(imgUrl, i + 1, usedNames);
    const savePath = path.join(DOWNLOAD_DIR, fileName);
    try {
      await downloadImage(imgUrl, savePath);
      ok += 1;
      console.log(`[成功] ${fileName}`);
    } catch (error) {
      fail += 1;
      console.error(`[失败] ${imgUrl}: ${error.message}`);
    }
  }

  console.log(`\n完成：成功 ${ok}，失败 ${fail}。文件在 ${DOWNLOAD_DIR}`);
}

main().catch((error) => {
  console.error('脚本异常:', error);
  process.exit(1);
});
