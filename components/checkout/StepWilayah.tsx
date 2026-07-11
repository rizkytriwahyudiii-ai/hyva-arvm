interface StepWilayahProps {
  // Wilayah Data
  provinces: any[];
  cities: any[];
  districts: any[];
  villages: any[];
  
  // Handlers
  onProvinceChange: (id: string, name: string) => void;
  onCityChange: (id: string, name: string) => void;
  onDistrictChange: (id: string, name: string) => void;
  onVillageChange: (id: string, name: string) => void;
  
  // Selected State
  selected: {
    province: string;
    city: string;
    district: string;
    village: string;
    postalCode: string;
    detailAddress: string;
  };
  
  setPostalCode: (val: string) => void;
  setDetailAddress: (val: string) => void;
  
  // Loading State
  loadingCities: boolean;
  loadingDistricts: boolean;
  loadingVillages: boolean;
}

export default function StepWilayah({
  provinces, cities, districts, villages,
  onProvinceChange, onCityChange, onDistrictChange, onVillageChange,
  selected, setPostalCode, setDetailAddress,
  loadingCities, loadingDistricts, loadingVillages
}: StepWilayahProps) {

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg mb-4">Detail Alamat</h3>

      {/* Provinsi */}
      <select 
        className="w-full p-2 border rounded-md"
        value={selected.province}
        onChange={(e) => {
          const selectedOption = e.target.options[e.target.selectedIndex];
          onProvinceChange(e.target.value, selectedOption.text);
        }}
      >
        <option value="">Pilih Provinsi</option>
        {provinces.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>

      {/* Kota */}
      <select 
        className="w-full p-2 border rounded-md"
        disabled={loadingCities || !selected.province}
        value={selected.city}
        onChange={(e) => onCityChange(e.target.value, e.target.options[e.target.selectedIndex].text)}
      >
        <option value="">{loadingCities ? 'Memuat Kota...' : 'Pilih Kota/Kabupaten'}</option>
        {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>

      {/* Kecamatan */}
      <select 
        className="w-full p-2 border rounded-md"
        disabled={loadingDistricts || !selected.city}
        value={selected.district}
        onChange={(e) => onDistrictChange(e.target.value, e.target.options[e.target.selectedIndex].text)}
      >
        <option value="">{loadingDistricts ? 'Memuat Kecamatan...' : 'Pilih Kecamatan'}</option>
        {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
      </select>

      {/* Desa/Kelurahan */}
      <select 
        className="w-full p-2 border rounded-md"
        disabled={loadingVillages || !selected.district}
        value={selected.village}
        onChange={(e) => onVillageChange(e.target.value, e.target.options[e.target.selectedIndex].text)}
      >
        <option value="">{loadingVillages ? 'Memuat Desa...' : 'Pilih Desa/Kelurahan'}</option>
        {villages.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
      </select>

      <input 
        placeholder="Kode Pos"
        value={selected.postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
        className="w-full p-2 border rounded-md"
      />

      <textarea 
        placeholder="Alamat Detail (Jl. Nama Jalan, No. Rumah, RT/RW)"
        value={selected.detailAddress}
        onChange={(e) => setDetailAddress(e.target.value)}
        className="w-full p-2 border rounded-md h-24"
      />
    </div>
  );
}