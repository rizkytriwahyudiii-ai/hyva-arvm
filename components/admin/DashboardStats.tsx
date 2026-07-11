import { TrendingUp, ShoppingBag, Wallet } from 'lucide-react';

interface DashboardStatsProps {
  totalOmset: number;
  totalTransaksi: number;
  topProducts: { name: string; qty: number }[];
}

/** Kartu statistik ringkas: total omset, jumlah transaksi, dan top produk terjual */
export default function DashboardStats({ totalOmset, totalTransaksi, topProducts }: DashboardStatsProps) {
  const maxQty = Math.max(...topProducts.map((p) => p.qty), 1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

      {/* Total Omset */}
      <div className="bg-slate-900 text-white p-6 rounded-xl flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/50 mb-2 flex items-center gap-1.5">
            <Wallet size={13} /> Total Omset Penjualan
          </p>
          <p className="text-3xl font-bold">Rp {totalOmset.toLocaleString('id-ID')}</p>
          <p className="text-[12px] text-white/40 mt-2 flex items-center gap-1">
            <ShoppingBag size={12} /> {totalTransaksi} transaksi masuk
          </p>
        </div>
        <TrendingUp size={36} className="text-amber-500/40" />
      </div>

      {/* Grafik produk terlaris (simple bar) */}
      <div className="bg-white border border-slate-100 p-6 rounded-xl">
        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400 mb-4">
          Produk Paling Banyak Dibeli
        </p>
        {topProducts.length === 0 ? (
          <p className="text-sm text-slate-400">Belum ada data penjualan</p>
        ) : (
          <div className="space-y-3">
            {topProducts.map((p, i) => (
              <div key={i}>
                <div className="flex justify-between text-[12px] mb-1">
                  <span className="text-slate-700 font-medium truncate max-w-[180px]">{p.name}</span>
                  <span className="text-slate-400">{p.qty}x</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-600 rounded-full transition-all duration-700"
                    style={{ width: `${(p.qty / maxQty) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}