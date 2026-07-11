import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { CustomerProfile } from './types';

/**
 * Hook untuk mengambil daftar pelanggan terdaftar (dari tabel profiles).
 * Email diambil terpisah lewat auth admin API kalau tersedia; kalau tidak,
 * cukup tampilkan data dari profiles saja (full_name, phone, address).
 */
export function useCustomers() {
  const [customers, setCustomers] = useState<CustomerProfile[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setCustomers(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return { customers, loading, fetchCustomers };
}

export type UseCustomersReturn = ReturnType<typeof useCustomers>;