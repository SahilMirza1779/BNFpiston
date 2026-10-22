import { Clock, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react'
import SEO from '../components/SEO'
import PageHeader from '../components/PageHeader'
import FormField from '../components/FormField'
import Reveal from '../components/Reveal'
import useSimpleForm, { isValidEmail, isValidPhone } from '../hooks/useSimpleForm'
import { site, waLink } from '../data/site'

const cards = [
  { icon: Phone, title: 'Call Us', text: site.phoneDisplay, href: `tel:${site.phoneRaw}` },
  { icon: MessageCircle, title: 'WhatsApp', text: `Chat with ${site.contactPerson}`, href: waLink(), external: true },
  { icon: Mail, title: 'Email', text: site.email, href: `mailto:${site.email}` },
  { icon: MapPin, title: 'Visit Us', text: site.addressOneLine, href: site.mapLink, external: true },
]

export default function Contact() {
  const { values, errors, onChange, validate, reset } = useSimpleForm(
    { name: '', phone: '', email: '', message: '' },
    {
      name: (v) => (v ? '' : 'Name is required'),
      phone: (v) => (!v ? 'Phone number is required' : isValidPhone(v) ? '' : 'Enter a valid 10-digit mobile number'),
      email: (v) => (!v || isValidEmail(v) ? '' : 'Enter a valid email address'),
      message: (v) => (v.length >= 5 ? '' : 'Please write your message'),
    },
  )

  const body = () =>
    `Name: ${values.name.trim()}\nPhone: ${values.phone.trim()}${values.email.trim() ? `\nEmail: ${values.email.trim()}` : ''}\n\n${values.message.trim()}`

  const sendWhatsApp = (e) => {
    e.preventDefault()
    if (!validate()) return
    window.open(`https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(`Hello Bilal bhai,\n${body()}`)}`, '_blank', 'noopener')
    reset()
  }

  const sendEmail = () => {
    if (!validate()) return
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent('Enquiry – BNF Piston & Rings')}&body=${encodeURIComponent(body())}`
  }

  return (
    <>
      <SEO
        title="Contact Us"
        path="/contact"
        description="Contact BNF International Trade, Ankleshwar, Gujarat. Call or WhatsApp +91 63536 10308 for piston kit and piston ring enquiries."
      />
      <PageHeader title="Contact" highlight="Us" subtitle={`Talk directly to ${site.contactPerson} for prices, models and bulk orders.`} crumbs={[{ label: 'Contact' }]} />

      <section className="bg-jet py-16 sm:py-20">
        <div className="container-x">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map(({ icon: Icon, title, text, href, external }, i) => (
              <Reveal key={title} delay={i * 0.07}>
                <a
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="metal-card group block h-full p-6 transition hover:-translate-y-1 hover:border-brand/60"
                >
                  <span className="mb-4 flex h-12 w-12 items-center justify-center bg-brand transition group-hover:rotate-6"><Icon size={24} /></span>
                  <h3 className="text-2xl font-semibold">{title}</h3>
                  <p className="mt-1 break-words text-sm text-silver/75">{text}</p>
                </a>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-2">
            <form onSubmit={sendWhatsApp} noValidate className="metal-card space-y-5 p-6 sm:p-8">
              <h2 className="text-4xl font-bold italic">Send an <span className="text-brand">Enquiry</span></h2>
              <FormField label="Your name" name="name" required value={values.name} onChange={onChange} error={errors.name} autoComplete="name" />
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField label="Phone" name="phone" type="tel" inputMode="tel" required value={values.phone} onChange={onChange} error={errors.phone} autoComplete="tel" />
                <FormField label="Email (optional)" name="email" type="email" value={values.email} onChange={onChange} error={errors.email} autoComplete="email" />
              </div>
              <FormField label="Message" name="message" as="textarea" required value={values.message} onChange={onChange} error={errors.message} placeholder="Which bike / model do you need?" />
              <div className="flex flex-wrap gap-3">
                <button type="submit" className="btn btn-wa flex-1"><MessageCircle size={18} /> Send via WhatsApp</button>
                <button type="button" onClick={sendEmail} className="btn btn-dark flex-1"><Send size={18} /> Send via Email</button>
              </div>
            </form>

            <div className="space-y-6">
              <div className="metal-card p-6 sm:p-8">
                <h2 className="flex items-center gap-3 text-3xl font-bold italic"><Clock className="text-brand" /> Business Hours</h2>
                <ul className="mt-4 divide-y divide-white/10">
                  {site.hours.map((h) => (
                    <li key={h.day} className="flex flex-wrap justify-between gap-2 py-3">
                      <span className="text-silver">{h.day}</span>
                      <span className="font-medium">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <iframe
                title="BNF International Trade location map"
                src={site.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-72 w-full border border-white/10"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
