import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionTitle from "../SectionTitle";
import SmartImage from "../SmartImage";
import Reveal from "../Reveal";
import { products } from "../../data/products";

const cats = [
  {
    name: "Piston Kits",
    img: products.find((p) => p.category === "Piston Kits").images[0],
    text: "Complete kits – piston, pin, circlips and rings.",
  },
  {
    name: "Piston Rings",
    img: products.find((p) => p.category === "Piston Rings").images[0],
    text: "Compression and oil rings for smooth sealing.",
  },
  {
    name: "Piston Pins & Circlips",
    img: products.find((p) => p.category === "Piston Pins & Circlips").images[0],
    text: "Hardened pins with matching circlips.",
  },
  {
    name: "Oversize Pistons",
    img: products.find((p) => p.category === "Oversize Pistons").images[0],
    text: "STD / 25 / 50 / 75 / 100 for re-bored cylinders.",
  },
];

export default function Categories() {
  return (
    // bg-jet ko bg-white kar diya
    <section className="bg-white py-20 sm:py-28">
      <div className="container-x">
        <SectionTitle
          eyebrow="What we supply"
          title="Product"
          highlight="Categories"
          subtitle="Everything your engine needs for a perfect rebuild."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cats.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.08}>
              <Link
                to={`/products?category=${encodeURIComponent(c.name)}`}
                // metal-card ki jagah light card styling di
                className="group relative block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
                aria-label={`Browse ${c.name}`}
              >
                <SmartImage
                  src={c.img}
                  alt={c.name}
                  className="aspect-[4/5] w-full"
                  imgClassName="transition duration-700 group-hover:scale-110 group-hover:rotate-1"
                />
                {/* Gradient ko waisa hi rakha hai taaki white text image par chamke */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-3xl font-bold italic leading-none text-white">
                    {c.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-300">{c.text}</p>
                  <span className="mt-3 inline-flex items-center gap-1 font-display text-lg uppercase tracking-wider text-brand transition-all group-hover:gap-3">
                    Explore <ArrowUpRight size={18} />
                  </span>
                </div>
                <span className="absolute left-0 top-0 h-1 w-0 bg-brand transition-all duration-500 group-hover:w-full" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
