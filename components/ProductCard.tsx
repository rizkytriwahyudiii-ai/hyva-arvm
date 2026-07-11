'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Check } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { Product } from '@/types';

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCartStore();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      className="group bg-white flex flex-col h-full rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
    >
      {/* Image Container */}
      <Link href={`/product/${product.id}`}>
        <div className="relative bg-[#F9F8F6] overflow-hidden" style={{ aspectRatio: '3/4' }}>
          <motion.img
            src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${product.image_filename}`}
            alt={product.name}
            className="w-full h-full object-contain p-6 transition-transform duration-500"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex flex-col flex-grow p-4 lg:p-5">
        <div className="flex-grow">
          {/* Brand */}
          <p className="text-[8px] uppercase tracking-[0.4em] text-gray-500 font-medium mb-2">
            HYVA ARVM
          </p>
          
          {/* Product Name */}
          <Link href={`/product/${product.id}`}>
            <h3 className="text-[12px] sm:text-[13px] font-bold text-gray-900 uppercase tracking-[0.02em] leading-snug line-clamp-2 hover:text-gray-600 transition-colors duration-200 mb-2">
              {product.name}
            </h3>
          </Link>
          
          {/* Fragrance Notes */}
          {product.top_note && (
            <p className="text-[9px] text-gray-500 leading-relaxed line-clamp-1 font-light">
              {[product.top_note, product.heart_note, product.base_note].filter(Boolean).join(' · ')}
            </p>
          )}
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <p className="text-[13px] font-bold text-gray-900">
            Rp {product.price?.toLocaleString('id-ID')}
          </p>
          <motion.button
            onClick={handleAddToCart}
            className={`flex items-center gap-1.5 px-3 py-2.5 text-[9px] font-bold uppercase tracking-[0.15em] rounded-md transition-all duration-300 ${
              added 
                ? 'bg-emerald-600 text-white shadow-md' 
                : 'bg-black hover:bg-gray-900 text-white hover:shadow-lg'
            }`}
            whileTap={{ scale: 0.92 }}
          >
            <motion.span
              key={added ? 'check' : 'cart'}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1.5"
            >
              {added ? <Check size={12} strokeWidth={2.5} /> : <ShoppingCart size={12} />}
              {added ? 'Ditambahkan' : 'Add'}
            </motion.span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;