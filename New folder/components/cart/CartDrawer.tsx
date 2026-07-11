'use client';
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/store";
// import CartItem from "./CartItem";
// import CheckoutFooter from "./CheckoutFooter";

export default function CartDrawer() {
  const { isCartOpen, setCartOpen, cart } = useCartStore();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/50 z-[100]" 
          />
          
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            className="fixed top-0 right-0 h-full w-full md:w-[400px] bg-white z-[101] shadow-2xl p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Your Cart</h2>
              <button onClick={() => setCartOpen(false)} className="text-xl">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {cart.length > 0 ? (
                <p className="text-center text-gray-500 mt-10">Cart items will be displayed here</p>
              ) : (
                <p className="text-center text-gray-500 mt-10">Keranjang kosong</p>
              )}
            </div>

            {/* <CheckoutFooter total={48000} /> */}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}