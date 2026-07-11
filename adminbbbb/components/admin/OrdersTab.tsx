import { toast } from 'react-hot-toast';
import { ChevronDown } from 'lucide-react';
import { UseOrdersReturn } from '@/lib/admin/useOrders';
import { ORDER_STATUS_CONFIG, ORDER_STATUS_OPTIONS } from '@/lib/admin/types';
import DashboardStats from './DashboardStats';

interface OrdersTabProps {
  ordersHook: UseOrdersReturn;
}

/** Tab "Kelola & Atur Pengiriman" — dashboard omset + tabel semua pesanan masuk */
export default function OrdersTab({ ordersHook }: OrdersTabProps) {
  const { orders, loading, updateStatus, totalOmset, totalTransaksi, topProducts } = ordersHook;

  const handleStatusChange = async (orderId: string, status: string) => {
    const result = await updateStatus(orderId, status);
    if (result.success) toast.success(result.message);
    else toast.error(result.message);
  };

  return (
    <div>
      <DashboardStats totalOmset={totalOmset} totalTransaksi={totalTransaksi} topProducts={topProducts} />

      <div className="bg-white border border-slate-100 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-800">Daftar Logistik Pesanan Masuk</h3>
          <p className="text-[12px] text-slate-400 mt-0.5">{orders.length} pesanan tercatat</p>
        </div>

        {loading ? (
          <p className="text-center text-slate-400 py-12 text-sm">Memuat data pesanan...</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-slate-400 py-12 text-sm">Belum ada pesanan masuk</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-900 text-white text-[11px] uppercase tracking-wide">
                <tr>
                  <th className="p-4 text-left">ID Order</th>
                  <th className="p-4 text-left">Tanggal</th>
                  <th className="p-4 text-left">Penerima & Alamat</th>
                  <th className="p-4 text-left">Item</th>
                  <th className="p-4 text-left">Total</th>
                  <th className="p-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((order) => {
                  const statusConfig = ORDER_STATUS_CONFIG[order.status] || ORDER_STATUS_CONFIG.pending;
                  return (
                    <tr key={order.id} className="hover:bg-slate-50">
                      <td className="p-4 font-mono text-[12px] text-slate-500">{order.midtrans_order_id}</td>
                      <td className="p-4 text-[12px] text-slate-600">
                        {new Date(order.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric', month: 'short', year: 'numeric',
                        })}
                      </td>
                      <td className="p-4 max-w-[220px]">
                        <p className="font-semibold text-slate-800">{order.name}</p>
                        <p className="text-[12px] text-slate-500">{order.phone}</p>
                        <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{order.address}</p>
                      </td>
                      <td className="p-4 max-w-[200px]">
                        <p className="text-[12px] text-slate-600">
                          {(order.items || []).map((i) => i.name).join(', ')}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{order.courier}</p>
                      </td>
                      <td className="p-4 font-bold text-amber-700 whitespace-nowrap">
                        Rp {order.total?.toLocaleString('id-ID')}
                      </td>
                      <td className="p-4">
                        <div className="relative inline-block">
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            className={`appearance-none pl-3 pr-7 py-1.5 rounded-full text-[11px] font-semibold border cursor-pointer ${statusConfig.color}`}
                          >
                            {ORDER_STATUS_OPTIONS.map((s) => (
                              <option key={s} value={s}>{ORDER_STATUS_CONFIG[s].label}</option>
                            ))}
                          </select>
                          <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}