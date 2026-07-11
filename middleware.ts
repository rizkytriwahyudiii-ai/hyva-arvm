import { NextRequest, NextResponse } from 'next/server';

/**
 * Middleware ringan — hanya log request ke /admin.
 * Proteksi halaman admin yang sesungguhnya dilakukan di
 * useAdminGuard (client-side) yang cek role dari Supabase.
 * Middleware tidak bisa cek role karena tidak bisa akses DB.
 */
export function middleware(req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
