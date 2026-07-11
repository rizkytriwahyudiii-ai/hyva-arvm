'use client';

import { CartItem as CartItemType } from '@/types';
import { X, Plus, Minus } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { motion } from 'framer-motion';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCartStore();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex gap-4 py-6 border-b border-gray-100 hover:bg-gray-50/50 px-4 rounded-lg transition-colors"
    >
      {/* Product Image */}
      <div className="relative flex-shrink-0">
        <img
          src={item.image_url}
          alt={item.name}
          className="w-24 h-24 object-cover rounded-lg bg-gray-100"
        />
        {item.quantity > 1 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
          >
            {item.quantity}
          </motion.span>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-[12px] font-bold text-gray-900 uppercase tracking-[0.05em] line-clamp-2 mb-2">
            {item.name}
          </h3>
          <p className="text-[10px] text-gray-500 tracking-[0.05em]">
            Rp {item.price.toLocaleString('id-ID')} × {item.quantity}
          </p>
        </div>

        {/* Subtotal */}
        <p className="text-[12px] font-bold text-gray-900 mt-2">
          Rp {(item.price * item.quantity).toLocaleString('id-ID')}
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-2 justify-between items-end">
        {/* Quantity Controls */}
        <div className="flex items-center gap-2 border border-gray-200 rounded-lg p-1">
          <motion.button
            onClick={() => updateQuantity(item.id, -1)}
            className="p-1 hover:bg-gray-100 rounded transition-colors disabled:opacity-50"
            disabled={item.quantity <= 1}
            whileTap={{ scale: 0.9 }}
          >
            <Minus size={14} strokeWidth={2} />
          </motion.button>
          <span className="text-[11px] font-bold w-5 text-center">
            {item.quantity}
          </span>
          <motion.button
            onClick={() => updateQuantity(item.id, 1)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            whileTap={{ scale: 0.9 }}
          >
            <Plus size={14} strokeWidth={2} />
          </motion.button>
        </div>

        {/* Remove Button */}
        <motion.button
          onClick={() => removeFromCart(item.id)}
          className="p-2 hover:bg-red-50 text-red-500 hover:text-red-700 rounded-lg transition-all duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Remove item"
        >
          <X size={16} strokeWidth={2} />
        </motion.button>
      </div>
    </motion.div>
  );
}
