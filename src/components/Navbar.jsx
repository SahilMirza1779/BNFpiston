import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ClipboardList } from 'lucide-react'
import Logo from './Logo'
import { navLinks } from '../data/site'
import { useEnquiry } from '../context/EnquiryContext'
import useBodyLock from '../hooks/useBodyLock'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname, hash } = useLocation()
  const { count, openDrawer } = useEnquiry()
  useBodyLock(open)

  useEffect(() => setOpen(false), [pathname, hash])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const isActive = (to) => {
    const [path, h] = to.split('#')
    if (h) return pathname === (path || '/') && hash === `#${h}`
    if (path === '/') return pathname === '/' && !hash
    return pathname.startsWith(path)
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled ? 'border-white/10 bg-jet/80 shadow-xl shadow-black/40 backdrop-blur-xl' : 'border-transparent bg-jet/60 backdrop-blur-md'
      }`}
    >
      <nav className="container-x flex h-[72px] items-center justify-between" aria-label="Main navigation">
        <Link to="/" className="flex items-center gap-3" aria-label="BNF Piston & Rings – Home">
          <Logo className="h-11 w-11" />
          <div className="leading-none">
            <span className="block font-display text-3xl font-bold italic tracking-wider">
              BNF <span className="text-brand">PISTON</span>
            </span>
            <span className="block text-[10px] uppercase tracking-[0.35em] text-silver/70">&amp; Rings</span>
          </div>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                aria-current={isActive(l.to) ? 'page' : undefined}
                className={`relative px-4 py-2 font-display text-xl uppercase tracking-wider transition-colors hover:text-brand ${
                  isActive(l.to) ? 'text-brand' : 'text-white'
                }`}
              >
                {l.label}
                {isActive(l.to) && <motion.span layoutId="nav-underline" className="absolute inset-x-4 -bottom-0.5 h-[3px] bg-brand" />}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={openDrawer}
            aria-label={`Open enquiry list, ${count} items`}
            className="relative rounded-full border border-white/15 p-2.5 transition hover:border-brand hover:text-brand"
          >
            <ClipboardList size={20} />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </button>
          <Link to="/contact" className="btn btn-primary hidden !px-5 !py-2 sm:inline-flex">
            Get Quote
          </Link>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="relative flex h-11 w-11 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span className={`h-[3px] w-6 bg-white transition-all duration-300 ${open ? 'translate-y-[8px] rotate-45 bg-brand' : ''}`} />
            <span className={`h-[3px] w-6 bg-white transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`h-[3px] w-6 bg-white transition-all duration-300 ${open ? '-translate-y-[8px] -rotate-45 bg-brand' : ''}`} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-white/10 bg-jet/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="container-x flex max-h-[calc(100vh-72px)] flex-col overflow-y-auto py-4">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.to}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    to={l.to}
                    className={`block border-b border-white/5 py-3 font-display text-3xl uppercase tracking-wider ${
                      isActive(l.to) ? 'text-brand' : 'text-white'
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
              <li className="py-4">
                <Link to="/contact" className="btn btn-primary w-full">
                  Get Quote
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
