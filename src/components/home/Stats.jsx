import useCountUp from '../../hooks/useCountUp'
import { stats } from '../../data/site'

function Stat({ value, suffix, label }) {
  const [ref, n] = useCountUp(value)
  return (
    <div className="relative px-4 py-8 text-center">
      <p className="font-display text-6xl font-bold italic text-white sm:text-7xl">
        <span ref={ref}>{n.toLocaleString('en-IN')}</span>
        <span className="text-brand">{suffix}</span>
      </p>
      <p className="mt-1 font-display text-xl uppercase tracking-[0.2em] text-silver/70">{label}</p>
    </div>
  )
}

export default function Stats() {
  return (
    <section className="bg-charcoal" aria-label="BNF in numbers">
      <div className="container-x grid grid-cols-2 divide-white/10 md:grid-cols-4 md:divide-x">
        {stats.map((s) => (
          <Stat key={s.label} {...s} />
        ))}
      </div>
    </section>
  )
}
