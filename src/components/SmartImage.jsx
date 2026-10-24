import { useState } from 'react'

// Image with lazy loading + a neutral placeholder when the file is missing.
export default function SmartImage({ src, alt, className = '', imgClassName = '', eager = false, contain = false, ...rest }) {
  const [failed, setFailed] = useState(false)

  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-gray-100 to-gray-50 text-gray-400 ${className}`}
      >
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>
        <span className="px-3 text-center font-display text-sm uppercase tracking-widest">BNF Piston &amp; Rings</span>
      </div>
    )
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onError={() => setFailed(true)}
        className={`h-full w-full ${contain ? 'object-contain' : 'object-cover'} ${imgClassName}`}
        {...rest}
      />
    </div>
  )
}
