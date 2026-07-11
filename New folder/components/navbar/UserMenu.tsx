import Link from "next/link";

export default function UserMenu({ user, isMenuOpen, setIsMenuOpen, menuRef, handleLogout }: any) {
  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[11px] font-bold text-black uppercase tracking-wider hover:underline">
        HI, {user.full_name} ▾
      </button>
      {isMenuOpen && (
        <div className="absolute right-0 mt-3 w-40 bg-white border shadow-xl py-2 flex flex-col z-50">
          <Link href="/profile" className="px-4 py-2 text-[11px] hover:bg-gray-50 font-semibold tracking-wider">UBAH PROFIL</Link>
          <Link href="/account" className="px-4 py-2 text-[11px] hover:bg-gray-50 font-semibold tracking-wider">EDIT AKUN</Link>
          <Link href="/profile/alamat" className="px-4 py-2 text-[11px] hover:bg-gray-50 font-semibold tracking-wider">UBAH ALAMAT</Link>
          <div className="border-t my-1"></div>
          <button onClick={handleLogout} className="px-4 py-2 text-[11px] text-red-600 hover:bg-gray-50 font-semibold tracking-wider text-left">LOGOUT</button>
        </div>
      )}
    </div>
  );
}