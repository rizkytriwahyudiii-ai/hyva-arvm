'use client';

import { useState } from 'react';
import { LayoutDashboard, Loader2 } from 'lucide-react';

import { useAdminGuard } from '@/lib/admin/useAdminGuard';
import { useProducts } from '@/lib/admin/useProducts';
import { useOrders } from '@/lib/admin/useOrders';
import { useCustomers } from '@/lib/admin/useCustomers';
import { AdminTab } from '@/lib/admin/types';

import AdminTabs from '@/components/admin/AdminTabs';
import OrdersTab from '@/components/admin/OrdersTab';
import CatalogTab from '@/components/admin/CatalogTab';
import CustomersTab from '@/components/admin/CustomersTab';

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
  const { checking, isAllowed } = useAdminGuard();
  const [activeTab, setActiveTab] = useState<AdminTab>('orders');

  const productsHook = useProducts();
  const ordersHook = useOrders();
  const customersHook = useCustomers();

  // Selama proses cek akses berjalan, atau akses ditolak (lalu redirect
  // sedang berjalan), tampilkan loading kosong saja. Tidak ada konten
  // admin yang ter-render di sini.
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
        </div>

        <AdminTabs active={activeTab} onChange={setActiveTab} />

        {activeTab === 'orders' && <OrdersTab ordersHook={ordersHook} />}
        {activeTab === 'catalog' && <CatalogTab productsHook={productsHook} />}
        {activeTab === 'customers' && <CustomersTab customersHook={customersHook} />}
      </div>
    </div>
  );
}