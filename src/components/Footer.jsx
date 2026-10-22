import { Link } from 'react-router-dom'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import CheckeredStrip from './CheckeredStrip'
import Logo from './Logo'
import { categories } from '../data/products'
import { navLinks, site, waLink } from '../data/site'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-black">
      <CheckeredStrip />
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="mb-4 flex items-center gap-3">
            <Logo className="h-12 w-12" />
            <span className="font-display text-3xl font-bold italic leading-none">
              BNF <span className="text-brand">PISTON</span>
              <span className="block text-xs tracking-[0.35em] text-silver/70">&amp; RINGS</span>
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-silver/70">
            Extra heavy duty, high quality motorcycle piston kits and piston rings. Manufactured / Marketed by {site.company}, Ankleshwar,
            Gujarat.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-2xl font-semibold text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm text-silver/70">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition hover:text-brand">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-2xl font-semibold text-white">Products</h3>
          <ul className="space-y-2 text-sm text-silver/70">
            {categories.map((c) => (
              <li key={c}>
                <Link to={`/products?category=${encodeURIComponent(c)}`} className="transition hover:text-brand">
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-2xl font-semibold text-white">Contact</h3>
          <ul className="space-y-3 text-sm text-silver/70">
            <li className="flex gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-brand" />
              <address className="not-italic">{site.addressOneLine}</address>
            </li>
            <li className="flex gap-3">
              <Phone size={18} className="shrink-0 text-brand" />
              <a href={`tel:${site.phoneRaw}`} className="hover:text-brand">{site.phoneDisplay}</a>
            </li>
            <li className="flex gap-3">
              <MessageCircle size={18} className="shrink-0 text-brand" />
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="hover:text-brand">WhatsApp {site.contactPerson}</a>
            </li>
            <li className="flex gap-3">
              <Mail size={18} className="shrink-0 text-brand" />
              <a href={`mailto:${site.email}`} className="break-all hover:text-brand">{site.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-x pb-10">
        <iframe
          title="BNF International Trade location – Lords Plaza, Ankleshwar"
          src={site.mapEmbed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-56 w-full border border-white/10 opacity-90 grayscale transition hover:grayscale-0"
        />
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-silver/60">
        © {year} {site.company}. All rights reserved.
      </div>
    </footer>
  )
}
