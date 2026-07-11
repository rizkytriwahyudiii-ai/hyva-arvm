'use client';

import { motion } from 'framer-motion';

/**
 * Loading state premium untuk dipakai di seluruh app, mengganti
 * teks "Memuat..." biasa. Logo HYVA ARVM berdenyut halus sambil
 * garis bawah "menggambar" bolak-balik — terasa branded, bukan
 * generic spinner.
 *
 * Pakai di halaman manapun saat data masih di-fetch:
 *   if (loading) return <PageLoader />;
 */
export default function PageLoader({ label = 'Memuat' }: { label?: string }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <motion.p
        className="text-[11px] uppercase tracking-[0.4em] text-gray-400"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        HYVA ARVM
      </motion.p>

      <div className="relative w-16 h-px bg-gray-200 overflow-hidden">
        <motion.div
          className="absolute inset-y-0 w-1/2 bg-black"
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <p className="text-[10px] text-gray-400 tracking-wide">{label}...</p>
    </div>
  );
}