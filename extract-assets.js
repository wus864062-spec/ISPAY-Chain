const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = __dirname;
const DL = path.join(ROOT, 'downloads');
const ASSETS = path.join(ROOT, 'assets');

function mkdir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyIfExists(from, to) {
  if (!fs.existsSync(from)) {
    console.warn(`[跳过] 本地文件不存在: ${from}`);
    return false;
  }
  mkdir(path.dirname(to));
  fs.copyFileSync(from, to);
  console.log(`[复制] ${path.relative(ROOT, to)}`);
  return true;
}

function download(url, dest) {
  mkdir(path.dirname(dest));
  if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
    console.log(`[已有] ${path.relative(ROOT, dest)}`);
    return true;
  }
  console.log(`[下载] ${url}`);
  const result = spawnSync(
    'curl.exe',
    ['-L', '--fail', '--retry', '2', '-A', 'Mozilla/5.0', '-e', 'https://ispaychain.io/', '-o', dest, url],
    { stdio: 'inherit' }
  );
  if (result.status !== 0) {
    console.error(`[失败] ${url}`);
    return false;
  }
  console.log(`[成功] ${path.relative(ROOT, dest)}`);
  return true;
}

const ICONS = {
  facebook: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12c0 5 3.7 9.1 8.4 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7C18.3 21.1 22 17 22 12c0-5.5-4.5-10-10-10z"/></svg>`,
  x: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M13.982 10.622 20.54 3h-1.554l-5.693 6.618L8.745 3H3.5l6.876 10.007L3.5 21h1.554l6.012-6.989L15.868 21h5.245l-7.131-10.378Zm-2.128 2.474-.697-.997-5.543-7.93H8l4.474 6.4.697.996 5.815 8.318h-2.387l-4.745-6.787Z"/></svg>`,
  instagram: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12,4.622c2.403,0,2.688,0.009,3.637,0.052c0.877,0.04,1.354,0.187,1.671,0.31c0.42,0.163,0.72,0.358,1.035,0.673 c0.315,0.315,0.51,0.615,0.673,1.035c0.123,0.317,0.27,0.794,0.31,1.671c0.043,0.949,0.052,1.234,0.052,3.637 s-0.009,2.688-0.052,3.637c-0.04,0.877-0.187,1.354-0.31,1.671c-0.163,0.42-0.358,0.72-0.673,1.035 c-0.315,0.315-0.615,0.51-1.035,0.673c-0.317,0.123-0.794,0.27-1.671,0.31c-0.949,0.043-1.233,0.052-3.637,0.052 s-2.688-0.009-3.637-0.052c-0.877-0.04-1.354-0.187-1.671-0.31c-0.42-0.163-0.72-0.358-1.035-0.673 c-0.315-0.315-0.51-0.615-0.673-1.035c-0.123-0.317-0.27-0.794-0.31-1.671C4.631,14.688,4.622,14.403,4.622,12 s0.009-2.688,0.052-3.637c0.04-0.877,0.187-1.354,0.31-1.671c0.163-0.42,0.358-0.72,0.673-1.035 c0.315-0.315,0.615-0.51,1.035-0.673c0.317-0.123,0.794-0.27,1.671-0.31C9.312,4.631,9.597,4.622,12,4.622 M12,3 C9.556,3,9.249,3.01,8.289,3.054C7.331,3.098,6.677,3.25,6.105,3.472C5.513,3.702,5.011,4.01,4.511,4.511 c-0.5,0.5-0.808,1.002-1.038,1.594C3.25,6.677,3.098,7.331,3.054,8.289C3.01,9.249,3,9.556,3,12c0,2.444,0.01,2.751,0.054,3.711 c0.044,0.958,0.196,1.612,0.418,2.185c0.23,0.592,0.538,1.094,1.038,1.594c0.5,0.5,1.002,0.808,1.594,1.038 c0.572,0.222,1.227,0.375,2.185,0.418C9.249,20.99,9.556,21,12,21s2.751-0.01,3.711-0.054c0.958-0.044,1.612-0.196,2.185-0.418 c0.592-0.23,1.094-0.538,1.594-1.038c0.5-0.5,0.808-1.002,1.038-1.594c0.222-0.572,0.375-1.227,0.418-2.185 C20.99,14.751,21,14.444,21,12s-0.01-2.751-0.054-3.711c-0.044-0.958-0.196-1.612-0.418-2.185c-0.23-0.592-0.538-1.094-1.038-1.594 c-0.5-0.5-1.002-0.808-1.594-1.038c-0.572-0.222-1.227-0.375-2.185-0.418C14.751,3.01,14.444,3,12,3L12,3z M12,7.378 c-2.552,0-4.622,2.069-4.622,4.622S9.448,16.622,12,16.622s4.622-2.069,4.622-4.622S14.552,7.378,12,7.378z M12,15 c-1.657,0-3-1.343-3-3s1.343-3,3-3s3,1.343,3,3S13.657,15,12,15z M16.804,6.116c-0.596,0-1.08,0.484-1.08,1.08 s0.484,1.08,1.08,1.08c0.596,0,1.08-0.484,1.08-1.08S17.401,6.116,16.804,6.116z"/></svg>`,
  whatsapp: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.011719 2C6.5057187 2 2.0234844 6.478375 2.0214844 11.984375c-.001 1.76.46 3.478187 1.334 4.992187L2 22l5.2324219-1.236328C8.6914219 21.559672 10.333859 21.977516 12.005859 21.978516h.003907C17.514766 21.978516 21.995047 17.499141 21.998047 11.994141 22.000047 9.3251406 20.962172 6.8157344 19.076172 4.9277344 17.190172 3.0407344 14.683719 2.001 12.011719 2zM12.009766 4C14.145766 4.001 16.153109 4.8337969 17.662109 6.3417969 19.171109 7.8517969 20.000047 9.8581875 19.998047 11.992188 19.996047 16.396187 16.413812 19.978516 12.007812 19.978516 10.674812 19.977516 9.3544062 19.642812 8.1914062 19.007812L7.5175781 18.640625 6.7734375 18.816406 4.8046875 19.28125 5.2851562 17.496094 5.5019531 16.695312 5.0878906 15.976562C4.3898906 14.768562 4.0204844 13.387375 4.0214844 11.984375 4.0234844 7.582375 7.6067656 4 12.009766 4zM8.4765625 7.375c-.167 0-.4370156.0625-.6660156.3125-.229.249-.875.8520781-.875 2.0800781 0 1.228 0.8945312 2.415031 1.0195312 2.582031.124.166 1.7266719 2.765625 4.2636719 3.765625 2.108.831 2.536141.667 2.994141.625.458-.041 1.477547-.603547 1.685547-1.186547.208-.583.208485-1.084501.146485-1.187501-.062-.104-.228516-.166016-.478516-.291016-.249-.125-1.476078-.727547-1.705078-.810547-.229-.083-.3965-.125-.5625.125-.166.25-.643062.810562-.789062.976562-.146.167-.291016.189453-.541016.064453-.25-.126-1.053812-.390235-2.007812-1.240235-.742-.661-1.2426724-1.476562-1.3886724-1.726562-.145-.249-.0136718-.385766.1113282-.509766.112-.112.2480468-.2915.3730468-.4375.124-.146.167-.250016.25-.416016.083-.166.0405156-.3125-.0214844-.4375C9.223156 9.5390625 8.737625 8.3065 8.515625 7.8125 8.328625 7.3975 8.131125 7.3878594 7.953125 7.3808594 8.808125 7.3748594 8.6425625 7.375 8.4765625 7.375z"/></svg>`,
  youtube: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M21.8,8.001c0,0-0.195-1.378-0.795-1.985c-0.76-0.797-1.613-0.801-2.004-0.847c-2.799-0.202-6.997-0.202-6.997-0.202 h-0.009c0,0-4.198,0-6.997,0.202C4.608,5.216,3.756,5.22,2.995,6.016C2.395,6.623,2.2,8.001,2.2,8.001S2,9.62,2,11.238v1.517 c0,1.618,0.2,3.237,0.2,3.237s0.195,1.378,0.795,1.985c0.761,0.797,1.76,0.771,2.205,0.855c1.6,0.153,6.8,0.201,6.8,0.201 s4.203-0.006,7.001-0.209c0.391-0.047,1.243-0.051,2.004-0.847c0.6-0.607,0.795-1.985,0.795-1.985s0.2-1.618,0.2-3.237v-1.517 C22,9.62,21.8,8.001,21.8,8.001z M9.935,14.594l-0.001-5.62l5.404,2.82L9.935,14.594z"/></svg>`,
  tiktok: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" fill="currentColor"><path d="M16.708 0.027c1.745-0.027 3.48-0.011 5.213-0.027 0.105 2.041 0.839 4.12 2.333 5.563 1.491 1.479 3.6 2.156 5.652 2.385v5.369c-1.923-0.063-3.855-0.463-5.6-1.291-0.76-0.344-1.468-0.787-2.161-1.24-0.009 3.896 0.016 7.787-0.025 11.667-0.104 1.864-0.719 3.719-1.803 5.255-1.744 2.557-4.771 4.224-7.88 4.276-1.907 0.109-3.812-0.411-5.437-1.369-2.693-1.588-4.588-4.495-4.864-7.615-0.032-0.667-0.043-1.333-0.016-1.984 0.24-2.537 1.495-4.964 3.443-6.615 2.208-1.923 5.301-2.839 8.197-2.297 0.027 1.975-0.052 3.948-0.052 5.923-1.323-0.428-2.869-0.308-4.025 0.495-0.844 0.547-1.485 1.385-1.819 2.333-0.276 0.676-0.197 1.427-0.181 2.145 0.317 2.188 2.421 4.027 4.667 3.828 1.489-0.016 2.916-0.88 3.692-2.145 0.251-0.443 0.532-0.896 0.547-1.417 0.131-2.385 0.079-4.76 0.095-7.145 0.011-5.375-0.016-10.735 0.025-16.093z"/></svg>`,
};

const FONTS = [
  ['Inter', 'Inter_18pt-Thin.ttf', 'https://ispaychain.io/wp-content/themes/startup-consultant/assets/fonts/Inter/static/Inter_18pt-Thin.ttf'],
  ['Inter', 'Inter_18pt-ExtraLight.ttf', 'https://ispaychain.io/wp-content/themes/startup-consultant/assets/fonts/Inter/static/Inter_18pt-ExtraLight.ttf'],
  ['Inter', 'Inter_18pt-Light.ttf', 'https://ispaychain.io/wp-content/themes/startup-consultant/assets/fonts/Inter/static/Inter_18pt-Light.ttf'],
  ['Inter', 'Inter_18pt-Regular.ttf', 'https://ispaychain.io/wp-content/themes/startup-consultant/assets/fonts/Inter/static/Inter_18pt-Regular.ttf'],
  ['Inter', 'Inter_18pt-Medium.ttf', 'https://ispaychain.io/wp-content/themes/startup-consultant/assets/fonts/Inter/static/Inter_18pt-Medium.ttf'],
  ['Inter', 'Inter_18pt-SemiBold.ttf', 'https://ispaychain.io/wp-content/themes/startup-consultant/assets/fonts/Inter/static/Inter_18pt-SemiBold.ttf'],
  ['Inter', 'Inter_18pt-Bold.ttf', 'https://ispaychain.io/wp-content/themes/startup-consultant/assets/fonts/Inter/static/Inter_18pt-Bold.ttf'],
  ['Inter', 'Inter_18pt-ExtraBold.ttf', 'https://ispaychain.io/wp-content/themes/startup-consultant/assets/fonts/Inter/static/Inter_18pt-ExtraBold.ttf'],
  ['Inter', 'Inter_18pt-Black.ttf', 'https://ispaychain.io/wp-content/themes/startup-consultant/assets/fonts/Inter/static/Inter_18pt-Black.ttf'],
  ['Poppins', 'Poppins-Thin.ttf', 'https://ispaychain.io/wp-content/themes/startup-consultant/assets/fonts/Poppins/Poppins-Thin.ttf'],
  ['Poppins', 'Poppins-ExtraLight.ttf', 'https://ispaychain.io/wp-content/themes/startup-consultant/assets/fonts/Poppins/Poppins-ExtraLight.ttf'],
  ['Poppins', 'Poppins-Light.ttf', 'https://ispaychain.io/wp-content/themes/startup-consultant/assets/fonts/Poppins/Poppins-Light.ttf'],
  ['Poppins', 'Poppins-Regular.ttf', 'https://ispaychain.io/wp-content/themes/startup-consultant/assets/fonts/Poppins/Poppins-Regular.ttf'],
  ['Poppins', 'Poppins-Medium.ttf', 'https://ispaychain.io/wp-content/themes/startup-consultant/assets/fonts/Poppins/Poppins-Medium.ttf'],
  ['Poppins', 'Poppins-SemiBold.ttf', 'https://ispaychain.io/wp-content/themes/startup-consultant/assets/fonts/Poppins/Poppins-SemiBold.ttf'],
  ['Poppins', 'Poppins-Bold.ttf', 'https://ispaychain.io/wp-content/themes/startup-consultant/assets/fonts/Poppins/Poppins-Bold.ttf'],
  ['Poppins', 'Poppins-ExtraBold.ttf', 'https://ispaychain.io/wp-content/themes/startup-consultant/assets/fonts/Poppins/Poppins-ExtraBold.ttf'],
  ['Poppins', 'Poppins-Black.ttf', 'https://ispaychain.io/wp-content/themes/startup-consultant/assets/fonts/Poppins/Poppins-Black.ttf'],
];

const tokens = {
  source: 'https://ispaychain.io/',
  extractedAt: new Date().toISOString(),
  notes: {
    starfield: '不是 Canvas 粒子。首页星空/黑洞效果来自 slider-bg.png + Cover 半透明遮罩。',
    gold: '金色主要出现在卡片图片本身；CSS 里最接近的品牌金是表单按钮 #efc62c。',
    whatsappIcon: '右下角客服按钮使用 qlwapp 图标字体，不是 FontAwesome。已从页内社交 SVG 提取同等 WhatsApp 图标。',
  },
  fonts: {
    body: { family: 'Inter, sans-serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
    heading: { family: 'Poppins, sans-serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
    sizes: {
      body: '16px',
      nav: '16px / 500',
      sliderTitle: '42px / 700 / line-height 1.3',
      sectionTitle: '32px-35px / 600-700',
      button: '16px / 600',
    },
  },
  colors: {
    background: '#05085B',
    backgroundAlpha: '#05085BF0',
    black: '#000000',
    nearBlack: '#101010',
    navy: '#050521',
    white: '#FFFFFF',
    textPrimary: '#000000',
    textSecondary: '#383838',
    gold: '#EFC62C',
    goldAmber: '#FCB900',
    whatsapp: '#25D366',
    whatsappText: '#FFFFFF',
    footerSocial: '#C12122',
    overlayWhite90: 'rgba(255,255,255,0.90)',
  },
  gradients: {
    topbar: 'linear-gradient(90deg, rgb(5,5,33) 0%, rgb(14,12,152) 44%, rgb(4,4,153) 69%, rgb(9,29,178) 100%)',
    footer: 'linear-gradient(90deg, rgb(0,0,0) 0%, rgb(53,51,205) 100%, rgb(2,6,26) 100%)',
    footerAlt: 'linear-gradient(90deg, rgb(9,9,25) 0%, rgb(53,51,205) 100%)',
  },
  components: {
    button: {
      radius: '32px',
      padding: '8px 28px',
      border: '2px solid currentColor',
      fontWeight: 600,
    },
    whatsappFab: {
      background: '#25D366',
      color: '#FFFFFF',
      radius: '50px',
      iconSize: '60px',
      fontSize: '18px',
      shadow: 'rgba(0,0,0,0.06) 0 1px 6px, rgba(0,0,0,0.16) 0 2px 32px',
      text: 'How can I help you?',
    },
    coverOverlay: {
      className: 'has-foreground-background-color has-background-dim-90',
      color: '#FFFFFF',
      opacity: 0.9,
    },
  },
  assets: {
    cards: [
      { file: 'assets/cards/card1.png', role: '3D card variant 1', source: 'https://ispaychain.io/wp-content/uploads/2026/03/card1.png' },
      { file: 'assets/cards/card2.png', role: '3D card variant 2', source: 'https://ispaychain.io/wp-content/uploads/2026/03/card2.png' },
      { file: 'assets/cards/card3.png', role: '3D card variant 3', source: 'https://ispaychain.io/wp-content/uploads/2026/03/card3.png' },
      { file: 'assets/cards/gold-card.jpg', role: 'ISPAY Gold Card', source: 'https://ispaychain.io/wp-content/uploads/2026/03/ispay-Gold-Card-.jpg' },
      { file: 'assets/cards/white-card.png', role: 'ISPAY White Card', source: 'https://ispaychain.io/wp-content/uploads/2026/03/White.png' },
      { file: 'assets/cards/virtual-card.png', role: 'ISPAY Virtual Card', source: 'https://ispaychain.io/wp-content/uploads/2026/03/Virtual-Card.png' },
    ],
    backgrounds: [
      { file: 'assets/backgrounds/slider-bg.png', role: 'Hero starfield / black-hole background', source: 'https://ispaychain.io/wp-content/themes/startup-consultant/assets/images/slider-bg.png' },
      { file: 'assets/backgrounds/banner-left.png', role: 'About decorative graphic', source: 'https://ispaychain.io/wp-content/themes/startup-consultant/assets/images/banner-left.png' },
      { file: 'assets/backgrounds/statistic.gif', role: 'Video poster / looping animation', source: 'https://ispaychain.io/wp-content/uploads/2026/03/statistic2-DdFwA18X.gif' },
    ],
    video: {
      file: 'assets/video/intro.mp4',
      poster: 'assets/backgrounds/statistic.gif',
      source: 'https://ispaychain.io/wp-content/uploads/2026/03/intro.mp4',
      width: 848,
      height: 480,
      loop: true,
      controls: true,
    },
  },
};

const copies = [
  ['03_card1.png', 'cards/card1.png'],
  ['04_card2.png', 'cards/card2.png'],
  ['05_card3.png', 'cards/card3.png'],
  ['16_ispay-Gold-Card-.jpg', 'cards/gold-card.jpg'],
  ['54_White.png', 'cards/white-card.png'],
  ['56_Virtual-Card.png', 'cards/virtual-card.png'],
  ['02_slider-bg.png', 'backgrounds/slider-bg.png'],
  ['07_banner-left.png', 'backgrounds/banner-left.png'],
  ['17_statistic2-DdFwA18X.gif', 'backgrounds/statistic.gif'],
  ['01_pl1.png', 'brand/logo.png'],
];

mkdir(ASSETS);
for (const [from, to] of copies) {
  copyIfExists(path.join(DL, from), path.join(ASSETS, to));
}

mkdir(path.join(ASSETS, 'icons'));
for (const [name, svg] of Object.entries(ICONS)) {
  const dest = path.join(ASSETS, 'icons', `${name}.svg`);
  fs.writeFileSync(dest, svg);
  console.log(`[写入] assets/icons/${name}.svg`);
}

for (const [family, file, url] of FONTS) {
  download(url, path.join(ASSETS, 'fonts', family, file));
}

download(tokens.assets.video.source, path.join(ASSETS, 'video', 'intro.mp4'));

fs.writeFileSync(path.join(ROOT, 'design-tokens.json'), JSON.stringify(tokens, null, 2));
console.log('\n[写入] design-tokens.json');

const fontCss = `/* Extracted from https://ispaychain.io/ */
@font-face { font-family: Inter; font-style: normal; font-weight: 100; src: url('./assets/fonts/Inter/Inter_18pt-Thin.ttf') format('truetype'); }
@font-face { font-family: Inter; font-style: normal; font-weight: 200; src: url('./assets/fonts/Inter/Inter_18pt-ExtraLight.ttf') format('truetype'); }
@font-face { font-family: Inter; font-style: normal; font-weight: 300; src: url('./assets/fonts/Inter/Inter_18pt-Light.ttf') format('truetype'); }
@font-face { font-family: Inter; font-style: normal; font-weight: 400; src: url('./assets/fonts/Inter/Inter_18pt-Regular.ttf') format('truetype'); }
@font-face { font-family: Inter; font-style: normal; font-weight: 500; src: url('./assets/fonts/Inter/Inter_18pt-Medium.ttf') format('truetype'); }
@font-face { font-family: Inter; font-style: normal; font-weight: 600; src: url('./assets/fonts/Inter/Inter_18pt-SemiBold.ttf') format('truetype'); }
@font-face { font-family: Inter; font-style: normal; font-weight: 700; src: url('./assets/fonts/Inter/Inter_18pt-Bold.ttf') format('truetype'); }
@font-face { font-family: Inter; font-style: normal; font-weight: 800; src: url('./assets/fonts/Inter/Inter_18pt-ExtraBold.ttf') format('truetype'); }
@font-face { font-family: Inter; font-style: normal; font-weight: 900; src: url('./assets/fonts/Inter/Inter_18pt-Black.ttf') format('truetype'); }
@font-face { font-family: Poppins; font-style: normal; font-weight: 100; src: url('./assets/fonts/Poppins/Poppins-Thin.ttf') format('truetype'); }
@font-face { font-family: Poppins; font-style: normal; font-weight: 200; src: url('./assets/fonts/Poppins/Poppins-ExtraLight.ttf') format('truetype'); }
@font-face { font-family: Poppins; font-style: normal; font-weight: 300; src: url('./assets/fonts/Poppins/Poppins-Light.ttf') format('truetype'); }
@font-face { font-family: Poppins; font-style: normal; font-weight: 400; src: url('./assets/fonts/Poppins/Poppins-Regular.ttf') format('truetype'); }
@font-face { font-family: Poppins; font-style: normal; font-weight: 500; src: url('./assets/fonts/Poppins/Poppins-Medium.ttf') format('truetype'); }
@font-face { font-family: Poppins; font-style: normal; font-weight: 600; src: url('./assets/fonts/Poppins/Poppins-SemiBold.ttf') format('truetype'); }
@font-face { font-family: Poppins; font-style: normal; font-weight: 700; src: url('./assets/fonts/Poppins/Poppins-Bold.ttf') format('truetype'); }
@font-face { font-family: Poppins; font-style: normal; font-weight: 800; src: url('./assets/fonts/Poppins/Poppins-ExtraBold.ttf') format('truetype'); }
@font-face { font-family: Poppins; font-style: normal; font-weight: 900; src: url('./assets/fonts/Poppins/Poppins-Black.ttf') format('truetype'); }

:root {
  --bg: #05085B;
  --bg-alpha: #05085BF0;
  --black: #000000;
  --gold: #EFC62C;
  --whatsapp: #25D366;
  --text: #383838;
  --white: #FFFFFF;
  --topbar: linear-gradient(90deg, rgb(5,5,33) 0%, rgb(14,12,152) 44%, rgb(4,4,153) 69%, rgb(9,29,178) 100%);
  --footer: linear-gradient(90deg, rgb(0,0,0) 0%, rgb(53,51,205) 100%, rgb(2,6,26) 100%);
  --font-body: Inter, sans-serif;
  --font-heading: Poppins, sans-serif;
}
`;
fs.writeFileSync(path.join(ROOT, 'fonts-and-tokens.css'), fontCss);
console.log('[写入] fonts-and-tokens.css');
console.log('\n全部提取完成。');
