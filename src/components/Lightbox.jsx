import { useCallback, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import SmartImage from './SmartImage'
import useBodyLock from '../hooks/useBodyLock'

// images: [{ src, alt }]   index: number | null
export default function Lightbox({ images, index, onClose, onChange }) {
  const isOpen = index !== null && index !== undefined
  useBodyLock(isOpen)

  const prev = useCallback(() => onChange((index - 1 + images.length) % images.length), [index, images.length, onChange])
  const next = useCallback(() => onChange((index + 1) % images.length), [index, images.length, onChange])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose, prev, next])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 rounded-full bg-white/10 p-3 hover:bg-brand">
            <X size={22} />
          </button>
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev() }}
                aria-label="Previous image"
                className="absolute left-3 rounded-full bg-white/10 p-3 hover:bg-brand sm:left-6"
              >
                <ChevronLeft size={26} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next() }}
                aria-label="Next image"
                className="absolute right-3 rounded-full bg-white/10 p-3 hover:bg-brand sm:right-6"
              >
                <ChevronRight size={26} />
              </button>
            </>
          )}
          <motion.div
            key={index}
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-h-[85vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <SmartImage src={images[index].src} alt={images[index].alt} contain eager className="h-[75vh] w-full" />
            <p className="mt-3 text-center font-display text-xl uppercase tracking-widest text-silver">{images[index].alt}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
