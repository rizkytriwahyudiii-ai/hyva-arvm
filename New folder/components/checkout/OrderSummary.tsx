import { CartItem } from '@/types';

interface OrderSummaryProps {
  cart: CartItem[];
  subtotal: number;
  ongkir: number;
  total: number;
}

/** Sidebar ringkasan pesanan — hanya tampil di desktop (lg:block). Di mobile, ringkasan singkat muncul di StepKonfirmasi. */
export default function OrderSummary({ cart, subtotal, ongkir, total }: OrderSummaryProps) {
  return (
    <div className="hidden lg:block lg:col-span-1">
      <div className="bg-gray-50 p-6 sticky top-28">
        <h2 className="text-[11px] uppercase tracking-[0.3em] text-gray-500 mb-5">Ringkasan</h2>

        <div className="space-y-3 mb-5">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-start gap-2">
              <div className="flex items-start gap-2 flex-1 min-w-0">
                <div className="w-10 h-10 bg-white border border-gray-100 flex-shrink-0">
                  <img
                    src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item.image_url}`}
                    alt={item.name}
                    className="w-full h-full object-contain p-1"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] text-gray-700 font-medium leading-snug line-clamp-2">
                    {item.name}
                  </p>
                  <p className="text-[10px] text-gray-400">×{item.quantity}</p>
                </div>
              </div>
              <p className="text-[12px] font-medium text-gray-900 flex-shrink-0">
                Rp {(item.price * item.quantity).toLocaleString('id-ID')}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-4 space-y-2 mb-4">
          <div className="flex justify-between">
            <p className="text-[11px] text-gray-500">Subtotal</p>
            <p className="text-[12px] font-medium">Rp {subtotal.toLocaleString('id-ID')}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-[11px] text-gray-500">Ongkir</p>
            <p className="text-[12px] font-medium">
              {ongkir > 0 ? `Rp ${ongkir.toLocaleString('id-ID')}` : '-'}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center">
            <p className="text-[12px] font-bold uppercase tracking-[0.1em]">Total</p>
            <p className="text-lg font-bold">Rp {total.toLocaleString('id-ID')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}