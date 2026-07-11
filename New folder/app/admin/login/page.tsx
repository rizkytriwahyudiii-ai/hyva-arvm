'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 10 * 60 * 1000;
const STORAGE_KEY = 'admin_login_attempts';

interface AttemptData { count: number; firstAttempt: number; }

function getAttempts(): AttemptData {
  try { return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}'); }
  catch { return { count: 0, firstAttempt: Date.now() }; }
}
function saveAttempts(d: AttemptData) {
  try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(d)); } catch {}
}
function clearAttempts() {
  try { sessionStorage.removeItem(STORAGE_KEY); } catch {}
}

/**
 * Cek admin dengan 3 strategi berlapis:
 * 1. rpc('is_admin')     — function yang sudah ada di DB kamu
 * 2. rpc('get_my_role')  — function baru yang kita buat
 * 3. query profiles      — fallback langsung ke tabel
 */
async function checkIsAdmin(): Promise<boolean> {
  // Strategi 1: is_admin() — sudah ada di DB
  try {
    const { data, error } = await supabase.rpc('is_admin');
    if (!error) {
      console.log('[admin] is_admin() =', data);
      return data === true;
    }
    console.warn('[admin] is_admin error:', error.message);
  } catch (e) { console.warn('[admin] is_admin exception:', e); }

  // Strategi 2: get_my_role()
  try {
    const { data, error } = await supabase.rpc('get_my_role');
    if (!error) {
      console.log('[admin] get_my_role() =', data);
      return data === 'admin';
    }
    console.warn('[admin] get_my_role error:', error.message);
  } catch (e) { console.warn('[admin] get_my_role exception:', e); }

  // Strategi 3: query profiles langsung
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;
    const { data, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    if (!error && data) {
      console.log('[admin] profiles.role =', data.role);
      return data.role === 'admin';
    }
    console.warn('[admin] profiles query error:', error?.message);
  } catch (e) { console.warn('[admin] profiles exception:', e); }

  return false;
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lockedOut, setLockedOut] = useState(false);
  const [lockCountdown, setLockCountdown] = useState(0);
  const [checkingSession, setCheckingSession] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-redirect jika sudah login sebagai admin
  useEffect(() => {
    const check = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const isAdmin = await checkIsAdmin();
          if (isAdmin) { router.replace('/admin'); return; }
        }
      } catch {}
      setCheckingSession(false);
    };
    check();
  }, [router]);

  // Cek lockout saat mount
  useEffect(() => {
    const d = getAttempts();
    const elapsed = Date.now() - (d.firstAttempt || Date.now());
    if (d.count >= MAX_ATTEMPTS && elapsed < LOCKOUT_MS) {
      const remaining = Math.ceil((LOCKOUT_MS - elapsed) / 1000);
      setLockedOut(true);
      setLockCountdown(remaining);
      startCountdown(remaining);
    }
  }, []);

  const startCountdown = (seconds: number) => {
    let s = seconds;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      s -= 1;
      setLockCountdown(s);
      if (s <= 0) { clearInterval(timerRef.current!); setLockedOut(false); clearAttempts(); }
    }, 1000);
  };

  const formatCountdown = (s: number) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const recordFailed = () => {
    const d = getAttempts();
    const elapsed = Date.now() - (d.firstAttempt || Date.now());
    const nd: AttemptData = {
      count: elapsed > LOCKOUT_MS ? 1 : (d.count || 0) + 1,
      firstAttempt: elapsed > LOCKOUT_MS ? Date.now() : (d.firstAttempt || Date.now()),
    };
    saveAttempts(nd);
    return nd.count;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockedOut || loading) return;

    // Cek lockout
    const d = getAttempts();
    const elapsed = Date.now() - (d.firstAttempt || Date.now());
    if (d.count >= MAX_ATTEMPTS && elapsed < LOCKOUT_MS) {
      const remaining = Math.ceil((LOCKOUT_MS - elapsed) / 1000);
      setLockedOut(true); setLockCountdown(remaining); startCountdown(remaining);
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Step 1: Sign in
      const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (signInError || !authData?.user) {
        const count = recordFailed();
        const remaining = MAX_ATTEMPTS - count;
        if (remaining <= 0) {
          setLockedOut(true);
          const lockSec = Math.ceil(LOCKOUT_MS / 1000);
          setLockCountdown(lockSec);
          startCountdown(lockSec);
          setError('Terlalu banyak percobaan. Coba lagi dalam 10 menit.');
        } else {
          setError(`Email atau password salah. Sisa ${remaining} percobaan.`);
        }
        return;
      }

      // Step 2: Cek role (3 strategi)
      const isAdmin = await checkIsAdmin();

      if (!isAdmin) {
        await supabase.auth.signOut();
        recordFailed();
        setError('Akun ini tidak memiliki akses admin.');
        return;
      }

      // Berhasil
      clearAttempts();
      router.replace('/admin');

    } catch (err: any) {
      console.error('[admin-login] unexpected:', err);
      setError('Terjadi kesalahan: ' + (err?.message || 'coba lagi.'));
    } finally {
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <div className="fixed inset-0 bg-slate-950 flex items-center justify-center z-[9999]">
        <Loader2 size={20} className="animate-spin text-slate-500" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-950 flex items-center justify-center px-4 z-[9999]">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-700 rounded-xl mb-5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
            </svg>
          </div>
          <p className="text-[11px] uppercase tracking-[0.35em] text-slate-400 mb-1">Admin Panel</p>
          <p className="text-xl font-bold text-white">Hyva Arvm</p>
          <p className="text-[11px] text-slate-500 mt-1">Akses terbatas — hanya untuk admin</p>
        </div>

        {/* Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          {lockedOut ? (
            <div className="text-center py-4">
              <p className="text-red-400 font-semibold text-sm mb-2">Akses Diblokir Sementara</p>
              <p className="text-slate-400 text-[12px] mb-5">Coba lagi dalam:</p>
              <div className="text-3xl font-mono font-bold text-white mb-5">{formatCountdown(lockCountdown)}</div>
              <p className="text-[11px] text-slate-500">Hubungi developer jika ini bukan kamu.</p>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-5">
              {error && (
                <div className="bg-red-900/30 border border-red-800/50 rounded-lg px-4 py-3">
                  <p className="text-[12px] text-red-400 leading-relaxed">{error}</p>
                </div>
              )}

              <div>
                <label className="block text-[9px] uppercase tracking-[0.25em] text-slate-400 mb-2">Email Admin</label>
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  required autoComplete="username" placeholder="admin@hyvaarvm.com"
                  className="w-full bg-slate-800 border border-slate-700 text-white text-[13px] px-4 py-3 rounded-lg outline-none focus:border-amber-600 transition-colors placeholder:text-slate-600"
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase tracking-[0.25em] text-slate-400 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'} value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required autoComplete="current-password" placeholder="••••••••"
                    className="w-full bg-slate-800 border border-slate-700 text-white text-[13px] px-4 py-3 pr-12 rounded-lg outline-none focus:border-amber-600 transition-colors placeholder:text-slate-600"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-amber-700 hover:bg-amber-600 disabled:bg-slate-700 disabled:text-slate-500 text-white py-3.5 rounded-lg text-[11px] font-bold uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2 mt-2">
                {loading
                  ? <><Loader2 size={14} className="animate-spin" /> Memverifikasi...</>
                  : 'Masuk ke Panel Admin'
                }
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-[10px] text-slate-600 mt-6">
          Bukan admin?{' '}
          <a href="/" className="text-slate-500 hover:text-slate-300 underline">Kembali ke toko</a>
        </p>
      </div>
    </div>
  );
}