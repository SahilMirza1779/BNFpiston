import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ClipboardPlus, MessageCircle } from 'lucide-react'
import SmartImage from './SmartImage'
import { useEnquiry } from '../context/EnquiryContext'
import { waLink } from '../data/site'

export default function ProductCard({ product, index = 0 }) {
  const { addItem } = useEnquiry()
  const defaultSize = product.sizes[0]
  const waMessage = `Hello Bilal bhai, I want to enquire about:\n${product.name} (${product.model})\nSize: ${defaultSize}\nQty: 1`

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(index, 5) * 0.06 }}
      className="metal-card group flex h-full flex-col transition-colors hover:border-brand/60"
    >
      <Link to={`/products/${product.slug}`} className="relative block overflow-hidden bg-black" aria-label={`View ${product.name}`}>
        <SmartImage
          src={product.images[0]}
          alt={`${product.name} – BNF piston kit`}
          className="aspect-square w-full"
          imgClassName="transition-transform duration-700 group-hover:scale-110"
        />
        <span className="absolute left-0 top-3 bg-brand px-3 py-1 font-display text-lg font-semibold uppercase leading-none tracking-wider">
          {product.model}
        </span>
        <div className="checkered absolute inset-x-0 bottom-0 h-2" style={{ backgroundSize: '8px 8px' }} aria-hidden="true" />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs uppercase tracking-widest text-silver/60">{product.category}</p>
        <h3 className="mt-1 text-2xl font-semibold leading-tight">
          <Link to={`/products/${product.slug}`} className="transition hover:text-brand">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-silver/70">{product.compatibleBrand} • Sizes: {product.sizes.join(' / ')}</p>
        <p className="mt-3 font-display text-lg uppercase tracking-wider text-brand">Price on Request</p>

        <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
          <button onClick={() => addItem(product, defaultSize, 1)} className="btn btn-dark !gap-1.5 !px-2 !py-2 !text-base">
            <ClipboardPlus size={16} /> Add to Enquiry
          </button>
          <a href={waLink(waMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-wa !gap-1.5 !px-2 !py-2 !text-base">
            <MessageCircle size={16} /> WhatsApp
          </a>
        </div>
      </div>
    </motion.article>
  )
}
