import { motion } from 'framer-motion'
import Logo from './Logo'

export default function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-jet"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      role="status"
      aria-label="Loading"
    >
      <div className="relative flex h-32 w-32 items-center justify-center">
        <span className="absolute inset-0 animate-spin rounded-full border-4 border-white/10 border-t-brand" />
        <span
          className="absolute inset-3 animate-spin rounded-full border-2 border-white/10 border-b-silver"
          style={{ animationDirection: 'reverse', animationDuration: '1.4s' }}
        />
        <Logo className="h-16 w-16 rounded-full" />
      </div>
      <p className="mt-6 font-display text-2xl uppercase tracking-[0.35em] text-silver">BNF Piston &amp; Rings</p>
      <div className="checkered mt-4 h-3 w-40" aria-hidden="true" style={{ backgroundSize: '12px 12px' }} />
    </motion.div>
  )
}
