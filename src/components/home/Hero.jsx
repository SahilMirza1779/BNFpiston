import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'
import SmartImage from '../SmartImage'
import CheckeredStrip from '../CheckeredStrip'
import { site, waLink } from '../../data/site'

const marqueeText = 'BNF INTERNATIONAL TRADE • PISTON KITS • PISTON RINGS • HIGH QUALITY • EXTRA HEAVY DUTY • '

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const rotate = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60])
  const imgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120])
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60])

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-jet">
      {/* background layers */}
      <div className="brushed absolute inset-0 -z-10" />
      <div className="absolute -right-40 top-0 -z-10 h-[700px] w-[700px] rounded-full bg-brand/25 blur-[140px]" aria-hidden="true" />
      <div className="absolute -left-40 bottom-0 -z-10 h-[500px] w-[500px] rounded-full bg-silver/10 blur-[140px]" aria-hidden="true" />
      <div
        className="absolute inset-0 -z-10 opacity-[0.07]"
        style={{ backgroundImage: 'linear-gradient(115deg, transparent 45%, #fff 45%, #fff 46%, transparent 46%)', backgroundSize: '60px 100%' }}
        aria-hidden="true"
      />

      <div className="container-x grid min-h-[calc(100vh-72px)] items-center gap-8 py-16 lg:grid-cols-2 lg:py-24">
        <motion.div style={{ y: textY }}>
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 inline-flex items-center gap-3 font-display text-xl uppercase tracking-[0.3em] text-silver"
          >
            <span className="h-[3px] w-10 bg-brand" /> Motorcycle Spare Parts
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-[3.4rem] font-bold italic leading-[0.88] sm:text-7xl lg:text-[5.6rem] xl:text-[6.2rem]"
          >
            <span className="text-gradient-silver">Engineered for</span>
            <br />
            <span className="text-brand">Extra Heavy</span>
            <br />
            <span className="text-gradient-silver">Duty</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-silver/80"
          >
            Premium piston kits, piston rings, pins and circlips for popular Indian motorcycles. Precision machined, quality checked and
            packed in branded tin boxes — supplied to dealers across India from Ankleshwar, Gujarat.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <Link to="/products" className="btn btn-primary">
              View Products <ArrowRight size={20} />
            </Link>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <MessageCircle size={20} /> WhatsApp Enquiry
            </a>
          </motion.div>
          <p className="mt-6 text-sm text-silver/60">
            {site.company} • {site.city}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          style={{ y: imgY }}
          className="relative mx-auto aspect-square w-full max-w-[300px] sm:max-w-md lg:max-w-[560px]"
        >
          <div className="absolute inset-0 rounded-full border border-white/10" aria-hidden="true" />
          <div className="absolute inset-6 rounded-full border border-dashed border-brand/50" aria-hidden="true" />
          <div className="absolute inset-12 rounded-full bg-gradient-radial from-brand/30 to-transparent blur-2xl" aria-hidden="true" />
          <motion.div style={{ rotate }} className="absolute inset-10">
            <div className="h-full w-full animate-floaty">
              <SmartImage
                src="/images/piston-kit-full.jpg"
                alt="BNF piston kit with piston, pin, circlips and rings"
                className="h-full w-full rounded-full shadow-[0_30px_80px_rgba(215,38,43,.35)] ring-4 ring-white/10"
                eager
              />
            </div>
          </motion.div>
          <span className="absolute -bottom-2 left-2 bg-brand px-4 py-1 font-display text-2xl font-semibold uppercase italic leading-none">
            Heavy Duty
          </span>
        </motion.div>
      </div>

      {/* marquee + checkered strip */}
      <div className="overflow-hidden border-y border-white/10 bg-black py-3" aria-hidden="true">
        <div className="flex w-max animate-marquee whitespace-nowrap font-display text-2xl uppercase tracking-[0.2em] text-silver/70">
          <span>{marqueeText.repeat(4)}</span>
          <span>{marqueeText.repeat(4)}</span>
        </div>
      </div>
      <CheckeredStrip />
    </section>
  )
}
