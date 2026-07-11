'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'react-hot-toast';
import { Package, User, ArrowLeft, ChevronRight, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react';

type Tab = 'profile' | 'orders';

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: any }> = {
  pending: { label: 'Menunggu Pembayaran', color: 'text-amber-600 bg-amber-50 border-amber-200', icon: Clock },
  paid: { label: 'Dibayar', color: 'text-blue-600 bg-blue-50 border-blue-200', icon: CheckCircle },
  processing: { label: 'Diproses', color: 'text-purple-600 bg-purple-50 border-purple-200', icon: Loader2 },
  shipped: { label: 'Dikirim', color: 'text-indigo-600 bg-indigo-50 border-indigo-200', icon: Package },
  delivered: { label: 'Selesai', color: 'text-green-600 bg-green-50 border-green-200', icon: CheckCircle },
  cancelled: { label: 'Dibatalkan', color: 'text-red-600 bg-red-50 border-red-200', icon: XCircle },
};

export default function ProfilePage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('profile');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // Profile fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (tab === 'orders' && orders.length === 0) fetchOrders();
  }, [tab]);

  const fetchProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push('/login'); return; }
    const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    if (data) {
      setFullName(data.full_name || '');
      setPhone(data.phone || '');
      setAddress(data.address || '');
    }
    setLoading(false);
  };

  const fetchOrders = async () => {
    setLoadingOrders(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    setOrders(data || []);
    setLoadingOrders(false);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase.from('profiles').update({
        full_name: fullName,
        phone,
        address,
      }).eq('id', user.id);
      if (error) toast.error('Gagal update: ' + error.message);
      else toast.success('Profil berhasil diperbarui!');
    }
    setSaving(false);
  };

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Loader2 size={20} className="animate-spin text-gray-400" />
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-16">

      {/* Header */}
      <div className="mb-10">
        <Link href="/" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-gray-400 hover:text-black transition-colors mb-6">
          <ArrowLeft size={12} /> Kembali
        </Link>
        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-2">HYVA ARVM</p>
        <h1 className="text-2xl font-serif text-gray-900">Akun Saya</h1>
        <p className="text-[12px] text-gray-500 mt-1">{fullName}</p>
      </div>

      {/* Tab */}
      <div className="flex border-b border-gray-200 mb-8">
        <button
          onClick={() => setTab('profile')}
          className={`pb-3 mr-8 text-[11px] font-bold uppercase tracking-[0.2em] border-b-2 transition-colors ${
            tab === 'profile' ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-black'
          }`}
        >
          <span className="flex items-center gap-2"><User size={13} /> Edit Profil</span>
        </button>
        <button
          onClick={() => setTab('orders')}
          className={`pb-3 text-[11px] font-bold uppercase tracking-[0.2em] border-b-2 transition-colors ${
            tab === 'orders' ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-black'
          }`}
        >
          <span className="flex items-center gap-2"><Package size={13} /> Riwayat Pesanan</span>
        </button>
      </div>

      {/* === TAB: PROFILE === */}
      {tab === 'profile' && (
        <form onSubmit={handleUpdate} className="space-y-5 max-w-md">
          <div className="flex flex-col gap-1">
            <label className="text-[9px] uppercase tracking-[0.2em] text-gray-400">Nama Lengkap</label>
            <input
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="Nama lengkap"
              className="w-full px-4 py-3 border border-gray-200 text-[13px] outline-none focus:border-black transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[9px] uppercase tracking-[0.2em] text-gray-400">Nomor WhatsApp</label>
            <input
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="08xxxxxxxxxx"
              className="w-full px-4 py-3 border border-gray-200 text-[13px] outline-none focus:border-black transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[9px] uppercase tracking-[0.2em] text-gray-400">Alamat Pengiriman</label>
            <textarea
              value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder="Alamat lengkap"
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 text-[13px] outline-none focus:border-black transition-colors resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white py-4 text-[11px] font-bold uppercase tracking-[0.25em] transition-colors"
            >
              {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
            <Link
              href="/account"
              className="flex-1 border border-gray-200 hover:border-black text-gray-700 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors text-center"
            >
              Ubah Password
            </Link>
          </div>
        </form>
      )}

      {/* === TAB: ORDERS === */}
      {tab === 'orders' && (
        <div>
          {loadingOrders && (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={20} className="animate-spin text-gray-400" />
            </div>
          )}

          {!loadingOrders && orders.length === 0 && (
            <div className="text-center py-20">
              <Package size={40} className="text-gray-200 mx-auto mb-4" strokeWidth={1} />
              <p className="text-[12px] text-gray-500 mb-6">Belum ada pesanan</p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-black text-white px-8 py-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors"
              >
                Mulai Belanja
              </Link>
            </div>
          )}

          {!loadingOrders && orders.length > 0 && (
            <div className="space-y-4">
              {orders.map((order) => {
                const status = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
                const StatusIcon = status.icon;
                const isExpanded = expandedOrder === order.id;
                const items = Array.isArray(order.items) ? order.items : [];

                return (
                  <div key={order.id} className="border border-gray-100 overflow-hidden">
                    {/* Order Header */}
                    <button
                      onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                      className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className="flex items-start gap-4">
                        {/* Thumbnail produk pertama */}
                        {items[0]?.image_url && (
                          <div className="w-12 h-12 bg-gray-50 flex-shrink-0 overflow-hidden border border-gray-100">
                            <img
                              src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${items[0].image_url}`}
                              alt={items[0].name}
                              className="w-full h-full object-contain p-1"
                            />
                          </div>
                        )}
                        <div>
                          <p className="text-[10px] font-mono text-gray-400 mb-1">{order.midtrans_order_id}</p>
                          <p className="text-[13px] font-semibold text-gray-900">
                            {items.length} produk · Rp {order.total?.toLocaleString('id-ID')}
                          </p>
                          <p className="text-[11px] text-gray-500 mt-0.5">
                            {new Date(order.created_at).toLocaleDateString('id-ID', {
                              day: 'numeric', month: 'long', year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-semibold px-3 py-1 border rounded-full flex items-center gap-1 ${status.color}`}>
                          <StatusIcon size={10} />
                          {status.label}
                        </span>
                        <ChevronRight size={16} className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                      </div>
                    </button>

                    {/* Order Detail */}
                    {isExpanded && (
                      <div className="border-t border-gray-100 p-5 bg-gray-50 space-y-5">

                        {/* Daftar Produk */}
                        <div>
                          <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 mb-3">Produk</p>
                          <div className="space-y-3">
                            {items.map((item: any, i: number) => (
                              <div key={i} className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white border border-gray-100 flex-shrink-0">
                                  <img
                                    src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item.image_url}`}
                                    alt={item.name}
                                    className="w-full h-full object-contain p-1"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[12px] font-medium text-gray-900 truncate">{item.name}</p>
                                  <p className="text-[11px] text-gray-500">×{item.quantity} · Rp {item.price?.toLocaleString('id-ID')}</p>
                                </div>
                                <p className="text-[12px] font-semibold text-gray-900 flex-shrink-0">
                                  Rp {(item.price * item.quantity)?.toLocaleString('id-ID')}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Info Pengiriman */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 mb-1">Penerima</p>
                            <p className="text-[12px] font-medium text-gray-900">{order.name}</p>
                            <p className="text-[11px] text-gray-600">{order.phone}</p>
                          </div>
                          <div>
                            <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 mb-1">Kurir</p>
                            <p className="text-[12px] text-gray-700">{order.courier}</p>
                          </div>
                          <div className="sm:col-span-2">
                            <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 mb-1">Alamat</p>
                            <p className="text-[12px] text-gray-600 leading-relaxed">{order.address}</p>
                          </div>
                        </div>

                        {/* Total */}
                        <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                          <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500">Total Pembayaran</p>
                          <p className="text-[15px] font-bold text-gray-900">Rp {order.total?.toLocaleString('id-ID')}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}