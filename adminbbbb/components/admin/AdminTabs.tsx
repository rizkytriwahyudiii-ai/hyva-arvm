import { Truck, Package, Users } from 'lucide-react';
import { AdminTab } from '@/lib/admin/types';

interface AdminTabsProps {
  active: AdminTab;
  onChange: (tab: AdminTab) => void;
}

const TABS: { id: AdminTab; label: string; icon: any }[] = [
  { id: 'orders', label: 'Kelola & Atur Pengiriman', icon: Truck },
  { id: 'catalog', label: 'Manajemen Katalog Produk', icon: Package },
  { id: 'customers', label: 'Daftar Pelanggan Terdaftar', icon: Users },
];

/** Navigasi 3 tab utama admin: Pesanan, Katalog, Pelanggan */
export default function AdminTabs({ active, onChange }: AdminTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              isActive
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Icon size={15} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}