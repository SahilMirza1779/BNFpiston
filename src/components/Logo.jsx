import { useState } from "react";

// Logo image with a compact red "BNF" badge fallback if /bnf-logo.png is missing.
export default function Logo({ className = "h-11 w-11", ...rest }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        role="img"
        aria-label="BNF logo"
        className={`flex shrink-0 items-center justify-center bg-brand font-display text-xl font-bold italic leading-none text-white ${className}`}
      >
        BNF
      </span>
    );
  }

  return (
    <img
      src="/bnf-logo.png" // <-- YAHAN PATH CHANGE KIYA HAI
      alt="BNF Piston & Rings logo"
      onError={() => setFailed(true)}
      className={`shrink-0 object-contain ${className}`}
      {...rest}
    />
  );
}
