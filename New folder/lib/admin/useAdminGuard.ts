import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

/**
 * Hook untuk melindungi halaman /admin.
 * - Belum login            → redirect ke /admin/login (halaman login khusus admin)
 * - Login tapi bukan admin → redirect ke / (homepage)
 * - Login & role 'admin'   → isAllowed = true, halaman boleh dirender
 *
 * Bug fix dari versi sebelumnya: setChecking(false) sekarang dipanggil
 * di finally block agar tidak pernah stuck di loading state.
 */
export function useAdminGuard() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          router.replace('/admin/login');
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
      } catch {
        router.replace('/admin/login');
      } finally {
        setChecking(false);
      }
    };

    checkAccess();
  }, [router]);

  return { checking, isAllowed };
}
