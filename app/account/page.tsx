'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import toast from 'react-hot-toast';
import { ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react';

const IconShield = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
  </svg>
);

const IconKey = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="15" r="4"/><line x1="10.85" y1="12.15" x2="19" y2="4"/>
    <line x1="18" y1="5" x2="20" y2="7"/><line x1="15" y1="8" x2="17" y2="6"/>
  </svg>
);

const IconMail = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

export default function AccountPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentEmail, setCurrentEmail] = useState('');
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { router.push('/'); return; }
      setCurrentEmail(user.email || '');
    });
  }, [router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      toast.error('Konfirmasi password tidak cocok.');
      return;
    }
    if (!newEmail && !newPassword) {
      toast.error('Isi minimal satu perubahan (email atau password).');
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.email) throw new Error('User tidak ditemukan');

      // Verifikasi password lama
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: oldPassword,
      });
      if (signInError) throw new Error('Password lama salah. Coba lagi.');

      // Update
      const { error: updateError } = await supabase.auth.updateUser({
        email: newEmail || undefined,
        password: newPassword || undefined,
      });
      if (updateError) throw updateError;

      toast.success('Akun berhasil diperbarui!');
      setOldPassword('');
      setNewEmail('');
      setNewPassword('');
      setConfirmPassword('');
      if (newEmail) setCurrentEmail(newEmail);
    } catch (err: any) {
      toast.error(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-10">
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
          <IconShield />
          </div>
          <div>
            <h1 className="text-[11px] uppercase tracking-[0.3em] text-gray-400">Pengaturan</h1>
            <p className="text-xl font-serif text-gray-900">Keamanan Akun</p>
          </div>
        </div>
      </div>

      {/* Info email saat ini */}
      {currentEmail && (
        <div className="bg-gray-50 border border-gray-100 px-4 py-3 mb-6 flex items-center gap-3">
          <IconMail />
          <div>
            <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400">Email aktif</p>
            <p className="text-[12px] text-gray-700 font-medium">{currentEmail}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleUpdate} className="space-y-5">

        {/* Password lama — wajib */}
        <div>
          <label className="block text-[9px] uppercase tracking-[0.25em] text-gray-400 mb-1.5">
            Password Saat Ini <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <input
              type={showOld ? 'text' : 'password'}
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
              required
              placeholder="Wajib diisi untuk konfirmasi"
              className="w-full border border-gray-200 px-4 py-3 pr-11 text-[13px] focus:outline-none focus:border-gray-800 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowOld(!showOld)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
            >
              {showOld ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-5">
          <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400 mb-4">Ubah Email atau Password</p>

          {/* Email baru */}
          <div className="mb-4">
            <label className="block text-[9px] uppercase tracking-[0.25em] text-gray-400 mb-1.5">
              Email Baru <span className="text-gray-300">(kosongkan jika tidak diubah)</span>
            </label>
            <input
              type="email"
              value={newEmail}
              onChange={e => setNewEmail(e.target.value)}
              placeholder={currentEmail}
              className="w-full border border-gray-200 px-4 py-3 text-[13px] focus:outline-none focus:border-gray-800 transition-colors"
            />
          </div>

          {/* Password baru */}
          <div className="mb-4">
            <label className="block text-[9px] uppercase tracking-[0.25em] text-gray-400 mb-1.5">
              Password Baru <span className="text-gray-300">(kosongkan jika tidak diubah)</span>
            </label>
            <div className="relative">
              <input
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="Min. 6 karakter"
                minLength={newPassword ? 6 : undefined}
                className="w-full border border-gray-200 px-4 py-3 pr-11 text-[13px] focus:outline-none focus:border-gray-800 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
              >
                {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Konfirmasi password baru */}
          {newPassword && (
            <div>
              <label className="block text-[9px] uppercase tracking-[0.25em] text-gray-400 mb-1.5">
                Konfirmasi Password Baru
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Ulangi password baru"
                className={`w-full border px-4 py-3 text-[13px] focus:outline-none transition-colors ${
                  confirmPassword && confirmPassword !== newPassword
                    ? 'border-red-300 focus:border-red-400'
                    : 'border-gray-200 focus:border-gray-800'
                }`}
              />
              {confirmPassword && confirmPassword !== newPassword && (
                <p className="text-[10px] text-red-400 mt-1">Password tidak cocok</p>
              )}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-black text-white py-3.5 text-[10px] uppercase tracking-[0.25em] hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? <Loader2 size={13} className="animate-spin" /> : <IconKey />}
          {loading ? 'Memperbarui...' : 'Simpan Perubahan'}
        </button>
      </form>
    </div>
  );
}
