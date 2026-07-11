'use client';
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "react-hot-toast";
import SearchBar from "./SearchBar";
import AuthModal from "./AuthModal";
import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";
import { useCartStore } from "@/lib/store"; 
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState<"login" | "register" | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { cart } = useCartStore();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        fetchProfile(session.user.id);
        await useCartStore.getState().loadCart();
      }
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        fetchProfile(session.user.id);
        await useCartStore.getState().loadCart();
      } else {
        setUser(null);
        useCartStore.setState({ cart: [] });
      }
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
    useCartStore.setState({ cart: [] });
    localStorage.removeItem('cart-storage');
    await supabase.auth.signOut();
    setIsMenuOpen(false);
    setIsMobileMenuOpen(false);
    window.location.href = '/';
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (authModal === "register") {
      const { error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName, phone, address } } });
      if (error) toast.error(error.message.includes("already registered") ? "Email sudah terdaftar." : "Gagal Daftar: " + error.message);
      else { toast.success("Pendaftaran berhasil!"); setAuthModal(null); }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) toast.error("Gagal Masuk: Email atau password salah.");
      else { toast.success("Berhasil masuk!"); setAuthModal(null); window.location.reload(); }
    }
    setLoading(false);
  };

  return (
    <nav className="fixed top-0 w-full z-[100] bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-10 w-10">
            <Image src={`${process.env.NEXT_PUBLIC_STORAGE_URL}logo-gradasi.png`} alt="Logo" fill className="object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-[15px] font-bold tracking-[0.15em] text-gray-900 leading-tight">HYVA ARVM</span>
            <span className="text-[9px] tracking-[0.2em] uppercase text-gray-500 leading-tight">PERFUME</span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          <NavLinks className="text-[11px] font-medium tracking-[0.2em] text-gray-700 hover:text-black transition-all relative group" />
        </div>

        <div className="flex items-center gap-4">
          <SearchBar />

          {/* Tombol Keranjang — icon "bounce" tiap kali totalItems berubah,
              badge angka pop-in/out dengan AnimatePresence saat 0 <-> >0 */}
          <Link href="/cart" className="relative p-2 text-lg flex items-center">
            <motion.div
              key={totalItems}
              initial={{ scale: 1 }}
              animate={totalItems > 0 ? { scale: [1, 1.25, 1] } : {}}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <ShoppingCart size={20} />
            </motion.div>
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  key="badge"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'backOut' }}
                  className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-1">☰</button>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <UserMenu user={user} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} menuRef={menuRef} handleLogout={handleLogout} />
            ) : (
              <>
                <button onClick={() => setAuthModal("login")} className="text-[11px] font-semibold text-gray-700 hover:text-black">MASUK</button>
                <motion.button
                  onClick={() => setAuthModal("register")}
                  whileTap={{ scale: 0.95 }}
                  className="text-[11px] font-semibold text-white bg-black px-5 py-2 rounded-full hover:bg-gray-800"
                >
                  DAFTAR
                </motion.button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu — slide in dari kanan + overlay fade */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[120]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="absolute top-0 right-0 w-[85%] h-full bg-white p-8 shadow-2xl flex flex-col overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-[14px] font-bold text-gray-400 tracking-[0.2em] uppercase">Menu</h2>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-2xl">✕</button>
              </div>
              <div className="flex flex-col gap-2">
                <NavLinks onClick={() => setIsMobileMenuOpen(false)} className="text-[15px] font-bold tracking-widest border-b pb-2" />
                <div className="pt-4 flex flex-col gap-2">
                  {user ? (
                    <>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">HI, {user.full_name}</p>
                      <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold border-b pb-2">UBAH PROFIL</Link>
                      <Link href="/account" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold border-b pb-2">EDIT AKUN</Link>
                      <Link href="/profile/alamat" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold border-b pb-2">UBAH ALAMAT</Link>
                      <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="text-sm font-bold text-red-600 text-left pt-2">LOGOUT</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => { setAuthModal("login"); setIsMobileMenuOpen(false); }} className="text-sm font-bold text-left py-2 border-b">MASUK</button>
                      <button onClick={() => { setAuthModal("register"); setIsMobileMenuOpen(false); }} className="text-sm font-bold text-left py-2 border-b">DAFTAR</button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {authModal && (
        <AuthModal type={authModal} onClose={() => setAuthModal(null)} handleAuth={handleAuth} loading={loading} showPassword={showPassword} setShowPassword={setShowPassword} setStates={{ setFullName, setPhone, setAddress, setEmail, setPassword }} />
      )}
    </nav>
  );
}