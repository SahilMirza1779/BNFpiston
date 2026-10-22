import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, SearchX, X } from 'lucide-react'
import SEO from '../components/SEO'
import PageHeader from '../components/PageHeader'
import ProductCard from '../components/ProductCard'
import { categories, productBrands, products } from '../data/products'
import { sizeOptions } from '../data/site'

const chip = (active) =>
  `px-4 py-2 font-display text-lg uppercase tracking-wider transition ${
    active ? 'bg-brand text-white' : 'border border-white/20 text-silver hover:border-brand hover:text-white'
  }`

export default function Products() {
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') || '')
  const [brand, setBrand] = useState('All')
  const [size, setSize] = useState('All')
  const [sort, setSort] = useState('featured')

  const category = params.get('category') || 'All'
  const setCategory = (c) => {
    const next = new URLSearchParams(params)
    if (c === 'All') next.delete('category')
    else next.set('category', c)
    setParams(next, { replace: true })
  }

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    let out = products.filter((p) => {
      if (category !== 'All' && p.category !== category) return false
      if (brand !== 'All' && p.compatibleBrand !== brand && p.compatibleBrand !== 'Multi-brand') return false
      if (size !== 'All' && !p.sizes.includes(size)) return false
      if (!q) return true
      return [p.name, p.model, p.category, p.compatibleBrand, ...p.compatibleBikes].join(' ').toLowerCase().includes(q)
    })
    out = [...out]
    if (sort === 'az') out.sort((a, b) => a.name.localeCompare(b.name))
    else if (sort === 'za') out.sort((a, b) => b.name.localeCompare(a.name))
    else out.sort((a, b) => Number(b.featured) - Number(a.featured))
    return out
  }, [query, category, brand, size, sort])

  const filtersActive = query || category !== 'All' || brand !== 'All' || size !== 'All'
  const clearAll = () => {
    setQuery('')
    setBrand('All')
    setSize('All')
    setCategory('All')
  }

  return (
    <>
      <SEO
        title="Products"
        path="/products"
        description="Browse BNF motorcycle piston kits, piston rings, pins and oversize pistons for Honda, Bajaj, Hero, Yamaha, TVS and Suzuki bikes."
      />
      <PageHeader title="Our" highlight="Products" subtitle="Search by bike model, filter by brand and size, then enquire on WhatsApp." crumbs={[{ label: 'Products' }]} />

      <section className="bg-jet py-12 sm:py-16">
        <div className="container-x">
          <div className="metal-card mb-8 space-y-5 p-5">
            <div className="relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-silver/50" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, model code (GN5, CD100) or bike…"
                aria-label="Search products"
                className="field !pl-12"
              />
            </div>

            <div role="group" aria-label="Category filter" className="flex flex-wrap gap-2">
              {['All', ...categories].map((c) => (
                <button key={c} onClick={() => setCategory(c)} aria-pressed={category === c} className={chip(category === c)}>
                  {c}
                </button>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <label className="block text-sm text-silver">
                Bike brand
                <select value={brand} onChange={(e) => setBrand(e.target.value)} className="field mt-1.5">
                  <option value="All">All brands</option>
                  {productBrands.map((b) => (
                    <option key={b} value={b} className="bg-charcoal">{b}</option>
                  ))}
                </select>
              </label>
              <div className="text-sm text-silver">
                Size
                <div role="group" aria-label="Size filter" className="mt-1.5 flex flex-wrap gap-1.5">
                  {['All', ...sizeOptions].map((s) => (
                    <button key={s} onClick={() => setSize(s)} aria-pressed={size === s} className={`${chip(size === s)} !px-3 !py-1.5 !text-base`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <label className="block text-sm text-silver">
                Sort by
                <select value={sort} onChange={(e) => setSort(e.target.value)} className="field mt-1.5">
                  <option value="featured" className="bg-charcoal">Featured first</option>
                  <option value="az" className="bg-charcoal">Name A–Z</option>
                  <option value="za" className="bg-charcoal">Name Z–A</option>
                </select>
              </label>
            </div>
          </div>

          <div className="mb-6 flex items-center justify-between text-silver/70" aria-live="polite">
            <p>{list.length} product{list.length === 1 ? '' : 's'} found</p>
            {filtersActive && (
              <button onClick={clearAll} className="flex items-center gap-1 text-sm text-brand hover:underline">
                <X size={16} /> Clear filters
              </button>
            )}
          </div>

          <AnimatePresence mode="popLayout">
            {list.length > 0 ? (
              <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {list.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center text-silver/70">
                <SearchX size={48} className="mx-auto text-brand" />
                <p className="mt-4 font-display text-3xl uppercase">No products found</p>
                <p className="mt-1">Try another search, or message us – we may have your model.</p>
                <button onClick={clearAll} className="btn btn-primary mt-6">Reset filters</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}
