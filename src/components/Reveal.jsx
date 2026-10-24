import { motion, useReducedMotion } from "framer-motion";

// Scroll-reveal wrapper. Respects prefers-reduced-motion.
export default function Reveal({
  children,
  delay = 0,
  y = 32,
  x = 0,
  className = "",
  as = "div",
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
