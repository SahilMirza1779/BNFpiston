import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Check, ClipboardPlus, MessageCircle, Minus, Plus, ZoomIn } from 'lucide-react'
import SEO from '../components/SEO'
import PageHeader from '../components/PageHeader'
import SmartImage from '../components/SmartImage'
import Lightbox from '../components/Lightbox'
import ProductCard from '../components/ProductCard'
import NotFound from './NotFound'
import { getProductBySlug, products } from '../data/products'
import { waLink } from '../data/site'
import { useEnquiry } from '../context/EnquiryContext'

function Detail({ product }) {
  const { addItem } = useEnquiry()
  const [active, setActive] = useState(0)
  const [size, setSize] = useState(product.sizes[0])
  const [qty, setQty] = useState(1)
  const [lightbox, setLightbox] = useState(null)
  const [origin, setOrigin] = useState('50% 50%')
  const [hovering, setHovering] = useState(false)

  const gallery = product.images.map((src, i) => ({ src, alt: `${product.name} – view ${i + 1}` }))
  const related = products
    .filter((p) => p.slug !== product.slug && (p.category === product.category || p.compatibleBrand === product.compatibleBrand))
    .slice(0, 4)

  const setQtySafe = (n) => setQty(Math.max(1, Math.min(9999, Number.isFinite(n) ? n : 1)))
  const waMessage = `Hello Bilal bhai, I want to order:\n${product.name}\nModel: ${product.model}\nSize: ${size}\nQty: ${qty}`

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`)
  }

  const specs = [
    ['Model Code', product.model],
    ['Category', product.category],
    ['Compatible Brand', product.compatibleBrand],
    ['Compatible Bikes', product.compatibleBikes.join(', ')],
    ['Available Sizes', product.sizes.join(' / ')],
    ['Packing', 'Branded BNF tin box'],
    ['Price', 'Price on Request'],
  ]

  return (
    <>
      <SEO
        title={`${product.name} (${product.model})`}
        path={`/products/${product.slug}`}
        image={product.images[0]}
        description={`${product.name} – ${product.description}`}
      />
      <PageHeader title={product.name} crumbs={[{ label: 'Products', to: '/products' }, { label: product.name }]} />

      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          {/* gallery */}
          <div>
            <button
              onClick={() => setLightbox(active)}
              onMouseMove={onMove}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              aria-label="Open image full screen"
              className="group relative block aspect-square w-full cursor-zoom-in overflow-hidden border border-gray-200 bg-white"
            >
              <SmartImage
                src={product.images[active]}
                alt={gallery[active].alt}
                className="h-full w-full"
                imgClassName="transition-transform duration-300"
                style={{ transformOrigin: origin, transform: hovering ? 'scale(1.8)' : 'scale(1)' }}
                eager
              />
              <span className="absolute right-3 top-3 bg-gray-900/70 p-2 text-white"><ZoomIn size={20} /></span>
            </button>
            <ul className="mt-3 grid grid-cols-5 gap-2">
              {product.images.map((src, i) => (
                <li key={src + i}>
                  <button
                    onClick={() => setActive(i)}
                    aria-label={`Show image ${i + 1}`}
                    aria-current={active === i}
                    className={`block aspect-square w-full overflow-hidden border-2 transition ${active === i ? 'border-brand' : 'border-gray-200 opacity-70 hover:opacity-100'}`}
                  >
                    <SmartImage src={src} alt="" className="h-full w-full" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* info */}
          <div>
            <span className="inline-block bg-brand px-3 py-1 font-display text-xl uppercase leading-none tracking-wider text-white">{product.model}</span>
            <h2 className="mt-3 text-4xl font-bold italic sm:text-5xl">{product.name}</h2>
            <p className="mt-1 text-silver/60">{product.category} • {product.compatibleBrand}</p>
            <p className="mt-4 leading-relaxed text-silver/85">{product.description}</p>
            <p className="mt-4 font-display text-3xl uppercase tracking-wider text-brand">Price on Request</p>

            <div className="mt-6">
              <p className="mb-2 text-sm font-medium text-silver">Select size</p>
              <div role="group" aria-label="Select size" className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    aria-pressed={size === s}
                    className={`min-w-14 px-4 py-2 font-display text-xl uppercase transition ${size === s ? 'bg-brand text-white' : 'border border-gray-300 hover:border-brand'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="mb-2 text-sm font-medium text-silver">Quantity</p>
              <div className="inline-flex items-center border border-gray-300">
                <button onClick={() => setQtySafe(qty - 1)} aria-label="Decrease quantity" className="p-3 hover:bg-brand"><Minus size={16} /></button>
                <input
                  type="number"
                  min="1"
                  value={qty}
                  onChange={(e) => setQtySafe(parseInt(e.target.value, 10))}
                  aria-label="Quantity"
                  className="w-20 bg-transparent py-2 text-center text-lg outline-none"
                />
                <button onClick={() => setQtySafe(qty + 1)} aria-label="Increase quantity" className="p-3 hover:bg-brand"><Plus size={16} /></button>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => addItem(product, size, qty)} className="btn btn-primary">
                <ClipboardPlus size={20} /> Add to Enquiry List
              </button>
              <a href={waLink(waMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
                <MessageCircle size={20} /> Order on WhatsApp
              </a>
            </div>

            <h3 className="mt-10 text-3xl font-semibold">What's in the kit</h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {product.inKit.map((k) => (
                <li key={k} className="flex items-center gap-2 text-silver/85"><Check size={18} className="shrink-0 text-brand" /> {k}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* specs + features */}
        <div className="container-x mt-14 grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="mb-4 text-3xl font-semibold">Specifications</h3>
            <table className="w-full border border-gray-200 text-left text-sm">
              <tbody>
                {specs.map(([k, v], i) => (
                  <tr key={k} className={i % 2 ? 'bg-white' : 'bg-gray-50'}>
                    <th scope="row" className="w-2/5 px-4 py-3 font-medium text-silver">{k}</th>
                    <td className="px-4 py-3 text-gray-900">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h3 className="mb-4 text-3xl font-semibold">Features</h3>
            <ul className="space-y-3">
              {product.features.map((f) => (
                <li key={f} className="metal-card flex items-center gap-3 p-4 text-silver/90">
                  <Check size={18} className="shrink-0 text-brand" /> {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="brushed py-16">
          <div className="container-x">
            <h2 className="mb-8 text-4xl font-bold italic">Related <span className="text-brand">Products</span></h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
            <div className="mt-8 text-center"><Link to="/products" className="btn btn-dark">All Products</Link></div>
          </div>
        </section>
      )}

      <Lightbox images={gallery} index={lightbox} onChange={setLightbox} onClose={() => setLightbox(null)} />
    </>
  )
}

export default function ProductDetail() {
  const { slug } = useParams()
  const product = getProductBySlug(slug)
  if (!product) return <NotFound />
  // key resets gallery/size/qty state when navigating between products
  return <Detail key={product.slug} product={product} />
}
