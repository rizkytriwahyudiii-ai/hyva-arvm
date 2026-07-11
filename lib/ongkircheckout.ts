// Ongkir simulasi per zona
const ZONE_PRICE: Record<number, number> = { 1: 12000, 2: 18000, 3: 25000, 4: 35000 };

const getZone = (provinceName: string): number => {
  const jawa = ['jawa', 'jakarta', 'banten', 'yogyakarta', 'bali'];
  const sumatera = ['sumatera', 'riau', 'jambi', 'lampung', 'bengkulu', 'bangka', 'kepulauan riau', 'aceh'];
  const kalimantan = ['kalimantan', 'nusa tenggara'];
  const timur = ['sulawesi', 'maluku', 'papua', 'gorontalo'];
  const lower = provinceName.toLowerCase();
  if (jawa.some(k => lower.includes(k))) return 1;
  if (sumatera.some(k => lower.includes(k))) return 2;
  if (kalimantan.some(k => lower.includes(k))) return 3;
  if (timur.some(k => lower.includes(k))) return 4;
  return 2;
};

const COURIERS = [
  { id: 'jne', name: 'JNE REG', estimate: '2-3 hari', multiplier: 1.0 },
  { id: 'jnt', name: 'J&T Express', estimate: '2-3 hari', multiplier: 0.9 },
  { id: 'sicepat', name: 'SiCepat REG', estimate: '1-2 hari', multiplier: 0.95 },
  { id: 'anteraja', name: 'Anteraja', estimate: '2-4 hari', multiplier: 0.85 },
];

const API = 'https://www.emsifa.com/api-wilayah-indonesia/api';