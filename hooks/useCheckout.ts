'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { useCartStore } from '@/lib/store';
import { toast } from 'react-hot-toast';

const API = 'https://www.emsifa.com/api-wilayah-indonesia/api';
export const ZONE_PRICE: Record<number, number> = { 1: 12000, 2: 18000, 3: 25000, 4: 35000 };
export const COURIERS = [
  { id: 'jne', name: 'JNE REG', estimate: '2-3 hari', multiplier: 1.0 },
  { id: 'jnt', name: 'J&T Express', estimate: '2-3 hari', multiplier: 0.9 },
  { id: 'sicepat', name: 'SiCepat REG', estimate: '1-2 hari', multiplier: 0.95 },
  { id: 'anteraja', name: 'Anteraja', estimate: '2-4 hari', multiplier: 0.85 },
];

export const getZone = (provinceName: string): number => {
  const lower = provinceName.toLowerCase();
  if (['jawa', 'jakarta', 'banten', 'yogyakarta', 'bali'].some(k => lower.includes(k))) return 1;
  if (['sumatera', 'riau', 'jambi', 'lampung', 'bengkulu', 'bangka', 'kepulauan riau', 'aceh'].some(k => lower.includes(k))) return 2;
  if (['kalimantan', 'nusa tenggara'].some(k => lower.includes(k))) return 3;
  if (['sulawesi', 'maluku', 'papua', 'gorontalo'].some(k => lower.includes(k))) return 4;
  return 2;
};

export const useCheckout = () => {
  const router = useRouter();
  const { cart, clearCart } = useCartStore();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [provinces, setProvinces] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [villages, setVillages] = useState<any[]>([]);
  const [provinceId, setProvinceId] = useState('');
  const [provinceName, setProvinceName] = useState('');
  const [cityId, setCityId] = useState('');
  const [cityName, setCityName] = useState('');
  const [districtId, setDistrictId] = useState('');
  const [districtName, setDistrictName] = useState('');
  const [villageId, setVillageId] = useState('');
  const [villageName, setVillageName] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [courier, setCourier] = useState('');
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingVillages, setLoadingVillages] = useState(false);

  const zone = useMemo(() => getZone(provinceName), [provinceName]);
  const selectedCourier = COURIERS.find(c => c.id === courier);
  const ongkir = selectedCourier ? Math.round(ZONE_PRICE[zone] * selectedCourier.multiplier) : 0;
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal + ongkir;
  const fullAddressPreview = [detailAddress, villageName, districtName, cityName, provinceName, postalCode].filter(Boolean).join(', ');

  const normalize = (text = '') => text.toLowerCase().replace(/provinsi|kota|kabupaten|kecamatan|kelurahan|desa/g, '').trim();

  useEffect(() => {
    const init = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { router.push('/login'); return; }
        const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        if (data) { setName(data.full_name || ''); setPhone(data.phone || ''); }

        const res = await fetch(`${API}/provinces.json`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const provinces = await res.json();
        setProvinces(provinces);
        setProfileLoaded(true);
      } catch (error) {
        console.error('[checkout init error]:', error);
        toast.error('Gagal memuat data. Silakan refresh halaman.');
        setProfileLoaded(true);
      }
    };
    init();
  }, []);

  const onProvinceChange = async (id: string, name: string) => {
    setProvinceId(id); setProvinceName(name); setCityId(''); setDistrictId(''); setVillageId('');
    setCities([]); setDistricts([]); setVillages([]);
    if (!id) return;
    setLoadingCities(true);
    try {
      const res = await fetch(`${API}/regencies/${id}.json`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const cities = await res.json();
      setCities(cities);
    } catch (error) {
      console.error('[onProvinceChange error]:', error);
      toast.error('Gagal memuat daftar kota');
      setCities([]);
    } finally {
      setLoadingCities(false);
    }
  };

const onCityChange = async (id: string, name: string) => {
    setCityId(id); setCityName(name);
    setDistrictId(''); setDistrictName(''); setVillageId(''); setVillageName('');
    setDistricts([]); setVillages([]);
    if (!id) return;
    setLoadingDistricts(true);
    try {
      const res = await fetch(`${API}/districts/${id}.json`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const districts = await res.json();
      setDistricts(districts);
    } catch (error) {
      console.error('[onCityChange error]:', error);
      toast.error('Gagal memuat daftar kecamatan');
      setDistricts([]);
    } finally {
      setLoadingDistricts(false);
    }
  };

  const onDistrictChange = async (id: string, name: string) => {
    setDistrictId(id); setDistrictName(name);
    setVillageId(''); setVillageName(''); setVillages([]);
    if (!id) return;
    setLoadingVillages(true);
    try {
      const res = await fetch(`${API}/villages/${id}.json`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const villages = await res.json();
      setVillages(villages);
    } catch (error) {
      console.error('[onDistrictChange error]:', error);
      toast.error('Gagal memuat daftar desa');
      setVillages([]);
    } finally {
      setLoadingVillages(false);
    }
  };

const handleMapConfirm = async (data: any) => {
  setShowMap(false);

  if (data.postalCode) {
    setPostalCode(data.postalCode);
  }

  // =========================
  // MATCH PROVINSI
  // =========================
  const matchedProvince = provinces.find(
    (p) =>
      normalize(p.name) === normalize(data.province) ||
      normalize(p.name).includes(normalize(data.province)) ||
      normalize(data.province).includes(normalize(p.name))
  );

  if (!matchedProvince) {
    toast.error('Provinsi tidak ditemukan, pilih manual');
    return;
  }

  setProvinceId(matchedProvince.id);
  setProvinceName(matchedProvince.name);

  setLoadingCities(true);

  const resCities = await fetch(
    `${API}/regencies/${matchedProvince.id}.json`
  );

  const citiesList = await resCities.json();

  setCities(citiesList);
  setLoadingCities(false);

  // =========================
  // MATCH KOTA
  // =========================
  let matchedCity: any = null;

  if (data.city) {
    matchedCity =
      citiesList.find(
        (c: any) =>
          normalize(c.name) === normalize(data.city)
      ) ||
      citiesList.find(
        (c: any) =>
          normalize(c.name).includes(normalize(data.city)) ||
          normalize(data.city).includes(normalize(c.name))
      );

    if (matchedCity) {
      setCityId(matchedCity.id);
      setCityName(matchedCity.name);
    }
  }

  // =========================
  // KASUS KHUSUS:
  // Nominatim tidak mengembalikan kecamatan
  // tapi mengembalikan desa
  // =========================
  if (!data.district && data.village) {
    toast('Mencari kecamatan berdasarkan desa...', {
      icon: '🔍',
    });

    const normalVillage = normalize(data.village);

    const citySources = matchedCity
      ? [matchedCity]
      : citiesList;

    for (const city of citySources) {
      const resDistricts = await fetch(
        `${API}/districts/${city.id}.json`
      );

      const districtsList = await resDistricts.json();

      for (const district of districtsList) {
        const resVillages = await fetch(
          `${API}/villages/${district.id}.json`
        );

        const villagesList = await resVillages.json();

        const foundVillage = villagesList.find(
          (v: any) =>
            normalize(v.name) === normalVillage ||
            normalize(v.name).includes(normalVillage) ||
            normalVillage.includes(normalize(v.name))
        );

        if (!foundVillage) continue;

        // SET KOTA
        setCityId(city.id);
        setCityName(city.name);

        // SET KECAMATAN
        setDistricts(districtsList);
        setDistrictId(district.id);
        setDistrictName(district.name);

        // SET DESA
        setVillages(villagesList);
        setVillageId(foundVillage.id);
        setVillageName(foundVillage.name);

        toast.success(
          'Alamat berhasil terisi dari peta!'
        );

        return;
      }
    }

    toast(
      'Provinsi & Kota berhasil diisi. Pilih Kecamatan manual.',
      {
        icon: '📍',
      }
    );

    return;
  }

  // =========================
  // JIKA KECAMATAN ADA
  // =========================
  if (!data.district) {
    toast(
      'Provinsi & Kota berhasil diisi. Pilih Kecamatan manual.',
      {
        icon: '📍',
      }
    );

    return;
  }

  toast('Mendeteksi kecamatan...', {
    icon: '🔍',
  });

  const normalDistrict = normalize(data.district);

  const citySources = matchedCity
    ? [matchedCity]
    : citiesList;

  for (const city of citySources) {
    const resDistricts = await fetch(
      `${API}/districts/${city.id}.json`
    );

    const districtsList = await resDistricts.json();

    const foundDistrict = districtsList.find(
      (d: any) =>
        normalize(d.name) === normalDistrict ||
        normalize(d.name).includes(normalDistrict) ||
        normalDistrict.includes(normalize(d.name))
    );

    if (!foundDistrict) continue;

    // =========================
    // SET KOTA
    // =========================
    setCityId(city.id);
    setCityName(city.name);

    // =========================
    // SET KECAMATAN
    // =========================
    setDistricts(districtsList);

    setDistrictId(foundDistrict.id);
    setDistrictName(foundDistrict.name);

    // =========================
    // LOAD DESA
    // =========================
    setLoadingVillages(true);

    const resVillages = await fetch(
      `${API}/villages/${foundDistrict.id}.json`
    );

    const villagesList = await resVillages.json();

    setVillages(villagesList);

    setLoadingVillages(false);

    // =========================
    // MATCH DESA
    // =========================
    if (data.village) {
      const normalVillage = normalize(data.village);

      const foundVillage = villagesList.find(
        (v: any) =>
          normalize(v.name) === normalVillage ||
          normalize(v.name).includes(normalize(v.name)) ||
          normalVillage.includes(normalize(v.name))
      );

      if (foundVillage) {
        setVillageId(foundVillage.id);
        setVillageName(foundVillage.name);
      }
    }

    toast.success(
      'Alamat berhasil terisi dari peta!'
    );

    return;
  }

  toast(
    'Provinsi & Kota berhasil diisi. Pilih Kecamatan manual.',
    {
      icon: '📍',
    }
  );
};
  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Tidak terautentikasi');
      const orderId = `HYVA-${Date.now()}`;
      const fullAddress = [detailAddress, villageName, districtName, cityName, provinceName, postalCode]
        .filter(Boolean).join(', ');

      const { data: order, error } = await supabase.from('orders').insert({
        user_id: user.id,
        items: cart,
        total,
        name,
        phone,
        address: fullAddress,
        courier: `${selectedCourier?.name} (${selectedCourier?.estimate})`,
        status: 'pending',
        payment_status: 'unpaid',
        midtrans_order_id: orderId,
      }).select().single();

      if (error) throw error;

      // TODO: Uncomment setelah Midtrans siap
      // const response = await fetch('/api/payment/create', { method: 'POST', body: JSON.stringify({ orderId, total, name, phone, items: cart }) });
      // const { token } = await response.json();
      // window.snap.pay(token, { onSuccess: () => { clearCart(); router.push(`/order/success?id=${order.id}`); } });

      clearCart();
      router.push(`/order/success?id=${order.id}`);
    } catch (err: any) {
      toast.error(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return {
    step, setStep, loading, profileLoaded, showMap, setShowMap, provinces, cities, districts, villages,
    provinceId, setProvinceId, provinceName, setProvinceName, cityId, setCityId, cityName, setCityName,
    districtId, setDistrictId, districtName, setDistrictName, villageId, setVillageId, villageName, setVillageName,
    postalCode, setPostalCode, detailAddress, setDetailAddress, name, setName, phone, setPhone, courier, setCourier,
    loadingCities, loadingDistricts, loadingVillages, zone, selectedCourier, ongkir, subtotal, total, fullAddressPreview,
    onProvinceChange, onCityChange, onDistrictChange, handleMapConfirm, handlePlaceOrder
  };
};