'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

/**
 * Wrapper transisi antar halaman. Dipasang di layout.tsx, membungkus
 * {children}. Setiap kali pathname berubah (pindah halaman), konten
 * fade + slide halus, alih-alih langsung "lompat" tanpa transisi.
 *
 * AnimatePresence mode="wait" memastikan halaman lama selesai exit
 * animation dulu sebelum halaman baru mulai enter animation —
 * mencegah dua halaman tumpang tindih sekejap.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}