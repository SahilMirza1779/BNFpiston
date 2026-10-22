import Reveal from './Reveal'

export default function SectionTitle({ eyebrow, title, highlight, subtitle, align = 'center', light = true }) {
  const alignCls = align === 'center' ? 'text-center mx-auto' : 'text-left'
  return (
    <Reveal className={`mb-12 max-w-3xl ${alignCls}`}>
      {eyebrow && (
        <div className={`mb-3 flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
          <span className="h-[3px] w-10 bg-brand" />
          <span className="font-display text-lg uppercase tracking-[0.3em] text-brand">{eyebrow}</span>
          <span className={`h-[3px] w-10 bg-brand ${align === 'center' ? '' : 'hidden'}`} />
        </div>
      )}
      <h2 className={`text-4xl font-bold italic leading-[0.95] sm:text-5xl md:text-6xl ${light ? 'text-white' : 'text-jet'}`}>
        {title} {highlight && <span className="text-brand">{highlight}</span>}
      </h2>
      {subtitle && <p className={`mt-4 text-base leading-relaxed sm:text-lg ${light ? 'text-silver/80' : 'text-neutral-600'}`}>{subtitle}</p>}
    </Reveal>
  )
}
