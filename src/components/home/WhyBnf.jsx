import {
  Cog,
  Crosshair,
  Gauge,
  HandCoins,
  Package,
  ShieldCheck,
} from "lucide-react";
import SectionTitle from "../SectionTitle";
import Reveal from "../Reveal";

const items = [
  {
    icon: ShieldCheck,
    title: "Extra Heavy Duty Alloy",
    text: "Strong alloy built to survive heat, load and long running hours.",
  },
  {
    icon: Cog,
    title: "Precision CNC Finish",
    text: "Computer-controlled machining for exact dimensions on every piece.",
  },
  {
    icon: Crosshair,
    title: "Perfect Fitment",
    text: "Made to standard sizes so it drops in without extra work.",
  },
  {
    icon: Gauge,
    title: "Long Engine Life",
    text: "Better sealing and lower friction for lasting compression.",
  },
  {
    icon: Package,
    title: "Premium Tin Packaging",
    text: "Branded white and black tin boxes keep parts safe and genuine-looking.",
  },
  {
    icon: HandCoins,
    title: "Dealer-friendly Pricing",
    text: "Wholesale rates and carton supply for shops and distributors.",
  },
];

export default function WhyBnf() {
  return (
    // brushed class ko bg-white se replace kiya
    <section id="why-bnf" className="scroll-mt-20 bg-white py-20 sm:py-28">
      <div className="container-x">
        <SectionTitle
          eyebrow="The BNF advantage"
          title="Why choose"
          highlight="BNF"
          subtitle="Built for mechanics who can't afford a second repair."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={(i % 3) * 0.08}>
              {/* metal-card ko light card se replace kiya */}
              <div className="group relative h-full overflow-hidden rounded-xl border border-gray-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-brand/60 hover:shadow-md">
                <span
                  className="absolute -right-4 -top-6 font-display text-[7rem] font-bold italic leading-none text-gray-900/[0.03]"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-brand text-white transition group-hover:rotate-6 group-hover:scale-110">
                  <Icon size={28} />
                </span>
                <h3 className="text-3xl font-semibold text-gray-900">
                  {title}
                </h3>
                <p className="mt-2 leading-relaxed text-gray-600">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
