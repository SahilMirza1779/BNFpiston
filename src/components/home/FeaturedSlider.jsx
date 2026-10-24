import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SectionTitle from "../SectionTitle";
import ProductCard from "../ProductCard";
import { products } from "../../data/products";

export default function FeaturedSlider() {
  const featured = products.filter((p) => p.featured);
  return (
    // brushed class hata kar bg-white kar diya
    <section className="bg-white py-20 sm:py-28">
      <div className="container-x">
        <SectionTitle
          eyebrow="Best sellers"
          title="Featured"
          highlight="Products"
          subtitle="Our most-requested piston kits and ring sets."
        />
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1.1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="!px-1 !pb-14 !pt-1"
        >
          {featured.map((p, i) => (
            <SwiperSlide key={p.id} className="!h-auto">
              <ProductCard product={p} index={i} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="mt-4 text-center">
          <Link to="/products" className="btn btn-primary">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
