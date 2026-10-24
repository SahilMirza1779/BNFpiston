import { motion } from "framer-motion";
import Logo from "./Logo";

export default function Loader() {
  return (
    // bg-jet ko bg-white kiya
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      role="status"
      aria-label="Loading"
    >
      <div className="relative flex h-32 w-32 items-center justify-center">
        {/* Spinner borders ko light gray aur brand red kiya */}
        <span className="absolute inset-0 animate-spin rounded-full border-4 border-gray-200 border-t-brand" />
        <span
          className="absolute inset-3 animate-spin rounded-full border-2 border-gray-200 border-b-gray-400"
          style={{ animationDirection: "reverse", animationDuration: "1.4s" }}
        />
        {/* Logo me object-contain add kiya taaki squish na ho */}
        <Logo className="h-16 w-16 object-contain" />
      </div>
      <p className="mt-6 font-display text-2xl uppercase tracking-[0.35em] text-gray-900">
        BNF Piston &amp; Rings
      </p>
      <div
        className="checkered mt-4 h-3 w-40"
        aria-hidden="true"
        style={{ backgroundSize: "12px 12px" }}
      />
    </motion.div>
  );
}
