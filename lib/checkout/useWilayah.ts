import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { API_WILAYAH, Wilayah } from './types';

/**
 * Hook untuk mengelola data wilayah Indonesia secara cascade:
 * Provinsi -> Kota -> Kecamatan -> Desa
 *
 * Dipakai di StepInfo.tsx dan dipanggil dari useMapConfirm.ts
 * saat alamat diisi otomatis dari peta.
 */
export function useWilayah() {
  const [provinces, setProvinces] = useState<Wilayah[]>([]);
  const [cities, setCities] = useState<Wilayah[]>([]);
  const [districts, setDistricts] = useState<Wilayah[]>([]);
  const [villages, setVillages] = useState<Wilayah[]>([]);

  const [provinceId, setProvinceId] = useState('');
  const [provinceName, setProvinceName] = useState('');
  const [cityId, setCityId] = useState('');
  const [cityName, setCityName] = useState('');
  const [districtId, setDistrictId] = useState('');
  const [districtName, setDistrictName] = useState('');
  const [villageId, setVillageId] = useState('');
  const [villageName, setVillageName] = useState('');

  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingVillages, setLoadingVillages] = useState(false);

  const loadProvinces = async () => {
    try {
      const res = await fetch(`${API_WILAYAH}/provinces.json`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setProvinces(data);
    } catch (error) {
      console.error('[loadProvinces error]:', error);
      toast.error('Gagal memuat daftar provinsi');
      setProvinces([]);
    }
  };

  const fetchCities = async (id: string): Promise<Wilayah[]> => {
    setLoadingCities(true);
    try {
      const res = await fetch(`${API_WILAYAH}/regencies/${id}.json`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const list = await res.json();
      setCities(list);
      return list;
    } catch (error) {
      console.error('[fetchCities error]:', error);
      toast.error('Gagal memuat daftar kota');
      setCities([]);
      return [];
    } finally {
      setLoadingCities(false);
    }
  };

  const fetchDistricts = async (id: string): Promise<Wilayah[]> => {
    setLoadingDistricts(true);
    try {
      const res = await fetch(`${API_WILAYAH}/districts/${id}.json`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const list = await res.json();
      setDistricts(list);
      return list;
    } catch (error) {
      console.error('[fetchDistricts error]:', error);
      toast.error('Gagal memuat daftar kecamatan');
      setDistricts([]);
      return [];
    } finally {
      setLoadingDistricts(false);
    }
  };

  const fetchVillages = async (id: string): Promise<Wilayah[]> => {
    setLoadingVillages(true);
    try {
      const res = await fetch(`${API_WILAYAH}/villages/${id}.json`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const list = await res.json();
      setVillages(list);
      return list;
    } catch (error) {
      console.error('[fetchVillages error]:', error);
      toast.error('Gagal memuat daftar desa');
      setVillages([]);
      return [];
    } finally {
      setLoadingVillages(false);
    }
  };

  /** Dipanggil saat user pilih provinsi dari dropdown manual */
  const onProvinceChange = async (id: string, name: string) => {
    setProvinceId(id);
    setProvinceName(name);
    resetCity();
    if (id) await fetchCities(id);
  };

  /** Dipanggil saat user pilih kota dari dropdown manual */
  const onCityChange = async (id: string, name: string) => {
    setCityId(id);
    setCityName(name);
    resetDistrict();
    if (id) await fetchDistricts(id);
  };

  /** Dipanggil saat user pilih kecamatan dari dropdown manual */
  const onDistrictChange = async (id: string, name: string) => {
    setDistrictId(id);
    setDistrictName(name);
    resetVillage();
    if (id) await fetchVillages(id);
  };

  const onVillageChange = (id: string, name: string) => {
    setVillageId(id);
    setVillageName(name);
  };

  const resetCity = () => {
    setCityId(''); setCityName('');
    resetDistrict();
    setCities([]);
  };

  const resetDistrict = () => {
    setDistrictId(''); setDistrictName('');
    resetVillage();
    setDistricts([]);
  };

  const resetVillage = () => {
    setVillageId(''); setVillageName('');
    setVillages([]);
  };

  /** Setter langsung dipakai oleh useMapConfirm saat auto-fill dari peta */
  const setProvinceDirectly = (id: string, name: string) => {
    setProvinceId(id);
    setProvinceName(name);
  };
  const setCityDirectly = (id: string, name: string) => {
    setCityId(id);
    setCityName(name);
  };
  const setDistrictDirectly = (id: string, name: string) => {
    setDistrictId(id);
    setDistrictName(name);
  };
  const setVillageDirectly = (id: string, name: string) => {
    setVillageId(id);
    setVillageName(name);
  };

  return {
    // data lists
    provinces, cities, districts, villages,
    // selected values
    provinceId, provinceName, cityId, cityName,
    districtId, districtName, villageId, villageName,
    // loading flags
    loadingCities, loadingDistricts, loadingVillages,
    // actions (manual dropdown)
    loadProvinces, onProvinceChange, onCityChange, onDistrictChange, onVillageChange,
    // actions (programmatic, dipakai saat auto-fill dari peta)
    fetchCities, fetchDistricts, fetchVillages,
    setProvinceDirectly, setCityDirectly, setDistrictDirectly, setVillageDirectly,
    setCities, setDistricts, setVillages,
    setLoadingCities, setLoadingDistricts, setLoadingVillages,
  };
}

export type UseWilayahReturn = ReturnType<typeof useWilayah>;