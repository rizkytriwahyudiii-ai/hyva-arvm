import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * Middleware Next.js — proteksi server-side untuk rute /admin
 *
 * Cara kerja:
 * 1. Semua request ke /admin/* dicegat di sini
 * 2. /admin/login dibiarkan lewat (tidak diproteksi)
 * 3. Request lain ke /admin/* dicek access_token dari cookie
 * 4. Token tidak ada / tidak valid → redirect ke /admin/login
 *
 * Catatan: middleware hanya bisa baca cookie, tidak bisa panggil
 * Supabase DB. Verifikasi role 'admin' tetap dilakukan di
 * useAdminGuard (client-side) setelah middleware lewat.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Halaman login admin — selalu boleh diakses
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Proteksi semua rute /admin dan sub-rutenya
  if (pathname.startsWith('/admin')) {
    // Baca token dari cookie Supabase (nama cookie berbeda per versi)
    const token =
      req.cookies.get('sb-access-token')?.value ||
      req.cookies.get(`sb-${process.env.NEXT_PUBLIC_SUPABASE_URL?.split('//')[1]?.split('.')[0]}-auth-token`)?.value ||
      // Supabase v2 menyimpan dalam format JSON di cookie ini:
      (() => {
        try {
          const raw = req.cookies.get('supabase-auth-token')?.value;
          if (raw) return JSON.parse(raw)[0];
        } catch {}
        return null;
      })();

    if (!token) {
      const loginUrl = new URL('/admin/login', req.url);
      // Simpan tujuan asal agar bisa redirect balik setelah login
      loginUrl.searchParams.set('next', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
