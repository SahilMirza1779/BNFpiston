import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import SEO from '../components/SEO'
import CheckeredStrip from '../components/CheckeredStrip'

export default function NotFound() {
  return (
    <>
      <SEO title="Page Not Found" path="/404" />
      <section className="brushed flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <p className="font-display text-[9rem] font-bold italic leading-none text-gradient-silver sm:text-[14rem]">
          4<span className="text-brand">0</span>4
        </p>
        <CheckeredStrip height={16} className="max-w-xs" />
        <h1 className="mt-6 text-4xl font-bold italic sm:text-5xl">Wrong turn, rider!</h1>
        <p className="mt-3 max-w-md text-silver/70">The page you are looking for doesn't exist or has moved.</p>
        <Link to="/" className="btn btn-primary mt-8"><Home size={20} /> Back to Home</Link>
      </section>
    </>
  )
}
