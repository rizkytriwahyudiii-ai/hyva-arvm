import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

/**
 * Hook untuk melindungi halaman /admin.
 * - Belum login -> redirect ke /login
 * - Login tapi role bukan 'admin' -> redirect ke / (homepage), tidak boleh
 *   sempat melihat konten apapun di halaman admin
 * - Login dan role 'admin' -> isAllowed = true, halaman boleh dirender
 *
 * Selama proses pengecekan berjalan (checking = true), komponen pemanggil
 * harus menampilkan loading state, BUKAN konten admin — supaya tidak ada
 * "flash" konten sensitif sebelum redirect selesai.
 */
export function useAdminGuard() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.replace('/login');
        return;
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error || !profile || profile.role !== 'admin') {
        router.replace('/');
        return;
      }

      setIsAllowed(true);
      setChecking(false);
    };

    checkAccess();
  }, [router]);

  return { checking, isAllowed };
}