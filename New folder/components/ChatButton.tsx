import { FaWhatsapp } from 'react-icons/fa';

export default function ChatButton() {
  // Pesan yang ingin dikirimkan otomatis
  const waMessage = "Halo Admin, saya ingin bertanya mengenai produk Hyva Arvm.";
  // Mengubah pesan menjadi format URL yang aman
  const encodedMessage = encodeURIComponent(waMessage);
  const waUrl = `https://wa.me/6282245556161?text=${encodedMessage}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-[9999] flex items-center gap-2 bg-[#25D366] text-white p-3 md:px-4 md:py-2.5 rounded-full shadow-lg hover:bg-[#128C7E] transition-all duration-300 transform hover:scale-105 active:scale-95"
    >
      <FaWhatsapp size={20} />
      <div className="hidden md:flex flex-col">
        <span className="text-[9px] font-bold opacity-80 uppercase leading-none">Bantuan</span>
        <span className="font-bold text-[12px] leading-tight">Chat Admin</span>
      </div>
    </a>
  );
}