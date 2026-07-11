'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'react-hot-toast';
import { ArrowLeft, MapPin, Save, Loader2 } from 'lucide-react';

export default function AlamatPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    async function loadProfile() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/');
        return;
      }
      setUserId(session.user.id);

      const { data } = await supabase
        .from('profiles')
        .select('address, city, province, postal_code, phone')
        .eq('id', session.user.id)
        .single();

      if (data) {
        setAddress(data.address || '');
        setCity(data.city || '');
        setProvince(data.province || '');
        setPostalCode(data.postal_code || '');
        setPhone(data.phone || '');
      }
      setLoading(false);
    }
    loadProfile();
  }, [router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          address,
          city,
          province,
          postal_code: postalCode,
          phone,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId);

      if (error) throw error;
      toast.success('Alamat berhasil disimpan!');
    } catch (err: any) {
      toast.error('Gagal menyimpan: ' + (err.message || 'Terjadi kesalahan'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 size={20} className="animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/profile"
          className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors mb-6"
        >
          <ArrowLeft size={11} /> Kembali ke Profil
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-100 flex items-center justify-center">
            <MapPin size={14} className="text-gray-600" />
          </div>
          <div>
            <h1 className="text-[11px] uppercase tracking-[0.3em] text-gray-400">Pengaturan</h1>
            <p className="text-xl font-serif text-gray-900">Ubah Alamat</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="space-y-5">
        <div>
          <label className="block text-[9px] uppercase tracking-[0.25em] text-gray-400 mb-1.5">
            Nomor Telepon
          </label>
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="08xxxxxxxxxx"
            className="w-full border border-gray-200 px-4 py-3 text-[13px] focus:outline-none focus:border-gray-800 transition-colors"
          />
        </div>

        <div>
          <label className="block text-[9px] uppercase tracking-[0.25em] text-gray-400 mb-1.5">
            Alamat Lengkap
          </label>
          <textarea
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan..."
            rows={3}
            className="w-full border border-gray-200 px-4 py-3 text-[13px] focus:outline-none focus:border-gray-800 transition-colors resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[9px] uppercase tracking-[0.25em] text-gray-400 mb-1.5">
              Kota / Kabupaten
            </label>
            <input
              type="text"
              value={city}
              onChange={e => setCity(e.target.value)}
              placeholder="Surabaya"
              className="w-full border border-gray-200 px-4 py-3 text-[13px] focus:outline-none focus:border-gray-800 transition-colors"
            />
          </div>
          <div>
            <label className="block text-[9px] uppercase tracking-[0.25em] text-gray-400 mb-1.5">
              Kode Pos
            </label>
            <input
              type="text"
              value={postalCode}
              onChange={e => setPostalCode(e.target.value)}
              placeholder="60111"
              maxLength={5}
              className="w-full border border-gray-200 px-4 py-3 text-[13px] focus:outline-none focus:border-gray-800 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-[9px] uppercase tracking-[0.25em] text-gray-400 mb-1.5">
            Provinsi
          </label>
          <input
            type="text"
            value={province}
            onChange={e => setProvince(e.target.value)}
            placeholder="Jawa Timur"
            className="w-full border border-gray-200 px-4 py-3 text-[13px] focus:outline-none focus:border-gray-800 transition-colors"
          />
        </div>

        {/* Save button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 bg-black text-white py-3.5 text-[10px] uppercase tracking-[0.25em] hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? (
              <Loader2 size={13} className="animate-spin" />
            ) : (
              <Save size={13} />
            )}
            {saving ? 'Menyimpan...' : 'Simpan Alamat'}
          </button>
        </div>
      </form>

      {/* Info note */}
      <p className="text-[10px] text-gray-400 text-center mt-6 leading-relaxed">
        Alamat ini akan digunakan secara otomatis saat proses checkout.
      </p>
    </div>
  );
}
