import { Helmet } from 'react-helmet-async'
import { site } from '../data/site'

const KEYWORDS =
  'piston kit Ankleshwar, motorcycle piston rings Gujarat, BNF piston, bike piston kit supplier, piston rings wholesale India, BNF International Trade'

export default function SEO({ title, description, path = '/', image = '/images/box-front.jpg' }) {
  const fullTitle = title ? `${title} | BNF Piston & Rings` : 'BNF Piston & Rings | Motorcycle Spare Parts – Ankleshwar, Gujarat'
  const desc =
    description ||
    'BNF Piston & Rings – extra heavy duty, high quality motorcycle piston kits, piston rings, pins and circlips. Wholesale supply from Ankleshwar, Gujarat.'
  const url = `${site.url}${path}`
  const img = `${site.url}${image}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="keywords" content={KEYWORDS} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="BNF Piston & Rings" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />
    </Helmet>
  )
}
