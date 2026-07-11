import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/lib/supabaseClient';
import { Product, CartItem } from '@/types';

interface CartState {
  cart: CartItem[];
  isCartOpen: boolean;

  setCartOpen: (status: boolean) => void;

  loadCart: () => Promise<void>;

  addToCart: (product: Product) => Promise<void>;

  removeFromCart: (productId: number) => Promise<void>;

  updateQuantity: (
    productId: number,
    delta: number
  ) => Promise<void>;

  clearCart: () => Promise<void>;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      isCartOpen: false,

      setCartOpen: (status) =>
        set({ isCartOpen: status }),

      loadCart: async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) return;

        const { data } = await supabase
          .from('cart_items')
          .select('*')
          .eq('user_id', user.id);

        if (!data) return;

        const localCart = get().cart;

        const merged = data.map((row: any) => {
          const local = localCart.find(
            (i) => i.id === Number(row.product_id)
          );

          return {
            id: Number(row.product_id),
            name: row.name,
            price: row.price,
            image_url: row.image_url,
            quantity: local
              ? local.quantity
              : row.quantity,
          };
        });

        set({ cart: merged });
      },

      addToCart: async (product) => {
        const productId = Number(product.id);

        const existingItem = get().cart.find(
          (item) => item.id === productId
        );

        const newQuantity = existingItem
          ? existingItem.quantity + 1
          : 1;

        set((state) => {
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === productId
                  ? {
                      ...item,
                      quantity: newQuantity,
                    }
                  : item
              ),
            };
          }

          return {
            cart: [
              ...state.cart,
              {
                id: productId,
                name: product.name,
                price: product.price,
                image_url: product.image_filename,
                quantity: 1,
              },
            ],
          };
        });

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          await supabase
            .from('cart_items')
            .upsert(
              {
                user_id: user.id,
                product_id: productId,
                name: product.name,
                price: product.price,
                image_url: product.image_filename,
                quantity: newQuantity,
              },
              {
                onConflict:
                  'user_id,product_id',
              }
            );
        }
      },

      removeFromCart: async (
        productId: number
      ) => {
        set((state) => ({
          cart: state.cart.filter(
            (item) => item.id !== productId
          ),
        }));

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          await supabase
            .from('cart_items')
            .delete()
            .eq('user_id', user.id)
            .eq('product_id', productId);
        }
      },

      updateQuantity: async (
        productId: number,
        delta: number
      ) => {
        const currentItem = get().cart.find(
          (item) => item.id === productId
        );

        if (!currentItem) return;

        const newQuantity = Math.max(
          1,
          currentItem.quantity + delta
        );

        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productId
              ? {
                  ...item,
                  quantity: newQuantity,
                }
              : item
          ),
        }));

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          await supabase
            .from('cart_items')
            .update({
              quantity: newQuantity,
            })
            .eq('user_id', user.id)
            .eq('product_id', productId);
        }
      },

      clearCart: async () => {
  set({ cart: [] });

  if (typeof window !== 'undefined') {
    localStorage.removeItem('cart-storage');
  }
},
    }),
    {
      name: 'cart-storage',
    }
  )
);