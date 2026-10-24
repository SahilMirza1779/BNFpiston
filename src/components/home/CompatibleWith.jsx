import { bikeBrands } from "../../data/site";
import Reveal from "../Reveal";

export default function CompatibleWith() {
  return (
    // bg-charcoal ko bg-gray-100 kiya
    <section className="border-y border-gray-200 bg-gray-100 py-14">
      <Reveal className="container-x text-center">
        <h2 className="text-3xl font-semibold italic sm:text-4xl text-gray-900">
          Compatible with popular Indian motorcycles
        </h2>
        <ul className="mt-6 flex flex-wrap justify-center gap-3">
          {bikeBrands.map((b) => (
            // Badges ko white bg aur dark text diya
            <li
              key={b}
              className="rounded-md border border-gray-300 bg-white px-6 py-2 font-display text-2xl uppercase tracking-widest text-gray-700 shadow-sm"
            >
              {b}
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-5 max-w-2xl text-xs text-gray-500">
          Brand names are used only to describe fitment. BNF is an independent
          aftermarket parts supplier and is not affiliated with these
          manufacturers.
        </p>
      </Reveal>
    </section>
  );
}
