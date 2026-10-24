import { useState } from "react";
import { ZoomIn } from "lucide-react";
import SectionTitle from "../SectionTitle";
import SmartImage from "../SmartImage";
import Lightbox from "../Lightbox";
import Reveal from "../Reveal";
import { createPackagingImages } from "../../data/productImages.js";

const packagingImages = createPackagingImages();
const shots = [
  {
    src: packagingImages[0],
    alt: "BNF Piston Kit tin box – front",
    span: "sm:col-span-2 sm:row-span-2",
  },
  { src: packagingImages[2], alt: "BNF tin box lid – top view", span: "" },
  {
    src: packagingImages[1],
    alt: "BNF tin box back label with address",
    span: "",
  },
  {
    src: packagingImages[3],
    alt: "Carton full of BNF tin boxes for wholesale",
    span: "sm:col-span-2",
  },
];

export default function PackagingGallery() {
  const [index, setIndex] = useState(null);
  return (
    // bg-jet ko bg-gray-50 kiya
    <section className="bg-gray-50 py-20 sm:py-28">
      <div className="container-x">
        <SectionTitle
          eyebrow="Packaging"
          title="Premium"
          highlight="Tin Packaging"
          subtitle="White and black branded tin boxes, packed in cartons for safe delivery to your shop."
        />
        <div className="grid auto-rows-[200px] gap-4 sm:grid-cols-4 sm:auto-rows-[220px]">
          {shots.map((s, i) => (
            <Reveal key={s.src} delay={i * 0.08} className={s.span}>
              <button
                onClick={() => setIndex(i)}
                aria-label={`Enlarge: ${s.alt}`}
                className="group relative block h-full w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <SmartImage
                  src={s.src}
                  alt={s.alt}
                  className="h-full w-full"
                  imgClassName="transition duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-brand/0 opacity-0 text-white transition group-hover:bg-black/60 group-hover:opacity-100">
                  <ZoomIn size={36} />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
      <Lightbox
        images={shots}
        index={index}
        onChange={setIndex}
        onClose={() => setIndex(null)}
      />
    </section>
  );
}
