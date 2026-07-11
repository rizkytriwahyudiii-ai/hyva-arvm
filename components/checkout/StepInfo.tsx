import { ArrowRight, MapPin, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Field from './Field';
import { inputCls, selectCls } from '@/lib/checkout/types';
import { UseWilayahReturn } from '@/lib/checkout/useWilayah';

interface StepInfoProps {
  name: string;
  setName: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  postalCode: string;
  setPostalCode: (v: string) => void;
  detailAddress: string;
  setDetailAddress: (v: string) => void;
  wilayah: UseWilayahReturn;
  onOpenMap: () => void;
  onNext: () => void;
}

/** Step 1: form nama, WA, pilih lokasi via peta, dan dropdown wilayah bertingkat */
export default function StepInfo({
  name, setName, phone, setPhone,
  postalCode, setPostalCode,
  detailAddress, setDetailAddress,
  wilayah, onOpenMap, onNext,
}: StepInfoProps) {

  const handleNext = () => {
  if (
    !name ||
    !phone ||
    !wilayah.provinceId ||
    !wilayah.cityId ||
    !wilayah.districtId ||
    !detailAddress
  ) {
    toast.error('Lengkapi data hingga minimal kecamatan & detail alamat');
    return;
  }
  onNext();
};

  return (
    <div className="space-y-4">
      <h2 className="text-[11px] uppercase tracking-[0.3em] text-gray-500 mb-2">
        Informasi Penerima & Alamat
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Nama Lengkap">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama penerima"
            className={inputCls}
          />
        </Field>
        <Field label="Nomor WhatsApp">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="08xxxxxxxxxx"
            className={inputCls}
          />
        </Field>
      </div>

      <button
        type="button"
        onClick={onOpenMap}
        className="w-full flex items-center justify-between px-5 py-4 border border-dashed border-gray-300 hover:border-black transition-colors group"
      >
        <div className="flex items-center gap-3">
          <MapPin size={15} className="text-gray-400 group-hover:text-black" />
          <div className="text-left">
            <p className="text-[12px] font-semibold text-gray-700 group-hover:text-black">
              Pilih dari Peta
            </p>
            <p className="text-[10px] text-gray-400">Alamat otomatis terisi</p>
          </div>
        </div>
        <ArrowRight size={13} className="text-gray-400 group-hover:text-black" />
      </button>

      <Field label="Provinsi">
        <select
          value={wilayah.provinceId}
          onChange={(e) =>
            wilayah.onProvinceChange(e.target.value, e.target.options[e.target.selectedIndex].text)
          }
          className={selectCls}
        >
          <option value="">Pilih Provinsi</option>
          {wilayah.provinces.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </Field>

      <Field label="Kota / Kabupaten">
        <div className="relative">
          <select
            value={wilayah.cityId}
            onChange={(e) =>
              wilayah.onCityChange(e.target.value, e.target.options[e.target.selectedIndex].text)
            }
            disabled={!wilayah.provinceId || wilayah.loadingCities}
            className={selectCls}
          >
            <option value="">{wilayah.loadingCities ? 'Memuat...' : 'Pilih Kota/Kabupaten'}</option>
            {wilayah.cities.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          {wilayah.loadingCities && (
            <Loader2 size={13} className="absolute right-4 top-4 animate-spin text-gray-400" />
          )}
        </div>
      </Field>

      <Field label="Kecamatan">
        <div className="relative">
          <select
            value={wilayah.districtId}
            onChange={(e) =>
              wilayah.onDistrictChange(e.target.value, e.target.options[e.target.selectedIndex].text)
            }
            disabled={!wilayah.cityId || wilayah.loadingDistricts}
            className={selectCls}
          >
            <option value="">{wilayah.loadingDistricts ? 'Memuat...' : 'Pilih Kecamatan'}</option>
            {wilayah.districts.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
          {wilayah.loadingDistricts && (
            <Loader2 size={13} className="absolute right-4 top-4 animate-spin text-gray-400" />
          )}
        </div>
      </Field>

      <Field label="Desa / Kelurahan">
        <div className="relative">
          <select
            value={wilayah.villageId}
            onChange={(e) =>
              wilayah.onVillageChange(e.target.value, e.target.options[e.target.selectedIndex].text)
            }
            disabled={!wilayah.districtId || wilayah.loadingVillages}
            className={selectCls}
          >
            <option value="">{wilayah.loadingVillages ? 'Memuat...' : 'Pilih Desa/Kelurahan'}</option>
            {wilayah.villages.map((v) => (
              <option key={v.id} value={v.id}>{v.name}</option>
            ))}
          </select>
          {wilayah.loadingVillages && (
            <Loader2 size={13} className="absolute right-4 top-4 animate-spin text-gray-400" />
          )}
        </div>
      </Field>

      <Field label="Kode Pos">
        <input
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          placeholder="Kode pos"
          className={inputCls}
        />
      </Field>

      <Field
        label="Detail Alamat"
        hint="Contoh: Jl. Mawar No. 5, RT 02/RW 03, pagar biru, depan warung hijau"
      >
        <textarea
          value={detailAddress}
          onChange={(e) => setDetailAddress(e.target.value)}
          placeholder="Nama jalan, No. rumah, RT/RW, warna pagar/gerbang, ciri-ciri rumah..."
          rows={3}
          className={`${inputCls} resize-none`}
        />
      </Field>

      <button
        onClick={handleNext}
        className="w-full bg-black hover:bg-gray-800 text-white py-4 text-[11px] font-bold uppercase tracking-[0.25em] transition-colors flex items-center justify-center gap-2"
      >
        Lanjut ke Pengiriman <ArrowRight size={14} />
      </button>
    </div>
  );
}