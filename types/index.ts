export interface CartItem {
  id: string;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
}

export interface Product {
  id: number;
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
}

export interface Order {
  id: string;
  user_id: string;
  items: CartItem[];
  total: number;
  name: string;
  phone: string;
  address: string;
  courier: string;
  status: string;
  payment_status: string;
  midtrans_order_id: string;
  created_at: string;
}
