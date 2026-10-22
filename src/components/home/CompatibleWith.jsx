import { bikeBrands } from '../../data/site'
import Reveal from '../Reveal'

// Text-only badges on purpose: we are an aftermarket supplier, not an official partner of these brands.
export default function CompatibleWith() {
  return (
    <section className="border-y border-white/10 bg-charcoal py-14">
      <Reveal className="container-x text-center">
        <h2 className="text-3xl font-semibold italic sm:text-4xl">
          Compatible with popular Indian motorcycles
        </h2>
        <ul className="mt-6 flex flex-wrap justify-center gap-3">
          {bikeBrands.map((b) => (
            <li key={b} className="border border-white/20 bg-black px-6 py-2 font-display text-2xl uppercase tracking-widest text-silver">
              {b}
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-5 max-w-2xl text-xs text-silver/50">
          Brand names are used only to describe fitment. BNF is an independent aftermarket parts supplier and is not affiliated with these manufacturers.
        </p>
      </Reveal>
    </section>
  )
}
