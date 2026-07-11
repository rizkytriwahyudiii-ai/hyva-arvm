'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

/**
 * Wrapper reusable untuk animasi "muncul" saat elemen masuk viewport
 * saat di-scroll. Dipakai membungkus section apa saja di homepage:
 *
 *   <ScrollReveal>
 *     <FragranceNotes />
 *   </ScrollReveal>
 *
 * `once: true` supaya animasi hanya terjadi sekali (tidak berulang
 * setiap kali elemen keluar-masuk viewport saat scroll bolak-balik) —
 * ini terasa lebih premium dan tidak mengganggu.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}: ScrollRevealProps) {
  const offset = {
    up: { y: 32, x: 0 },
    down: { y: -32, x: 0 },
    left: { y: 0, x: 32 },
    right: { y: 0, x: -32 },
  }[direction];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}