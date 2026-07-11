'use client';

import { motion } from 'framer-motion';

/**
 * Skeleton placeholder untuk ProductCard saat data produk masih
 * di-fetch dari Supabase. Dipakai di homepage/search supaya layout
 * tidak "kosong" lalu "lompat" begitu data datang — terasa lebih
 * smooth daripada teks "Memuat koleksi...".
 *
 * Pakai beberapa sekaligus dalam grid yang sama seperti ProductCard asli:
 *   {loading
 *     ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
 *     : products.map((p) => <ProductCard key={p.id} product={p} />)}
 */
export default function ProductCardSkeleton() {
  const shimmer = {
    initial: { backgroundPosition: '-200% 0' },
    animate: { backgroundPosition: '200% 0' },
  };

  const shimmerCls =
    'bg-gray-100 bg-[linear-gradient(90deg,#f3f4f6_25%,#e5e7eb_37%,#f3f4f6_63%)] bg-[length:200%_100%]';

  return (
    <div className="flex flex-col h-full border border-gray-100 overflow-hidden">
      <motion.div
        className={`${shimmerCls}`}
        style={{ aspectRatio: '3/4' }}
        variants={shimmer}
        initial="initial"
        animate="animate"
        transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
      />
      <div className="p-4 space-y-2">
        <motion.div
          className={`h-2 w-16 rounded ${shimmerCls}`}
          variants={shimmer}
          initial="initial"
          animate="animate"
          transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className={`h-3 w-full rounded ${shimmerCls}`}
          variants={shimmer}
          initial="initial"
          animate="animate"
          transition={{ duration: 1.4, repeat: Infinity, ease: 'linear', delay: 0.1 }}
        />
        <motion.div
          className={`h-3 w-2/3 rounded ${shimmerCls}`}
          variants={shimmer}
          initial="initial"
          animate="animate"
          transition={{ duration: 1.4, repeat: Infinity, ease: 'linear', delay: 0.15 }}
        />
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-2">
          <motion.div
            className={`h-3 w-14 rounded ${shimmerCls}`}
            variants={shimmer}
            initial="initial"
            animate="animate"
            transition={{ duration: 1.4, repeat: Infinity, ease: 'linear', delay: 0.2 }}
          />
          <motion.div
            className={`h-7 w-14 rounded ${shimmerCls}`}
            variants={shimmer}
            initial="initial"
            animate="animate"
            transition={{ duration: 1.4, repeat: Infinity, ease: 'linear', delay: 0.25 }}
          />
        </div>
      </div>
    </div>
  );
}