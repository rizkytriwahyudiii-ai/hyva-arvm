import { CartItem } from '@/types';

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePhoneIndonesia(phone: string): boolean {
  return /^(\+62|0)[0-9]{9,12}$/.test(phone);
}

export function validateOrderItems(items: CartItem[]): boolean {
  return (
    Array.isArray(items) &&
    items.length > 0 &&
    items.every((item) => item.id > 0 && item.quantity > 0)
  );
}

export function validateCheckoutForm(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  province: string;
  city: string;
  district: string;
  village: string;
}): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.firstName?.trim()) errors.firstName = 'Nama depan harus diisi';
  if (!data.lastName?.trim()) errors.lastName = 'Nama belakang harus diisi';
  if (!validateEmail(data.email)) errors.email = 'Email tidak valid';
  if (!validatePhoneIndonesia(data.phone)) errors.phone = 'Nomor telepon tidak valid';
  if (!data.address?.trim()) errors.address = 'Alamat harus diisi';
  if (!data.province) errors.province = 'Provinsi harus dipilih';
  if (!data.city) errors.city = 'Kota harus dipilih';
  if (!data.district) errors.district = 'Kecamatan harus dipilih';
  if (!data.village) errors.village = 'Desa harus dipilih';

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function sanitizeString(str: string): string {
  return str.trim().replace(/[<>]/g, '');
}

export function formatPhoneToWhatsApp(phone: string): string {
  let cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.slice(1);
  } else if (!cleaned.startsWith('62')) {
    cleaned = '62' + cleaned;
  }
  return cleaned;
}
