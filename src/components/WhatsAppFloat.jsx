import { MessageCircle } from 'lucide-react'
import { waLink } from '../data/site'

export default function WhatsAppFloat() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/50 transition hover:scale-110"
    >
      <span className="absolute inset-0 animate-pulseRing rounded-full bg-[#25D366]" aria-hidden="true" />
      <MessageCircle size={28} className="relative" fill="currentColor" />
      <span className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded bg-jet px-3 py-1.5 text-sm text-white opacity-0 shadow transition group-hover:opacity-100 md:block">
        Chat on WhatsApp
      </span>
    </a>
  )
}
