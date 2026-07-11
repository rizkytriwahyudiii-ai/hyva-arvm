'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, Loader2, LogOut } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'react-hot-toast';

import { useAdminGuard } from '@/lib/admin/useAdminGuard';
import { useProducts } from '@/lib/admin/useProducts';
import { useOrders } from '@/lib/admin/useOrders';
import { useCustomers } from '@/lib/admin/useCustomers';
import { useSettings } from '@/lib/admin/useSettings';
import { AdminTab } from '@/lib/admin/types';

import AdminTabs from '@/components/admin/AdminTabs';
import OrdersTab from '@/components/admin/OrdersTab';
import CatalogTab from '@/components/admin/CatalogTab';
import CustomersTab from '@/components/admin/CustomersTab';
import SettingsTab from '@/components/admin/SettingsTab';

/**
 * Halaman utama Admin Panel HYVA ARVM.
 *
 * PENTING: useAdminGuard() dipanggil PALING ATAS, sebelum hook data
 * lain (useProducts, useOrders, useCustomers). Selama `checking` masih
 * true atau `isAllowed` masih false, kita return early dengan loading
 * state — supaya komponen tab dan datanya TIDAK PERNAH di-mount untuk
 * user yang bukan admin, bukan cuma disembunyikan secara visual.
 */
export default function AdminPage() {
  const router = useRouter();
  const { checking, isAllowed } = useAdminGuard();
  const [activeTab, setActiveTab] = useState<AdminTab>('orders');
  const [loggingOut, setLoggingOut] = useState(false);

  const productsHook  = useProducts();
  const ordersHook    = useOrders();
  const customersHook = useCustomers();
  const settingsHook  = useSettings();

  const handleLogout = async () => {
    setLoggingOut(true);
    await supabase.auth.signOut();
    toast.success('Berhasil keluar dari panel admin');
    router.replace('/admin/login');
  };

  if (checking || !isAllowed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 size={24} className="animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-[1400px] mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">

        <div className="flex justify-between items-center border-b-2 border-amber-700 pb-6 mb-8">
          <h2 className="text-lg md:text-xl font-bold flex items-center gap-3">
            <LayoutDashboard className="text-amber-700" />
            Hyva Arvm Management Control Center
          </h2>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-slate-500 hover:text-red-600 border border-slate-200 hover:border-red-300 px-3 py-2 rounded-lg transition-colors"
          >
            {loggingOut ? <Loader2 size={13} className="animate-spin" /> : <LogOut size={13} />}
            Keluar
          </button>
        </div>

        <AdminTabs active={activeTab} onChange={setActiveTab} />

        {activeTab === 'orders'    && <OrdersTab    ordersHook={ordersHook} />}
        {activeTab === 'catalog'   && <CatalogTab   productsHook={productsHook} />}
        {activeTab === 'customers' && <CustomersTab customersHook={customersHook} />}
        {activeTab === 'settings'  && <SettingsTab  settingsHook={settingsHook} />}
      </div>
    </div>
  );
}
