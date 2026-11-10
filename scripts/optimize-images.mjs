import { readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

/**
 * Generates WebP versions of every raster asset next to the original.
 * Originals are kept, so re-exports stay available; the app imports .webp.
 *
 * Run: node scripts/optimize-images.mjs
 */

const ROOT = path.resolve('src/assets')

const rules = [
  { test: /(^|[\\/])API[\\/]/, width: 1400, quality: 80 },
  { test: /(^|[\\/])starbright[\\/]/, width: 1400, quality: 80 },
  { test: /me\.jpg$/i, width: 800, quality: 80 },
  {
    test: /(Banner|Cover|Shopee|Lazada|Journaling|Blossom|photo_2025)/i,
    width: 1800,
    quality: 78,
  },
  { test: /.*/, width: 1000, quality: 82 },
]

const exts = new Set(['.jpg', '.jpeg', '.png'])

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...(await walk(full)))
    else if (exts.has(path.extname(entry.name).toLowerCase())) files.push(full)
  }
  return files
}

const files = await walk(ROOT)
let before = 0
let after = 0

for (const file of files) {
  const rule = rules.find((r) => r.test.test(file))
  // The hero portrait is preloaded from /public as /me.webp, so it is written
  // there instead of being bundled with a hashed filename.
  const out = /me\.jpg$/i.test(file)
    ? path.resolve('public/me.webp')
    : file.replace(/\.(jpe?g|png)$/i, '.webp')
  const input = sharp(file, { failOn: 'none' })

  await input
    .rotate()
    .resize({ width: rule.width, withoutEnlargement: true })
    .webp({ quality: rule.quality, effort: 5 })
    .toFile(out)

  const [a, b] = await Promise.all([stat(file), stat(out)])
  before += a.size
  after += b.size
  console.log(
    `${path.relative(ROOT, out).padEnd(52)} ${Math.round(a.size / 1024)
      .toString()
      .padStart(5)} KB -> ${Math.round(b.size / 1024)
      .toString()
      .padStart(4)} KB`,
  )
}

console.log(
  `\n${files.length} images  ${Math.round(before / 1024)} KB -> ${Math.round(
    after / 1024,
  )} KB (${Math.round((1 - after / before) * 100)}% smaller)`,
)
