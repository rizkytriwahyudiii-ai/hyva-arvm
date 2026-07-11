// === TYPES ===
export interface Product {
  id?: number;
  name: string;
  category: string;
  price: number;
  image_filename: string;
  description: string;
  top_note?: string;
  heart_note?: string;
  base_note?: string;
  longevity?: number;
  keywords?: string;
  shopee_link?: string;
  brand?: string;
  karakter?: string;
}

export interface Order {
  id: string;
  user_id: string;
  items: { id: string; name: string; price: number; quantity: number; image_url: string }[];
  total: number;
  name: string;
  phone: string;
  address: string;
  courier: string;
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_status: 'unpaid' | 'paid';
  midtrans_order_id: string;
  created_at: string;
}

export interface CustomerProfile {
  id: string;
  full_name: string;
  phone: string;
  address: string;
  email?: string;
  created_at?: string;
}

export type AdminTab = 'orders' | 'catalog' | 'customers';

// === CONSTANTS ===
export const STORAGE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/produk-parfum/`;

export const EMPTY_PRODUCT: Product = {
  name: '',
  category: 'wanita',
  price: 0,
  image_filename: '',
  description: '',
  top_note: '',
  heart_note: '',
  base_note: '',
  longevity: 80,
  keywords: '',
  shopee_link: '',
};

export const ORDER_STATUS_CONFIG: Record<
  string,
  { label: string; color: string }
> = {
  pending: { label: 'Menunggu Pembayaran', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  paid: { label: 'Dibayar', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  processing: { label: 'Diproses', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  shipped: { label: 'Dikirim', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  delivered: { label: 'Selesai', color: 'bg-green-50 text-green-700 border-green-200' },
  cancelled: { label: 'Dibatalkan', color: 'bg-red-50 text-red-700 border-red-200' },
};

export const ORDER_STATUS_OPTIONS = Object.keys(ORDER_STATUS_CONFIG);

// Shared styling
export const inputCls = 'w-full p-3 border border-slate-200 rounded-lg text-sm outline-none focus:border-slate-900 transition-colors';
export const selectCls = `${inputCls} bg-white`;