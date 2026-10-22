import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import SectionTitle from '../SectionTitle'
import SmartImage from '../SmartImage'
import Reveal from '../Reveal'

const cats = [
  { name: 'Piston Kits', img: '/images/piston-kit-full.jpg', text: 'Complete kits – piston, pin, circlips and rings.' },
  { name: 'Piston Rings', img: '/images/rings-set.jpg', text: 'Compression and oil rings for smooth sealing.' },
  { name: 'Piston Pins & Circlips', img: '/images/piston-pin-clips.jpg', text: 'Hardened pins with matching circlips.' },
  { name: 'Oversize Pistons', img: '/images/piston-crown-50.jpg', text: 'STD / 25 / 50 / 75 / 100 for re-bored cylinders.' },
]

export default function Categories() {
  return (
    <section className="bg-jet py-20 sm:py-28">
      <div className="container-x">
        <SectionTitle eyebrow="What we supply" title="Product" highlight="Categories" subtitle="Everything your engine needs for a perfect rebuild." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cats.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.08}>
              <Link
                to={`/products?category=${encodeURIComponent(c.name)}`}
                className="metal-card group relative block overflow-hidden"
                aria-label={`Browse ${c.name}`}
              >
                <SmartImage src={c.img} alt={c.name} className="aspect-[4/5] w-full" imgClassName="transition duration-700 group-hover:scale-110 group-hover:rotate-1" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-3xl font-bold italic leading-none">{c.name}</h3>
                  <p className="mt-2 text-sm text-silver/80">{c.text}</p>
                  <span className="mt-3 inline-flex items-center gap-1 font-display text-lg uppercase tracking-wider text-brand transition-all group-hover:gap-3">
                    Explore <ArrowUpRight size={18} />
                  </span>
                </div>
                <span className="absolute left-0 top-0 h-1 w-0 bg-brand transition-all duration-500 group-hover:w-full" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
