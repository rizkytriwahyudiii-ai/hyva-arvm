'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id');
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (orderId) {
      supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single()
        .then(({ data }) => setOrder(data));
    }
  }, [orderId]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">

        {/* Check icon — inline SVG, no lucide dependency */}
        <div className="flex justify-center mb-6">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>

        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-2">Pesanan Diterima</p>
        <h1 className="text-2xl font-serif text-gray-900 mb-3">Terima Kasih!</h1>
        <p className="text-[13px] text-gray-500 mb-8">
          Pesanan kamu sudah kami terima dan sedang diproses. Kami akan menghubungi kamu via WhatsApp untuk konfirmasi.
        </p>

        {order && (
          <div className="bg-gray-50 p-5 text-left mb-8 space-y-2">
            <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 mb-3">Detail Pesanan</p>
            <div className="flex justify-between">
              <p className="text-[11px] text-gray-500">Order ID</p>
              <p className="text-[11px] font-mono text-gray-700">{order.midtrans_order_id}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-[11px] text-gray-500">Penerima</p>
              <p className="text-[11px] text-gray-700">{order.name}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-[11px] text-gray-500">Kurir</p>
              <p className="text-[11px] text-gray-700">{order.courier}</p>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
              <p className="text-[11px] font-bold text-gray-900">Total</p>
              <p className="text-[11px] font-bold text-gray-900">
                Rp {order.total?.toLocaleString('id-ID')}
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="w-full bg-black hover:bg-gray-800 text-white py-4 text-[11px] font-bold uppercase tracking-[0.25em] transition-colors flex items-center justify-center gap-2"
          >
            Lanjut Belanja <ArrowRight size={14} />
          </Link>
          <Link
            href="/profile"
            className="w-full border border-gray-200 hover:border-black text-gray-700 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2"
          >
            {/* Package icon inline */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
              <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
            Lihat Riwayat Order
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[80vh] flex items-center justify-center">
        <p className="text-[12px] text-gray-400">Memuat detail pesanan...</p>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}
