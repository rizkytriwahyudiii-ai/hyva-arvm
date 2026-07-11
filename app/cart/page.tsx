'use client';

import { useCartStore } from '@/lib/store';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';

export default function CartPage() {
  const { cart: rawCart, removeFromCart, updateQuantity, loadCart } = useCartStore();

  // Dedup berdasarkan id
  const seen = new Map();
  rawCart.forEach((item) => seen.set(item.id, item));
  const cart = Array.from(seen.values());

  useEffect(() => {
    loadCart();
  }, []);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // --- EMPTY STATE ---
  if (cart.length === 0) {
    return (
      <motion.div
        className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <ShoppingBag size={48} className="text-gray-200 mb-6" strokeWidth={1} />
        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-3">Keranjang Belanja</p>
        <h1 className="text-2xl font-serif text-gray-900 mb-4">Keranjang kamu kosong</h1>
        <p className="text-sm text-gray-500 mb-8 max-w-xs">
          Temukan parfum yang sempurna untuk menemani harimu.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-black text-white px-8 py-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors"
        >
          Lihat Koleksi
          <ArrowRight size={14} />
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-16">

      {/* Header */}
      <div className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-2">Keranjang Belanja</p>
        <h1 className="text-2xl md:text-3xl font-serif text-gray-900">
          <motion.span
            key={totalItems}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="inline-block"
          >
            {totalItems}
          </motion.span>
          {' '}{totalItems === 1 ? 'item' : 'item'} dipilih
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">

        {/* === KIRI: Daftar Item === */}
        <div className="lg:col-span-2 space-y-0 order-1 lg:order-none">

          {/* Column headers — desktop only */}
          <div className="hidden md:grid grid-cols-[1fr_auto_auto] gap-4 pb-3 border-b border-gray-100">
            <p className="text-[9px] uppercase tracking-[0.25em] text-gray-400">Produk</p>
            <p className="text-[9px] uppercase tracking-[0.25em] text-gray-400 text-center w-28">Jumlah</p>
            <p className="text-[9px] uppercase tracking-[0.25em] text-gray-400 text-right w-24">Subtotal</p>
          </div>

          {/* Cart Items — AnimatePresence supaya item yang dihapus
              "menyusut" dulu sebelum benar-benar hilang dari layout,
              bukan langsung lompat */}
          <AnimatePresence initial={false}>
            {cart.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto_auto] gap-4 items-center py-6 border-b border-gray-100">
                  {/* Gambar */}
                  <Link href={`/product/${item.id}`}>
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-50 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <img
                        src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item.image_url}`}
                        alt={item.name}
                        className="w-full h-full object-contain p-2"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder-perfume.png';
                        }}
                      />
                    </div>
                  </Link>

                  {/* Info produk */}
                  <div className="min-w-0">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 mb-1">HYVA ARVM</p>
                    <Link href={`/product/${item.id}`}>
                      <h3 className="text-[12px] md:text-[13px] font-bold uppercase tracking-wide text-gray-900 hover:text-gray-600 transition-colors leading-snug">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-[12px] text-gray-500 mt-1">
                      Rp {item.price.toLocaleString('id-ID')}
                    </p>

                    {/* Mobile: quantity + hapus */}
                    <div className="flex items-center gap-3 mt-3 md:hidden">
                      <div className="flex items-center border border-gray-200">
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-2 hover:bg-gray-50 transition-colors"
                        >
                          <Minus size={12} />
                        </motion.button>
                        <motion.span
                          key={item.quantity}
                          initial={{ scale: 1.3, opacity: 0.5 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.2 }}
                          className="px-4 text-[13px] font-medium min-w-[2rem] text-center inline-block"
                        >
                          {item.quantity}
                        </motion.span>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-2 hover:bg-gray-50 transition-colors"
                        >
                          <Plus size={12} />
                        </motion.button>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={14} />
                      </motion.button>
                    </div>
                  </div>

                  {/* Desktop: Quantity */}
                  <div className="hidden md:flex items-center border border-gray-200 w-28">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-2 hover:bg-gray-50 transition-colors flex-1 flex justify-center"
                    >
                      <Minus size={12} />
                    </motion.button>
                    <motion.span
                      key={item.quantity}
                      initial={{ scale: 1.3, opacity: 0.5 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="text-[13px] font-medium px-2 min-w-[2rem] text-center inline-block"
                    >
                      {item.quantity}
                    </motion.span>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-2 hover:bg-gray-50 transition-colors flex-1 flex justify-center"
                    >
                      <Plus size={12} />
                    </motion.button>
                  </div>

                  {/* Desktop: Subtotal + hapus */}
                  <div className="hidden md:flex flex-col items-end gap-2 w-24">
                    <p className="text-[13px] font-semibold text-gray-900">
                      Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                    </p>
                    <motion.button
                      whileTap={{ scale: 0.85 }}
                      whileHover={{ scale: 1.1 }}
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Kembali belanja */}
          <div className="pt-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-gray-500 hover:text-black transition-colors"
            >
              <ArrowLeft size={13} />
              Lanjut belanja
            </Link>
          </div>
        </div>

        {/* === KANAN: Order Summary === */}
        <div className="lg:col-span-1 order-2 lg:order-none">
          <div className="bg-gray-50 p-6 sticky top-28">
            <h2 className="text-[11px] uppercase tracking-[0.3em] text-gray-500 mb-6">
              Ringkasan Pesanan
            </h2>

            {/* Line items */}
            <div className="space-y-3 mb-6">
              <AnimatePresence initial={false}>
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-between items-start gap-2"
                  >
                    <p className="text-[12px] text-gray-600 leading-snug flex-1 line-clamp-2">
                      {item.name}
                      <span className="text-gray-400"> ×{item.quantity}</span>
                    </p>
                    <p className="text-[12px] text-gray-900 font-medium flex-shrink-0">
                      Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500">Subtotal</p>
                <motion.p
                  key={total}
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity: 1 }}
                  className="text-[13px] font-semibold text-gray-900"
                >
                  Rp {total.toLocaleString('id-ID')}
                </motion.p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500">Ongkir</p>
                <p className="text-[12px] text-gray-500">Dihitung saat checkout</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-8">
              <div className="flex justify-between items-center">
                <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-gray-900">Total</p>
                <motion.p
                  key={total}
                  initial={{ opacity: 0.4, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-lg font-bold text-gray-900"
                >
                  Rp {total.toLocaleString('id-ID')}
                </motion.p>
              </div>
            </div>

            {/* Tombol Checkout */}
            <motion.div whileTap={{ scale: 0.98 }}>
              <Link
                href="/checkout"
                className="w-full bg-black hover:bg-gray-800 text-white py-4 text-[11px] font-bold uppercase tracking-[0.25em] transition-colors flex items-center justify-center gap-2"
              >
                Lanjut ke Checkout
                <ArrowRight size={14} />
              </Link>
            </motion.div>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-gray-200" />
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">atau</p>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Beli via Shopee */}
            <a
              href="https://shopee.co.id/hyva.arvm"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full border border-gray-200 hover:border-gray-400 text-gray-700 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2"
            >
              Beli di Shopee
            </a>

            {/* Trust badges */}
            <div className="mt-6 pt-6 border-t border-gray-100 space-y-2">
              <p className="text-[10px] text-gray-400 tracking-wide flex items-center gap-2">
                <span>✓</span> Extrait de Parfum — tahan hingga 12 jam
              </p>
              <p className="text-[10px] text-gray-400 tracking-wide flex items-center gap-2">
                <span>✓</span> Pengiriman ke seluruh Indonesia
              </p>
              <p className="text-[10px] text-gray-400 tracking-wide flex items-center gap-2">
                <span>✓</span> Packaging aman & rapi
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}