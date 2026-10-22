import { useState } from 'react'
import { BadgePercent, Handshake, Headphones, Package, Truck, Award, Send, CheckCircle2 } from 'lucide-react'
import SEO from '../components/SEO'
import PageHeader from '../components/PageHeader'
import SectionTitle from '../components/SectionTitle'
import FormField from '../components/FormField'
import Reveal from '../components/Reveal'
import useSimpleForm, { isValidPhone } from '../hooks/useSimpleForm'
import { site } from '../data/site'

const benefits = [
  { icon: BadgePercent, title: 'Dealer Pricing', text: 'Special wholesale rates for shops and distributors.' },
  { icon: Package, title: 'Carton Supply', text: 'Bulk cartons of branded tin boxes, ready to stock.' },
  { icon: Award, title: 'Consistent Quality', text: 'Every piece checked, so your customers come back.' },
  { icon: Truck, title: 'All-India Dispatch', text: 'Shipped from Ankleshwar by transport or courier.' },
  { icon: Headphones, title: 'Direct Support', text: `Talk directly to ${site.contactPerson} on call or WhatsApp.` },
  { icon: Handshake, title: 'Long-term Partnership', text: 'Grow your business with a supplier you can rely on.' },
]

const required = (label) => (v) => (v ? '' : `${label} is required`)

export default function Dealers() {
  const [sent, setSent] = useState(false)
  const { values, errors, onChange, validate, reset } = useSimpleForm(
    { name: '', shop: '', city: '', state: '', phone: '', message: '' },
    {
      name: required('Name'),
      shop: required('Shop name'),
      city: required('City'),
      state: required('State'),
      phone: (v) => (!v ? 'Phone number is required' : isValidPhone(v) ? '' : 'Enter a valid 10-digit mobile number'),
    },
  )

  const submit = (e) => {
    e.preventDefault()
    if (!validate()) return
    const msg = [
      'Hello Bilal bhai, I want to become a BNF dealer.',
      '',
      `Name: ${values.name.trim()}`,
      `Shop: ${values.shop.trim()}`,
      `City: ${values.city.trim()}`,
      `State: ${values.state.trim()}`,
      `Phone: ${values.phone.trim()}`,
      values.message.trim() && `Message: ${values.message.trim()}`,
    ]
      .filter((l) => l !== '' && l !== false)
      .join('\n')
    window.open(`https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener')
    setSent(true)
    reset()
  }

  return (
    <>
      <SEO
        title="Become a Dealer"
        path="/dealers"
        description="Become a BNF Piston & Rings dealer. Wholesale pricing, carton supply and all-India dispatch from Ankleshwar, Gujarat."
      />
      <PageHeader title="Become a" highlight="Dealer" subtitle="Stock BNF piston kits and rings in your shop." crumbs={[{ label: 'Dealers' }]} />

      <section className="bg-jet py-16 sm:py-24">
        <div className="container-x">
          <SectionTitle eyebrow="Dealer benefits" title="Why sell" highlight="BNF?" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={(i % 3) * 0.08}>
                <div className="metal-card h-full p-6 transition hover:border-brand/60">
                  <Icon size={34} className="text-brand" />
                  <h3 className="mt-3 text-3xl font-semibold">{title}</h3>
                  <p className="mt-1 text-silver/75">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="brushed py-16 sm:py-24" id="register">
        <div className="container-x max-w-3xl">
          <SectionTitle eyebrow="Dealer registration" title="Apply" highlight="Now" subtitle="Fill the form – it opens WhatsApp with your details so we can reply quickly." />
          <form onSubmit={submit} noValidate className="metal-card grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
            <FormField label="Your name" name="name" required value={values.name} onChange={onChange} error={errors.name} autoComplete="name" />
            <FormField label="Shop name" name="shop" required value={values.shop} onChange={onChange} error={errors.shop} autoComplete="organization" />
            <FormField label="City" name="city" required value={values.city} onChange={onChange} error={errors.city} autoComplete="address-level2" />
            <FormField label="State" name="state" required value={values.state} onChange={onChange} error={errors.state} autoComplete="address-level1" />
            <div className="sm:col-span-2">
              <FormField label="Phone / WhatsApp" name="phone" type="tel" inputMode="tel" required value={values.phone} onChange={onChange} error={errors.phone} autoComplete="tel" placeholder="e.g. 98765 43210" />
            </div>
            <div className="sm:col-span-2">
              <FormField label="Message (optional)" name="message" as="textarea" value={values.message} onChange={onChange} placeholder="Tell us which models you need…" />
            </div>
            <div className="sm:col-span-2">
              <button type="submit" className="btn btn-wa w-full"><Send size={18} /> Send on WhatsApp</button>
              {sent && (
                <p role="status" className="mt-3 flex items-center gap-2 text-sm text-[#25D366]">
                  <CheckCircle2 size={18} /> WhatsApp opened. Please press send there to complete your request.
                </p>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
