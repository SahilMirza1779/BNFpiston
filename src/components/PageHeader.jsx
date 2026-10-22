import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import CheckeredStrip from './CheckeredStrip'

export default function PageHeader({ title, highlight, subtitle, crumbs = [] }) {
  return (
    <section className="brushed relative overflow-hidden">
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand/25 blur-[120px]" aria-hidden="true" />
      <div className="container-x relative py-14 sm:py-20">
        <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1 text-sm text-silver/60">
          <Link to="/" className="hover:text-brand">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-1">
              <ChevronRight size={14} />
              {c.to ? <Link to={c.to} className="hover:text-brand">{c.label}</Link> : <span className="text-white">{c.label}</span>}
            </span>
          ))}
        </nav>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-bold italic leading-[0.95] sm:text-7xl"
        >
          {title} {highlight && <span className="text-brand">{highlight}</span>}
        </motion.h1>
        {subtitle && <p className="mt-4 max-w-2xl text-lg text-silver/75">{subtitle}</p>}
      </div>
      <CheckeredStrip height={14} />
    </section>
  )
}
