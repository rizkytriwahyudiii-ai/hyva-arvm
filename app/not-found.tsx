'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-[9px] uppercase tracking-[0.45em] text-gray-300 mb-4">404</p>
        <h1 className="text-4xl md:text-6xl font-serif text-gray-900 mb-4 leading-tight">
          Halaman<br />
          <span className="italic font-light text-gray-400">Tidak Ditemukan</span>
        </h1>
        <p className="text-[13px] text-gray-400 mb-10 max-w-xs mx-auto leading-relaxed">
          Halaman yang kamu cari tidak ada atau sudah dipindahkan.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 text-[10px] uppercase tracking-[0.25em] hover:bg-gray-800 transition-colors"
        >
          Kembali ke Beranda <ArrowRight size={13} />
        </Link>
      </motion.div>
    </div>
  );
}
