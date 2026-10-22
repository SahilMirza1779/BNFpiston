import { useState } from 'react'

export const isValidPhone = (v) => /^(\+?91)?[6-9]\d{9}$/.test(v.replace(/[\s-]/g, ''))
export const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)

// validators: { fieldName: (value, allValues) => 'error message' | '' }
export default function useSimpleForm(initial, validators) {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})

  const onChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: '' }))
  }

  const validate = () => {
    const next = {}
    Object.entries(validators).forEach(([key, fn]) => {
      const msg = fn((values[key] || '').trim(), values)
      if (msg) next[key] = msg
    })
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const reset = () => {
    setValues(initial)
    setErrors({})
  }

  return { values, errors, onChange, validate, reset }
}
