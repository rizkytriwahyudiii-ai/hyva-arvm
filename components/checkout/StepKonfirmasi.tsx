import { ArrowRight } from 'lucide-react';
import { CartItem } from '@/types';

interface StepKonfirmasiProps {
  name: string;
  phone: string;
  fullAddress: string;
  courierLabel: string;
  ongkir: number;
  cart: CartItem[];
  total: number;
  loading: boolean;
  onBack: () => void;
  onSubmit: () => void;
}

/** Step 3: ringkasan final sebelum order dibuat. Ringkasan produk hanya tampil di mobile — desktop sudah ada sidebar. */
export default function StepKonfirmasi({
  name, phone, fullAddress, courierLabel, ongkir,
  cart, total, loading, onBack, onSubmit,
}: StepKonfirmasiProps) {
  return (
    <div className="space-y-5">
      <h2 className="text-[11px] uppercase tracking-[0.3em] text-gray-500">Konfirmasi Pesanan</h2>

      {/* Ringkasan produk — mobile only, desktop sudah punya sidebar OrderSummary */}
      <div className="lg:hidden bg-gray-50 p-4 space-y-3 mb-2">
        <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400">Ringkasan</p>
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between text-[12px]">
            <span className="text-gray-700">
              {item.name} <span className="text-gray-400">×{item.quantity}</span>
            </span>
            <span className="font-medium">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
          </div>
        ))}
        <div className="border-t border-gray-200 pt-2 flex justify-between font-bold">
          <span>Total</span>
          <span>Rp {total.toLocaleString('id-ID')}</span>
        </div>
      </div>

      <div className="border border-gray-100 divide-y divide-gray-100">
        <div className="p-4">
          <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 mb-1">Penerima</p>
          <p className="text-[13px] font-semibold text-gray-900">{name}</p>
          <p className="text-[12px] text-gray-600">{phone}</p>
        </div>
        <div className="p-4">
          <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 mb-1">Alamat</p>
          <p className="text-[12px] text-gray-600 leading-relaxed">{fullAddress}</p>
        </div>
        <div className="p-4">
          <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 mb-1">Kurir</p>
          <p className="text-[12px] text-gray-600">{courierLabel}</p>
          <p className="text-[12px] font-medium text-gray-800">Rp {ongkir.toLocaleString('id-ID')}</p>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 px-4 py-3">
        <p className="text-[11px] text-amber-700 font-semibold mb-0.5">Mode Prototype</p>
        <p className="text-[11px] text-amber-600">
          Pembayaran Midtrans akan aktif setelah akun terhubung.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 border border-gray-200 hover:border-black text-gray-700 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors"
        >
          Kembali
        </button>
        <button
          onClick={onSubmit}
          disabled={loading}
          className="flex-1 bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white py-4 text-[11px] font-bold uppercase tracking-[0.25em] transition-colors flex items-center justify-center gap-2"
        >
          {loading ? 'Memproses...' : <><span>Buat Pesanan</span><ArrowRight size={14} /></>}
        </button>
      </div>
    </div>
  );
}