import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Order } from './types';

/**
 * Hook untuk mengelola data pesanan: fetch semua order (admin view),
 * update status pengiriman, dan hitung statistik ringkas (total omset,
 * jumlah transaksi) untuk ditampilkan di dashboard.
 */
export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setOrders(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId: string, status: string): Promise<{ success: boolean; message: string }> => {
    try {
      const { error } = await supabase.from('orders').update({ status }).eq('id', orderId);
      if (error) throw error;
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: status as Order['status'] } : o))
      );
      return { success: true, message: 'Status pesanan diperbarui' };
    } catch (error: any) {
      return { success: false, message: 'Gagal update status: ' + error.message };
    }
  };

  // Statistik ringkas untuk dashboard
  const totalOmset = orders
    .filter((o) => o.payment_status === 'paid')
    .reduce((sum, o) => sum + (o.total || 0), 0);

  const totalTransaksi = orders.length;

  /** Produk paling sering dibeli, dihitung dari semua order.items */
  const topProducts = (() => {
    const countMap: Record<string, number> = {};
    orders.forEach((order) => {
      (order.items || []).forEach((item) => {
        countMap[item.name] = (countMap[item.name] || 0) + item.quantity;
      });
    });
    return Object.entries(countMap)
      .map(([name, qty]) => ({ name, qty }))
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 5);
  })();

  return {
    orders, loading, fetchOrders, updateStatus,
    totalOmset, totalTransaksi, topProducts,
  };
}

export type UseOrdersReturn = ReturnType<typeof useOrders>;