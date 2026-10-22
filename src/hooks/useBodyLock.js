import { useEffect } from 'react'

// Prevents background scrolling while a drawer / lightbox / menu is open
export default function useBodyLock(locked) {
  useEffect(() => {
    if (!locked) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [locked])
}
