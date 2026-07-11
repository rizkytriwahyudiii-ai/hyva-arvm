'use client';
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "../lib/supabaseClient";
import { toast } from "react-hot-toast";
import { Eye, EyeOff, Search } from "lucide-react"; 

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState<"login" | "register" | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) fetchProfile(session.user.id);
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) fetchProfile(session.user.id);
      else setUser(null);
    });

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      subscription.unsubscribe();
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase.from("profiles").select("full_name").eq("id", userId).single();
    if (data) setUser(data);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsMenuOpen(false);
    window.location.reload();
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (authModal === "register") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName, phone, address } }
      });

      if (error) {
        toast.error(error.message.includes("already registered") ? "Email sudah terdaftar." : "Gagal Daftar: " + error.message);
      } else {
        toast.success("Pendaftaran berhasil! Silakan cek email Anda.");
        setAuthModal(null);
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast.error("Gagal Masuk: Email atau password salah.");
      } else {
        toast.success("Berhasil masuk!");
        setAuthModal(null);
        window.location.reload();
      }
    }
    setLoading(false);
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200/40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-10 w-10">
              <Image src={`${process.env.NEXT_PUBLIC_STORAGE_URL}logo-gradasi.png`} alt="Logo" fill className="object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-[15px] font-bold tracking-[0.15em] text-gray-900">HYVA ARVM</span>
              <span className="text-[9px] tracking-[0.2em] uppercase text-gray-500">Perfume House</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {[{ name: "SHOP", path: "/" }, { name: "WANITA", path: "/?category=wanita" }, { name: "PRIA", path: "/?category=pria" }, { name: "UNISEX", path: "/?category=unisex" }].map((item) => (
              <button key={item.name} onClick={() => window.location.href = item.path} className="text-[11px] font-medium tracking-[0.2em] text-gray-700 hover:text-black transition-all duration-300 relative group">
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-5">
            {/* Search Bar Baru */}
            <div className="hidden md:flex items-center bg-gray-50 rounded-full px-3 py-1.5 border border-gray-200 hover:border-gray-400 transition-all">
              <input type="text" placeholder="Cari parfum..." className="bg-transparent text-[10px] outline-none w-20 focus:w-32 transition-all duration-300 tracking-wider" />
              <Search size={14} className="text-gray-400 ml-1" />
            </div>

            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <div className="relative" ref={menuRef}>
                  <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[11px] font-bold text-black uppercase tracking-wider hover:underline">HI, {user.full_name} ▾</button>
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-3 w-40 bg-white border border-gray-100 rounded-xl shadow-xl py-2 flex flex-col">
                      <Link href="/profile" className="px-4 py-2 text-[11px] hover:bg-gray-50 font-semibold tracking-wider">UBAH PROFIL</Link>
                      <button onClick={handleLogout} className="px-4 py-2 text-[11px] text-red-600 hover:bg-gray-50 font-semibold tracking-wider text-left">LOGOUT</button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button onClick={() => setAuthModal("login")} className="text-[11px] font-semibold text-gray-700 hover:text-black">MASUK</button>
                  <button onClick={() => setAuthModal("register")} className="text-[11px] font-semibold text-white bg-black px-5 py-2 rounded-full hover:bg-gray-800">DAFTAR</button>
                </>
              )}
            </div>
            <Link href="/cart" className="relative text-lg">🛒</Link>
          </div>
        </div>
      </nav>

      {/* Modal Auth tetap sama */}
      {authModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl w-full max-w-md relative shadow-xl">
            <button onClick={() => setAuthModal(null)} className="absolute top-4 right-4 text-gray-400">✕</button>
            <h2 className="text-xl font-bold mb-6 text-center">{authModal === "login" ? "MASUK" : "PENDAFTARAN AKUN"}</h2>
            <form onSubmit={handleAuth} className="flex flex-col gap-4">
              {authModal === "register" && (
                <>
                  <input type="text" placeholder="Nama Lengkap" onChange={(e) => setFullName(e.target.value)} required className="w-full p-3 border rounded-lg text-sm" />
                  <input type="tel" placeholder="Nomor WhatsApp" onChange={(e) => setPhone(e.target.value)} required className="w-full p-3 border rounded-lg text-sm" />
                  <input type="text" placeholder="Alamat Lengkap" onChange={(e) => setAddress(e.target.value)} required className="w-full p-3 border rounded-lg text-sm" />
                </>
              )}
              <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required className="w-full p-3 border rounded-lg text-sm" />
              <div className="relative w-full">
                <input type={showPassword ? "text" : "password"} placeholder="Password" onChange={(e) => setPassword(e.target.value)} required className="w-full p-3 border rounded-lg text-sm pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-black">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <button disabled={loading} type="submit" className="w-full bg-black text-white py-3 rounded-lg font-semibold text-sm hover:bg-gray-800">{loading ? "Memproses..." : (authModal === "login" ? "MASUK" : "DAFTAR")}</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}