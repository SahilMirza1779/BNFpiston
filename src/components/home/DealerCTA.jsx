import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import CheckeredStrip from '../CheckeredStrip'
import Reveal from '../Reveal'
import { waLink } from '../../data/site'

export default function DealerCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-brand-deep via-brand to-brand-deep">
      <CheckeredStrip height={16} />
      <Reveal className="container-x flex flex-col items-center gap-6 py-16 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <h2 className="text-5xl font-bold italic leading-[0.95] sm:text-6xl">Become a BNF Dealer</h2>
          <p className="mt-3 max-w-xl text-lg text-white/90">
            Dealer-friendly pricing, carton supply and fast dispatch from Ankleshwar. Grow your spare parts business with BNF.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/dealers" className="btn bg-jet text-white hover:bg-white hover:text-jet">Apply Now</Link>
          <a href={waLink('Hello Bilal bhai, I want to become a BNF dealer.')} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            <MessageCircle size={20} /> WhatsApp
          </a>
        </div>
      </Reveal>
      <CheckeredStrip height={16} />
    </section>
  )
}
