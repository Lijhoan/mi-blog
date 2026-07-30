// QA visual responsive: captura las 7 rutas en móvil/desktop y ambos temas,
// y mide overflow horizontal del documento (0px = sin distorsión).
// Requiere el dev server corriendo: pnpm dev
// Uso: node scripts/visual-qa.mjs  →  capturas en .qa-shots/
import { mkdirSync } from 'fs';
import { join } from 'path';
import { chromium } from 'playwright';

const OUT = join(process.cwd(), '.qa-shots');
mkdirSync(OUT, { recursive: true });

const BASE = process.env.QA_BASE_URL ?? 'http://localhost:3000';
const ROUTES = ['', 'about', 'projects', 'skills', 'experience', 'certifications', 'contact'];

const JOBS = [
  ...ROUTES.map((r) => ({ route: r, width: 375, height: 812, theme: 'dark' })),
  { route: '', width: 1440, height: 900, theme: 'dark' },
  { route: 'projects', width: 1440, height: 900, theme: 'dark' },
  { route: '', width: 375, height: 812, theme: 'light' },
  { route: 'skills', width: 375, height: 812, theme: 'light' },
  { route: 'certifications', width: 375, height: 812, theme: 'light' },
];

const browser = await chromium.launch();
const report = [];

for (const job of JOBS) {
  const ctx = await browser.newContext({ viewport: { width: job.width, height: job.height } });
  if (job.theme === 'light') {
    await ctx.addInitScript(() => localStorage.setItem('theme', 'light'));
  }
  const page = await ctx.newPage();
  await page.goto(`${BASE}/${job.route}`, { waitUntil: 'networkidle', timeout: 45000 });
  await page.waitForTimeout(1200);

  const overflowPx = await page.evaluate(() => {
    const doc = document.documentElement;
    return doc.scrollWidth - doc.clientWidth;
  });

  const name = `${job.route || 'home'}-${job.width}-${job.theme}.png`;
  await page.screenshot({ path: join(OUT, name), fullPage: job.route !== 'projects' });
  report.push({ page: `${job.route || 'home'} @${job.width} ${job.theme}`, overflowPx });
  await ctx.close();
}

await browser.close();
console.table(report);

const broken = report.filter((r) => r.overflowPx > 0);
if (broken.length > 0) {
  console.error(`✖ ${broken.length} página(s) con overflow horizontal`);
  process.exit(1);
}
console.log('✓ Sin overflow horizontal en ninguna combinación');
