import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, Send, Trash2, X } from 'lucide-react'
import SmartImage from './SmartImage'
import { useEnquiry } from '../context/EnquiryContext'
import useBodyLock from '../hooks/useBodyLock'

export default function EnquiryDrawer() {
  const { items, open, closeDrawer, updateQty, removeItem, clear, sendWhatsApp } = useEnquiry()
  useBodyLock(open)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && closeDrawer()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, closeDrawer])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Enquiry list"
            className="fixed right-0 top-0 z-[80] flex h-full w-full max-w-md flex-col border-l border-white/10 bg-charcoal shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: 'easeOut' }}
          >
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <h2 className="text-3xl font-bold italic">
                Enquiry <span className="text-brand">List</span>
              </h2>
              <button onClick={closeDrawer} aria-label="Close enquiry list" className="rounded-full p-2 hover:bg-brand">
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <div className="mt-16 text-center text-silver/70">
                  <p className="font-display text-2xl uppercase">Your list is empty</p>
                  <p className="mt-2 text-sm">Add products to send one combined enquiry on WhatsApp.</p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((i) => (
                    <li key={i.key} className="flex gap-3 border border-white/10 bg-black/40 p-3">
                      <SmartImage src={i.image} alt={i.name} className="h-20 w-20 shrink-0 bg-black" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold">{i.name}</p>
                        <p className="text-xs text-silver/70">
                          Model: {i.model} • Size: <span className="text-brand">{i.size}</span>
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <button onClick={() => updateQty(i.key, i.qty - 1)} aria-label="Decrease quantity" className="border border-white/20 p-1 hover:bg-brand">
                            <Minus size={14} />
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={i.qty}
                            onChange={(e) => updateQty(i.key, parseInt(e.target.value, 10))}
                            aria-label={`Quantity for ${i.name}`}
                            className="w-14 border border-white/20 bg-transparent py-0.5 text-center text-sm outline-none focus:border-brand"
                          />
                          <button onClick={() => updateQty(i.key, i.qty + 1)} aria-label="Increase quantity" className="border border-white/20 p-1 hover:bg-brand">
                            <Plus size={14} />
                          </button>
                          <button onClick={() => removeItem(i.key)} aria-label={`Remove ${i.name}`} className="ml-auto p-1 text-silver/60 hover:text-brand">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="space-y-3 border-t border-white/10 p-5">
                <button onClick={sendWhatsApp} className="btn btn-wa w-full">
                  <Send size={18} /> Send Enquiry on WhatsApp
                </button>
                <button onClick={clear} className="w-full text-sm text-silver/60 underline hover:text-brand">
                  Clear list
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
