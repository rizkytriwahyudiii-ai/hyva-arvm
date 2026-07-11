import { Eye, EyeOff } from "lucide-react";

export default function AuthModal({ type, onClose, handleAuth, loading, showPassword, setShowPassword, setStates }: any) {
  return (
    /* Gunakan h-screen w-full untuk menutupi layar penuh & flex untuk centering */
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm h-screen w-full">
      
      {/* Container modal */}
      <div className="bg-white p-8 rounded-2xl w-full max-w-md relative shadow-2xl my-auto">
        
        {/* Tombol Close */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-6 text-center">
          {type === "login" ? "MASUK" : "PENDAFTARAN AKUN"}
        </h2>
        <form onSubmit={handleAuth} className="flex flex-col gap-4">
          {type === "register" && (
            <>
              <input type="text" placeholder="Nama Lengkap" onChange={(e) => setStates.setFullName(e.target.value)} required className="w-full p-3 border rounded-lg text-sm" />
              <input type="tel" placeholder="Nomor WhatsApp" onChange={(e) => setStates.setPhone(e.target.value)} required className="w-full p-3 border rounded-lg text-sm" />
              <input type="text" placeholder="Alamat Lengkap" onChange={(e) => setStates.setAddress(e.target.value)} required className="w-full p-3 border rounded-lg text-sm" />
            </>
          )}
          <input type="email" placeholder="Email" onChange={(e) => setStates.setEmail(e.target.value)} required className="w-full p-3 border rounded-lg text-sm" />
          <div className="relative w-full">
            <input type={showPassword ? "text" : "password"} placeholder="Password" onChange={(e) => setStates.setPassword(e.target.value)} required className="w-full p-3 border rounded-lg text-sm pr-10" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-black">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <button disabled={loading} type="submit" className="w-full bg-black text-white py-3 rounded-lg font-semibold text-sm hover:bg-gray-800">
            {loading ? "Memproses..." : (type === "login" ? "MASUK" : "DAFTAR")}
          </button>
        </form>
      </div>
    </div>
  );
}