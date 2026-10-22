import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import SectionTitle from '../SectionTitle'
import { faqs } from '../../data/faqs'

export default function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section className="bg-jet py-20 sm:py-28">
      <div className="container-x max-w-3xl">
        <SectionTitle eyebrow="Got questions?" title="Frequently asked" highlight="questions" />
        <ul className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <li key={f.q} className={`metal-card transition ${isOpen ? 'border-brand/60' : ''}`}>
                <h3>
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left font-display text-2xl uppercase tracking-wide"
                  >
                    {f.q}
                    <Plus size={24} className={`shrink-0 text-brand transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 leading-relaxed text-silver/80">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
