import ScrollStack, { ScrollStackItem } from '../components/ScrollStack'
import { banners } from '../data/work'

const platforms = ['Shopee', 'Lazada', 'Website Banners', 'Storefront Covers']

export default function Campaigns() {
  return (
    <section
      id="banners"
      className="relative overflow-hidden border-t border-line pt-[clamp(88px,12vw,170px)]"
    >
      <div className="shell gutter">
        <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="chapter-label">03 — Campaigns</p>
            <h2 className="display-md mt-4 max-w-[18ch]">
              Campaigns that live on <span className="serif-em text-accent">storefronts.</span>
            </h2>
          </div>
          <div className="md:max-w-sm">
            <p className="text-sm leading-relaxed text-cream/60">
              Marketplace heroes, storefront covers and campaign artwork — sized, weighted and
              composed to convert at thumbnail scale.
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {platforms.map((platform) => (
                <li className="chip" key={platform}>
                  {platform}
                </li>
              ))}
            </ul>
          </div>
        </header>
      </div>

      <ScrollStack
        useWindowScroll
        stackPosition="14%"
        scaleEndPosition="13%"
        itemDistance={430}
        baseScale={0.9}
        itemScale={0.012}
        blurAmount={0.6}
      >
        {banners.map((banner, index) => (
          <ScrollStackItem key={banner.id}>
            <div className="relative">
              <img
                src={banner.src}
                alt={banner.alt}
                width={banner.width}
                height={banner.height}
                loading="lazy"
                decoding="async"
              />

              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-ink/90 via-ink/35 to-transparent p-5 sm:p-7">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent">
                    {banner.platform}
                  </p>
                  <h3 className="mt-1 font-sans text-lg font-semibold tracking-tight text-cream sm:text-xl">
                    {banner.title}
                  </h3>
                </div>
                <span className="font-mono text-[10px] tracking-[0.16em] text-cream/56">
                  {String(index + 1).padStart(2, '0')} / {String(banners.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  )
}
