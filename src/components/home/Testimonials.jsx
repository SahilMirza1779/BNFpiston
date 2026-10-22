import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { Quote, Star } from 'lucide-react'
import SectionTitle from '../SectionTitle'
import { testimonials } from '../../data/testimonials'

export default function Testimonials() {
  return (
    <section className="brushed py-20 sm:py-28">
      <div className="container-x">
        <SectionTitle eyebrow="Dealer feedback" title="What dealers" highlight="say" />
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{ 768: { slidesPerView: 2 }, 1100: { slidesPerView: 3 } }}
          className="!pb-14"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.name} className="!h-auto">
              <figure className="metal-card relative h-full p-7">
                <Quote size={40} className="absolute right-5 top-5 text-brand/30" aria-hidden="true" />
                <div className="mb-4 flex gap-1 text-brand" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <blockquote className="leading-relaxed text-silver/90">“{t.text}”</blockquote>
                <figcaption className="mt-5 border-t border-white/10 pt-4">
                  <p className="font-display text-2xl uppercase tracking-wider">{t.name}</p>
                  <p className="text-sm text-silver/60">{t.shop} • {t.city}</p>
                </figcaption>
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
