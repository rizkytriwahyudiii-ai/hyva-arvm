import { ZONE_PRICE, Courier } from './types';

/**
 * Tentukan zona pengiriman berdasarkan nama provinsi.
 * Zona 1 = Jawa/Bali (termurah), Zona 4 = Indonesia Timur (termahal)
 */
export function getZone(provinceName: string): number {
  const lower = provinceName.toLowerCase();

  const jawa = ['jawa', 'jakarta', 'banten', 'yogyakarta', 'bali'];
  const sumatera = ['sumatera', 'riau', 'jambi', 'lampung', 'bengkulu', 'bangka', 'kepulauan riau', 'aceh'];
  const kalimantan = ['kalimantan', 'nusa tenggara'];
  const timur = ['sulawesi', 'maluku', 'papua', 'gorontalo'];

  if (jawa.some((k) => lower.includes(k))) return 1;
  if (sumatera.some((k) => lower.includes(k))) return 2;
  if (kalimantan.some((k) => lower.includes(k))) return 3;
  if (timur.some((k) => lower.includes(k))) return 4;
  return 2;
}

/** Hitung ongkir berdasarkan zona provinsi dan kurir yang dipilih */
export function getOngkir(provinceName: string, courier: Courier | undefined): number {
  if (!courier) return 0;
  const zone = getZone(provinceName);
  return Math.round(ZONE_PRICE[zone] * courier.multiplier);
}

/** Normalisasi nama wilayah untuk pencocokan (hapus prefix administratif) */
export function normalizeWilayah(text = ''): string {
  return text
    .toLowerCase()
    .replace(/provinsi|kota|kabupaten|kecamatan|kelurahan|desa/g, '')
    .trim();
}

/** Gabungkan komponen alamat jadi satu string lengkap */
export function buildFullAddress(parts: {
  detailAddress: string;
  villageName: string;
  districtName: string;
  cityName: string;
  provinceName: string;
  postalCode: string;
}): string {
  return [
    parts.detailAddress,
    parts.villageName,
    parts.districtName,
    parts.cityName,
    parts.provinceName,
    parts.postalCode,
  ]
    .filter(Boolean)
    .join(', ');
}