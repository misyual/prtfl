import ScrollStack, { ScrollStackItem } from './ScrollStack'
import pencilCaseBanner from '../assets/Pencil Case Eva Banner-Recovered.jpg'
import shopeeBanner from '../assets/Shopee Banner.jpg'
import lazadaCover from '../assets/Lazada Cover.jpg'
import blossom from '../assets/Blossom-Cover3-scaled.png'
import journaling from '../assets/Journaling-Cover-Recovered-scaled (1).jpg'
import medal from '../assets/Medal-and-Certificate-Banner-scaled.jpg'
import certificate from '../assets/photo_2025-12-18_16-34-14.jpg'
import './Banners.css'

const banners = [
  { src: pencilCaseBanner, alt: 'Pencil Case Eva campaign banner' },
  { src: lazadaCover, alt: 'Lazada storefront cover' },
  { src: shopeeBanner, alt: 'Shopee storefront banner' },
  { src: blossom, alt: 'Blossom product cover' },
  { src: journaling, alt: 'Journaling product cover' },
  { src: medal, alt: 'Medal and certificate banner' },
  { src: certificate, alt: 'Certificate banner' },
]

const platforms = ['Shopee', 'Lazada', 'Website Banners', 'Storefront Covers']

function Banners() {
  return (
    <section className="section banners-section" id="banners">
      <div className="section-head banners-head">
        <p className="eyebrow">Banners</p>
        <div className="banners-head__row">
          <h2>Shopee, Lazada &amp; Website Banners</h2>
          <p className="section-lede">
            Marketplace heroes, storefront covers and campaign artwork — sized, weighted and
            composed to convert at thumbnail scale.
          </p>
        </div>
        <ul className="banners-platforms" aria-label="Platforms">
          {platforms.map((p) => (
            <li className="tag" key={p}>
              {p}
            </li>
          ))}
        </ul>
      </div>

      <ScrollStack useWindowScroll stackPosition="15%" scaleEndPosition="14%" itemDistance={500}>
        {banners.map((banner) => (
          <ScrollStackItem key={banner.src}>
            <img src={banner.src} alt={banner.alt} loading="lazy" decoding="async" />
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  )
}

export default Banners
