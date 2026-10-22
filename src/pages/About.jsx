import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Boxes, Cog, Eye, Factory, Flame, ScanSearch, Target, Truck } from 'lucide-react'
import SEO from '../components/SEO'
import PageHeader from '../components/PageHeader'
import SectionTitle from '../components/SectionTitle'
import SmartImage from '../components/SmartImage'
import Reveal from '../components/Reveal'
import { site } from '../data/site'

const steps = [
  { icon: Factory, title: 'Raw Material', text: 'Selected alloy is checked before it enters production.' },
  { icon: Flame, title: 'Casting', text: 'Controlled casting for dense, uniform piston blanks.' },
  { icon: Cog, title: 'CNC Machining', text: 'Precision turning and grooving to exact dimensions.' },
  { icon: ScanSearch, title: 'Inspection', text: 'Every piece is measured and visually checked.' },
  { icon: Boxes, title: 'Packing', text: 'Sealed in branded BNF tin boxes, packed in cartons.' },
  { icon: Truck, title: 'Dispatch', text: 'Shipped from Ankleshwar to dealers across India.' },
]

export default function About() {
  return (
    <>
      <SEO
        title="About Us"
        path="/about"
        description="About BNF International Trade, Ankleshwar – supplier of extra heavy duty motorcycle piston kits and piston rings across India."
      />
      <PageHeader title="About" highlight="BNF" subtitle="Built in Ankleshwar. Trusted by mechanics and dealers across India." crumbs={[{ label: 'About' }]} />

      <section className="bg-jet py-20">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal x={-30}>
            <p className="font-display text-xl uppercase tracking-[0.3em] text-brand">Our story</p>
            <h2 className="mt-2 text-5xl font-bold italic leading-[0.95]">{site.company}</h2>
            <div className="mt-6 space-y-4 leading-relaxed text-silver/80">
              <p>
                {site.company}, based in Ankleshwar, Gujarat, supplies motorcycle piston kits, piston rings, piston pins and circlips under the
                BNF Piston &amp; Rings brand.
              </p>
              <p>
                Our promise is simple: extra heavy duty parts that fit properly and last long. Every kit is packed in a branded white and black
                tin box so dealers and mechanics can trust what they are handing to the customer.
              </p>
              <p>We supply wholesale and dealer orders to shops, garages and distributors across India.</p>
            </div>
            <Link to="/contact" className="btn btn-primary mt-8">Talk to {site.contactPerson}</Link>
          </Reveal>
          <Reveal x={30}>
            <div className="relative">
              <SmartImage src="/images/box-white-bg.jpg" alt="BNF Piston Kit tin box" className="aspect-[4/3] w-full border border-white/10" contain />
              <div className="checkered absolute -bottom-3 -right-3 -z-10 h-24 w-24" aria-hidden="true" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="brushed py-20">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {[
            { icon: Target, title: 'Our Mission', text: 'To deliver reliable, high-quality piston kits and rings at fair dealer prices, so every rider gets a smooth, long-lasting engine.' },
            { icon: Eye, title: 'Our Vision', text: 'To become the most trusted aftermarket piston brand in India, known for consistent quality and honest service.' },
          ].map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.1}>
              <div className="metal-card h-full p-8">
                <Icon size={40} className="text-brand" />
                <h3 className="mt-4 text-4xl font-bold italic">{title}</h3>
                <p className="mt-3 leading-relaxed text-silver/80">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-jet py-20 sm:py-28">
        <div className="container-x">
          <SectionTitle eyebrow="How we make it" title="Quality" highlight="Process" subtitle="Six steps from raw material to your shop." />
          <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <motion.li
                key={title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: (i % 3) * 0.12, duration: 0.6 }}
                className="metal-card relative p-7"
              >
                <span className="absolute right-4 top-2 font-display text-7xl font-bold italic text-brand/20">0{i + 1}</span>
                <span className="mb-4 flex h-14 w-14 items-center justify-center bg-brand"><Icon size={28} /></span>
                <h3 className="text-3xl font-semibold">{title}</h3>
                <p className="mt-2 text-silver/75">{text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}
