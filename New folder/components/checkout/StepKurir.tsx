import { ArrowRight } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { COURIERS, ZONE_PRICE } from '@/lib/checkout/types';
import { getZone } from '@/lib/checkout/calculations';

interface StepKurirProps {
  provinceName: string;
  locationLabel: string;
  courier: string;
  setCourier: (id: string) => void;
  onBack: () => void;
  onNext: () => void;
}

/** Step 2: pilih kurir pengiriman, harga dihitung berdasarkan zona provinsi */
export default function StepKurir({
  provinceName, locationLabel, courier, setCourier, onBack, onNext,
}: StepKurirProps) {
  const zone = getZone(provinceName);

  const handleNext = () => {
    if (!courier) {
      toast.error('Pilih kurir dulu');
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[11px] uppercase tracking-[0.3em] text-gray-500 mb-1">Pilih Kurir</h2>
        <p className="text-[11px] text-gray-400">
          Ke <span className="text-black font-medium">{locationLabel}</span>
        </p>
      </div>

      <div className="space-y-3">
        {COURIERS.map((c) => {
          const price = Math.round(ZONE_PRICE[zone] * c.multiplier);
          const isSelected = courier === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setCourier(c.id)}
              className={`w-full flex items-center justify-between px-4 py-4 border transition-colors text-left ${
                isSelected ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <div>
                <p className="text-[13px] font-bold text-gray-900">{c.name}</p>
                <p className="text-[11px] text-gray-500">{c.estimate}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-[13px] font-semibold">Rp {price.toLocaleString('id-ID')}</p>
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'border-black bg-black' : 'border-gray-300'
                  }`}
                >
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 border border-gray-200 hover:border-black text-gray-700 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors"
        >
          Kembali
        </button>
        <button
          onClick={handleNext}
          className="flex-1 bg-black hover:bg-gray-800 text-white py-4 text-[11px] font-bold uppercase tracking-[0.25em] transition-colors flex items-center justify-center gap-2"
        >
          Lanjut <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}