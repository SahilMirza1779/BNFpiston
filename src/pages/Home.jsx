import SEO from '../components/SEO'
import Hero from '../components/home/Hero'
import Stats from '../components/home/Stats'
import Categories from '../components/home/Categories'
import FeaturedSlider from '../components/home/FeaturedSlider'
import KitHotspots from '../components/home/KitHotspots'
import WhyBnf from '../components/home/WhyBnf'
import PackagingGallery from '../components/home/PackagingGallery'
import CompatibleWith from '../components/home/CompatibleWith'
import DealerCTA from '../components/home/DealerCTA'
import Testimonials from '../components/home/Testimonials'
import FAQ from '../components/home/FAQ'

export default function Home() {
  return (
    <>
      <SEO
        path="/"
        description="BNF Piston & Rings – extra heavy duty motorcycle piston kits, piston rings, pins and circlips. Wholesale supply from Ankleshwar, Gujarat to dealers across India."
      />
      <Hero />
      <Stats />
      <Categories />
      <FeaturedSlider />
      <KitHotspots />
      <WhyBnf />
      <PackagingGallery />
      <CompatibleWith />
      <DealerCTA />
      <Testimonials />
      <FAQ />
    </>
  )
}
