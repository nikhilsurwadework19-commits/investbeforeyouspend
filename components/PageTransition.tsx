"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait" onExitComplete={() => { if (typeof window !== "undefined") window.scrollTo(0, 0); }}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }}
        exit={{ opacity: 0, y: -16, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
