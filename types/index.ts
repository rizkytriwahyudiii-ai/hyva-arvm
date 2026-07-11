export interface Product {
  id: number;
  name: string;
  price: number;
  image_filename: string;
  description?: string;
  category: string;
  created_at?: string;
  top_note?: string;
  heart_note?: string;
  base_note?: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
}

export interface Order {
  id: string;
  user_id: string;
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  items: CartItem[];
  created_at?: string;
}

export interface Region {
  id: number | string;
  name: string;
}

export interface Province extends Region {}
export interface City extends Region {
  province_id?: number;
}
export interface District extends Region {
  city_id?: number;
}
export interface Village extends Region {
  district_id?: number;
}

export interface CheckoutData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  village: string;
  address: string;
  notes?: string;
}

export interface PaymentData {
  orderId: string;
  gross_amount: number;
  items: Array<{
    id: string | number;
    price: number;
    quantity: number;
    name: string;
  }>;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface CreateOrderRequest {
  items: CartItem[];
  total: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  courier: string;
  notes?: string;
}

export interface PaymentValidateRequest {
  orderId: string;
  total: number;
  items: CartItem[];
}

export interface SyncCartRequest {
  items: CartItem[];
  action: 'load' | 'update' | 'clear';
}
