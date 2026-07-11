'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (mode === 'register') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName, phone, address } },
      });
      if (error) {
        toast.error(
          error.message.includes('already registered')
            ? 'Email sudah terdaftar.'
            : 'Gagal daftar: ' + error.message
        );
      } else {
        toast.success('Pendaftaran berhasil! Silakan masuk.');
        setMode('login');
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast.error('Email atau password salah.');
      } else {
        toast.success('Berhasil masuk!');
        router.push('/');
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">

        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-gray-400 hover:text-black transition-colors mb-10"
        >
          <ArrowLeft size={12} />
          Kembali
        </Link>

        {/* Header */}
        <div className="mb-10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-2">HYVA ARVM</p>
          <h1 className="text-2xl font-serif text-gray-900">
            {mode === 'login' ? 'Masuk ke Akun' : 'Buat Akun Baru'}
          </h1>
          <p className="text-[12px] text-gray-500 mt-2">
            {mode === 'login'
              ? 'Selamat datang kembali.'
              : 'Daftar untuk melanjutkan belanja.'}
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            onClick={() => setMode('login')}
            className={`pb-3 text-[11px] font-bold uppercase tracking-[0.2em] mr-8 border-b-2 transition-colors ${
              mode === 'login'
                ? 'border-black text-black'
                : 'border-transparent text-gray-400 hover:text-black'
            }`}
          >
            Masuk
          </button>
          <button
            onClick={() => setMode('register')}
            className={`pb-3 text-[11px] font-bold uppercase tracking-[0.2em] border-b-2 transition-colors ${
              mode === 'register'
                ? 'border-black text-black'
                : 'border-transparent text-gray-400 hover:text-black'
            }`}
          >
            Daftar
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleAuth} className="flex flex-col gap-4">

          {mode === 'register' && (
            <>
              <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase tracking-[0.2em] text-gray-400">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  placeholder="Nama kamu"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-200 text-[13px] outline-none focus:border-black transition-colors bg-white"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase tracking-[0.2em] text-gray-400">
                  Nomor WhatsApp
                </label>
                <input
                  type="tel"
                  placeholder="08xxxxxxxxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-200 text-[13px] outline-none focus:border-black transition-colors bg-white"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase tracking-[0.2em] text-gray-400">
                  Alamat Lengkap
                </label>
                <textarea
                  placeholder="Jalan, Kota, Provinsi"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 text-[13px] outline-none focus:border-black transition-colors bg-white resize-none"
                />
              </div>
            </>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-[9px] uppercase tracking-[0.2em] text-gray-400">Email</label>
            <input
              type="email"
              placeholder="email@kamu.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-200 text-[13px] outline-none focus:border-black transition-colors bg-white"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[9px] uppercase tracking-[0.2em] text-gray-400">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Min. 6 karakter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-200 text-[13px] outline-none focus:border-black transition-colors bg-white pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white py-4 text-[11px] font-bold uppercase tracking-[0.25em] transition-colors mt-2"
          >
            {loading ? 'Memproses...' : mode === 'login' ? 'Masuk' : 'Buat Akun'}
          </button>

        </form>

        {/* Switch mode */}
        <p className="text-[11px] text-gray-500 text-center mt-6">
          {mode === 'login' ? (
            <>
              Belum punya akun?{' '}
              <button
                onClick={() => setMode('register')}
                className="text-black font-semibold underline underline-offset-2"
              >
                Daftar sekarang
              </button>
            </>
          ) : (
            <>
              Sudah punya akun?{' '}
              <button
                onClick={() => setMode('login')}
                className="text-black font-semibold underline underline-offset-2"
              >
                Masuk
              </button>
            </>
          )}
        </p>

      </div>
    </div>
  );
}