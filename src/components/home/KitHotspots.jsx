import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionTitle from '../SectionTitle'
import SmartImage from '../SmartImage'

// x / y are percentages on the kit image. Adjust if you replace the photo.
const parts = [
  { id: 'piston', label: 'Piston', x: 30, y: 45, text: 'Extra heavy duty alloy piston, CNC machined for exact clearance and strong heat resistance.' },
  { id: 'pin', label: 'Piston Pin', x: 52, y: 72, text: 'Hardened and ground pin for a smooth, secure connection to the connecting rod.' },
  { id: 'circlips', label: 'Circlips', x: 66, y: 62, text: 'Two circlips that lock the pin in place – no side movement, no scoring.' },
  { id: 'rings', label: 'Compression Rings', x: 75, y: 30, text: 'Top and second rings maintain compression and seal combustion gases.' },
  { id: 'oil', label: 'Oil Ring', x: 50, y: 22, text: 'Controls oil film on the cylinder wall to cut oil consumption.' },
]

export default function KitHotspots() {
  const [active, setActive] = useState(parts[0].id)
  const current = parts.find((p) => p.id === active)

  return (
    <section className="bg-jet py-20 sm:py-28">
      <div className="container-x">
        <SectionTitle eyebrow="Complete kit" title="What's inside" highlight="the kit" subtitle="Tap a point on the image or choose a part to learn more." />
        <div className="grid items-center gap-10 lg:grid-cols-5">
          <div className="relative lg:col-span-3">
            <SmartImage
              src="/images/piston-kit-full.jpg"
              alt="BNF piston kit contents: piston, pin, circlips, compression rings and oil ring"
              className="aspect-[4/3] w-full border border-white/10"
            />
            {parts.map((p) => (
              <button
                key={p.id}
                onClick={() => setActive(p.id)}
                aria-label={p.label}
                aria-pressed={active === p.id}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              >
                <span
                  className={`absolute inset-0 rounded-full ${active === p.id ? 'animate-pulseRing bg-brand' : ''}`}
                  aria-hidden="true"
                />
                <span
                  className={`relative flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-xs font-bold shadow-lg transition ${
                    active === p.id ? 'bg-brand' : 'bg-black/70 group-hover:bg-brand'
                  }`}
                >
                  {parts.indexOf(p) + 1}
                </span>
                <span className="pointer-events-none absolute left-9 top-1/2 hidden -translate-y-1/2 whitespace-nowrap bg-black/85 px-2 py-0.5 font-display text-base uppercase tracking-wider sm:block">
                  {p.label}
                </span>
              </button>
            ))}
          </div>

          <div className="lg:col-span-2">
            <ul className="mb-6 flex flex-wrap gap-2">
              {parts.map((p, i) => (
                <li key={p.id}>
                  <button
                    onClick={() => setActive(p.id)}
                    aria-pressed={active === p.id}
                    className={`px-4 py-2 font-display text-lg uppercase tracking-wider transition ${
                      active === p.id ? 'bg-brand text-white' : 'border border-white/20 text-silver hover:border-brand'
                    }`}
                  >
                    {i + 1}. {p.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="metal-card min-h-[160px] p-6" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div key={current.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
                  <h3 className="text-4xl font-bold italic text-brand">{current.label}</h3>
                  <p className="mt-3 leading-relaxed text-silver/80">{current.text}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
