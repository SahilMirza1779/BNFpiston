import useCountUp from "../../hooks/useCountUp";
import { stats } from "../../data/site";

function Stat({ value, suffix, label }) {
  const [ref, n] = useCountUp(value);
  return (
    <div className="relative px-4 py-8 text-center">
      {/* Text color dark kiya */}
      <p className="font-display text-6xl font-bold italic text-gray-900 sm:text-7xl">
        <span ref={ref}>{n.toLocaleString("en-IN")}</span>
        <span className="text-brand">{suffix}</span>
      </p>
      <p className="mt-1 font-display text-xl uppercase tracking-[0.2em] text-gray-500">
        {label}
      </p>
    </div>
  );
}

export default function Stats() {
  return (
    // bg-charcoal ko bg-white aur border light gray kiya
    <section
      className="border-y border-gray-200 bg-white"
      aria-label="BNF in numbers"
    >
      <div className="container-x grid grid-cols-2 divide-gray-200 md:grid-cols-4 md:divide-x">
        {stats.map((s) => (
          <Stat key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}
