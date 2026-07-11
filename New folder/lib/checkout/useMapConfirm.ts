import { toast } from 'react-hot-toast';
import { MapConfirmData, Wilayah, API_WILAYAH } from './types';
import { normalizeWilayah } from './calculations';
import { UseWilayahReturn } from './useWilayah';

async function findProvinceByCity(
  provinces: Wilayah[], 
  cityName: string
): Promise<{ province: Wilayah; city: Wilayah } | null> {
  for (const prov of provinces) {
    const citiesList: Wilayah[] = await (await fetch(`${API_WILAYAH}/regencies/${prov.id}.json`)).json();
    const foundCity = matchCity(citiesList, cityName);
    if (foundCity) {
      return { province: prov, city: foundCity };
    }
  }
  return null;
}

export function useMapConfirm(
  wilayah: UseWilayahReturn,
  setPostalCode: (v: string) => void
) {
  const handleMapConfirm = async (data: MapConfirmData) => {
    if (data.postalCode) setPostalCode(data.postalCode);

    let matchedProvince = data.province ? matchProvince(wilayah.provinces, data.province) : null;
    let matchedCity: Wilayah | null = null;

    if (!matchedProvince && data.city) {
      const result = await findProvinceByCity(wilayah.provinces, data.city);
      if (result) {
        matchedProvince = result.province;
        matchedCity = result.city;
      }
    }

    if (!matchedProvince) {
      toast.error('Wilayah tidak ditemukan');
      return;
    }

    wilayah.setProvinceDirectly(matchedProvince.id, matchedProvince.name);
    const citiesList = await wilayah.fetchCities(matchedProvince.id);

    if (!matchedCity && data.city) {
      matchedCity = matchCity(citiesList, data.city) || null;
    }
    
    if (matchedCity) {
      wilayah.setCityDirectly(matchedCity.id, matchedCity.name);
    }

    // === 3. Cari Kecamatan (+ Desa) ===

    // Kasus A: Cari lewat desa (jika kecamatan tidak diketahui)
    if (!data.district && data.village) {
      const result = await findDistrictByVillage(matchedCity ? [matchedCity] : citiesList, data.village);
      if (result) {
        await applyDistrictResult(wilayah, result);
        toast.success('Lokasi berhasil terisi dari peta!');
        return;
      }
    }

    // Kasus C: Cari lewat kecamatan
    if (data.district) {
      const result = await findDistrictByName(matchedCity ? [matchedCity] : citiesList, data.district);
      if (result) {
        // 1. Set Kota, List Kecamatan, dan Kecamatan Terpilih
        await applyDistrictResult(wilayah, result);
        
        // 2. TAMBAHAN: Jika ada data.village, cari dan set setelah kecamatan terisi
        if (data.village) {
          // fetchVillages sudah dipanggil di dalam applyDistrictResult, 
          // tapi kita perlu memicu pencarian desa lagi jika data.village tersedia
          const villagesList = await wilayah.fetchVillages(result.district.id);
          const foundVillage = matchByName(villagesList, data.village);
          if (foundVillage) {
            wilayah.setVillageDirectly(foundVillage.id, foundVillage.name);
          }
        }
        
        toast.success('Lokasi berhasil terisi dari peta!');
        return;
      }
    }

    toast('Pilih kecamatan/desa manual', { icon: '📍' });
  };

  return { handleMapConfirm };
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

async function applyDistrictResult(wilayah: UseWilayahReturn, result: DistrictMatchResult) {
  wilayah.setCityDirectly(result.city.id, result.city.name);
  wilayah.setDistricts(result.districtsList);
  wilayah.setDistrictDirectly(result.district.id, result.district.name);
  
  // Berikan jeda untuk sinkronisasi state
  await new Promise(resolve => setTimeout(resolve, 100));

  const villagesList = await wilayah.fetchVillages(result.district.id);

  if (result.village) {
    const found = matchByName(villagesList, result.village.name);
    if (found) {
      wilayah.setVillageDirectly(found.id, found.name);
    }
  }
}

function matchByName(list: Wilayah[], target: string): Wilayah | undefined {
  const normalTarget = normalizeWilayah(target);
  return (
    list.find((item) => normalizeWilayah(item.name) === normalTarget) ||
    list.find((item) => normalizeWilayah(item.name).includes(normalTarget)) ||
    list.find((item) => normalTarget.includes(normalizeWilayah(item.name)))
  );
}

function matchProvince(provinces: Wilayah[], provinceName: string): Wilayah | undefined {
  return matchByName(provinces, provinceName);
}

function matchCity(citiesList: Wilayah[], cityNameFromMap: string): Wilayah | undefined {
  const isKota = cityNameFromMap.toLowerCase().includes('kota');
  const prefixWanted = isKota ? 'kota' : 'kabupaten';
  const prioritized = citiesList.filter((c) => c.name.toLowerCase().startsWith(prefixWanted));
  const matchInPriority = matchByName(prioritized, cityNameFromMap);
  return matchInPriority || matchByName(citiesList, cityNameFromMap);
}

interface DistrictMatchResult {
  city: Wilayah;
  district: Wilayah;
  districtsList: Wilayah[];
  village?: Wilayah;
}

async function findDistrictByName(citySources: Wilayah[], districtName: string): Promise<DistrictMatchResult | null> {
  for (const city of citySources) {
    const districtsList: Wilayah[] = await (await fetch(`${API_WILAYAH}/districts/${city.id}.json`)).json();
    const found = matchByName(districtsList, districtName);
    if (found) return { city, district: found, districtsList };
  }
  return null;
}

async function findDistrictByVillage(citySources: Wilayah[], villageName: string): Promise<DistrictMatchResult | null> {
  for (const city of citySources) {
    const districtsList: Wilayah[] = await (await fetch(`${API_WILAYAH}/districts/${city.id}.json`)).json();
    for (const district of districtsList) {
      const villagesList: Wilayah[] = await (await fetch(`${API_WILAYAH}/villages/${district.id}.json`)).json();
      const foundVillage = matchByName(villagesList, villageName);
      if (foundVillage) return { city, district, districtsList, village: foundVillage };
    }
  }
  return null;
}