import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { site } from '../data/site'

const STORAGE_KEY = 'bnf-enquiry-v1'
const EnquiryContext = createContext(null)

const load = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function EnquiryProvider({ children }) {
  const [items, setItems] = useState(load)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* storage unavailable – list still works in memory */
    }
  }, [items])

  const addItem = useCallback((product, size = 'STD', qty = 1) => {
    const key = `${product.slug}__${size}`
    setItems((prev) => {
      const found = prev.find((i) => i.key === key)
      if (found) return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i))
      return [
        ...prev,
        { key, slug: product.slug, name: product.name, model: product.model, image: product.images?.[0], size, qty },
      ]
    })
    setOpen(true)
  }, [])

  const updateQty = useCallback((key, qty) => {
    setItems((prev) => prev.map((i) => (i.key === key ? { ...i, qty: Math.max(1, Math.min(9999, qty || 1)) } : i)))
  }, [])

  const removeItem = useCallback((key) => setItems((prev) => prev.filter((i) => i.key !== key)), [])
  const clear = useCallback(() => setItems([]), [])

  const buildMessage = useCallback(() => {
    const lines = items.map(
      (i, n) => `${n + 1}. ${i.name} (${i.model}) – Size: ${i.size} – Qty: ${i.qty}`,
    )
    return `Hello Bilal bhai, I want to enquire about the following BNF Piston & Rings products:\n\n${lines.join('\n')}\n\nPlease share price and availability.`
  }, [items])

  const sendWhatsApp = useCallback(() => {
    if (!items.length) return
    window.open(`https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(buildMessage())}`, '_blank', 'noopener')
  }, [items, buildMessage])

  const value = useMemo(
    () => ({
      items,
      count: items.reduce((s, i) => s + i.qty, 0),
      open,
      openDrawer: () => setOpen(true),
      closeDrawer: () => setOpen(false),
      addItem,
      updateQty,
      removeItem,
      clear,
      sendWhatsApp,
    }),
    [items, open, addItem, updateQty, removeItem, clear, sendWhatsApp],
  )

  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>
}

export const useEnquiry = () => {
  const ctx = useContext(EnquiryContext)
  if (!ctx) throw new Error('useEnquiry must be used inside EnquiryProvider')
  return ctx
}
