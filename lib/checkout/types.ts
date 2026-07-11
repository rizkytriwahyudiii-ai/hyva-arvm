// === TYPES ===
export interface Wilayah {
  id: string;
  name: string;
}

export interface Courier {
  id: string;
  name: string;
  estimate: string;
  multiplier: number;
}

export interface MapConfirmData {
  lat: number;
  lng: number;
  province: string;
  city: string;
  district: string;
  village: string;
  postalCode: string;
  fullAddress: string;
}

// === CONSTANTS ===
export const API_WILAYAH = 'https://www.emsifa.com/api-wilayah-indonesia/api';

export const ZONE_PRICE: Record<number, number> = {
  1: 12000,
  2: 18000,
  3: 25000,
  4: 35000,
};

export const COURIERS: Courier[] = [
  { id: 'jne', name: 'JNE REG', estimate: '2-3 hari', multiplier: 1.0 },
  { id: 'jnt', name: 'J&T Express', estimate: '2-3 hari', multiplier: 0.9 },
  { id: 'sicepat', name: 'SiCepat REG', estimate: '1-2 hari', multiplier: 0.95 },
  { id: 'anteraja', name: 'Anteraja', estimate: '2-4 hari', multiplier: 0.85 },
];

// Shared input/select styling — dipakai di semua step form
export const inputCls =
  'w-full px-4 py-3 border border-gray-200 text-[13px] outline-none focus:border-black transition-colors bg-white';
export const selectCls = `${inputCls} disabled:bg-gray-50 disabled:text-gray-400`;