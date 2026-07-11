'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import ProductCard from './ProductCard';
import { Product } from '@/types';

export default function ProductSection({
  title, products, categoryFilter,
}: { title: string; products: Product[]; categoryFilter?: string }) {
  const router = useRouter();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };

  return (
    <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-10"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex-1">
          <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-[0.04em] text-gray-900 font-display">
            {title}
          </h2>
          <div className="w-12 h-1 bg-black mt-3" />
        </div>
        
        <motion.button
          onClick={() => router.push(`/search?category=${categoryFilter || ''}`)}
          className="text-[11px] sm:text-[12px] uppercase tracking-[0.15em] text-gray-600 hover:text-black font-medium transition-colors duration-200 whitespace-nowrap"
          whileHover={{ x: 4 }}
        >
          Lihat Semua →
        </motion.button>
      </motion.div>

      {/* Products Grid */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
      >
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="w-full">
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <p className="text-gray-500 text-[12px] uppercase tracking-[0.2em]">
              Produk tidak ditemukan
            </p>
          </div>
        )}
      </motion.div>
    </section>
  );
}