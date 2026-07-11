'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LayananPage() {
  const [activeTab, setActiveTab] = useState('Hubungi Kami');

  const sections = {
    'Hubungi Kami': {
      content: "Kami siap membantu Anda. Silakan hubungi admin kami melalui WhatsApp di +62 812-xxxx-xxxx atau email ke support@hyvaarvm.com."
    },
    'FAQ': {
      content: "Apakah parfum ini tahan lama? Ya, Extrait de Parfum kami dirancang untuk bertahan hingga 12 jam. Bagaimana cara melacak pesanan? Anda akan menerima email notifikasi dengan nomor resi setelah pesanan dikirim."
    },
    'Pengiriman': {
      content: "Kami melayani pengiriman ke seluruh Indonesia menggunakan jasa kurir terpercaya. Estimasi pengiriman 2-5 hari kerja tergantung lokasi Anda."
    },
    'Return': {
      content: "Kebijakan pengembalian berlaku maksimal 2 hari setelah barang diterima, dengan syarat menyertakan video unboxing yang jelas."
    }
  };

  return (
    <main className="min-h-screen bg-white pt-20 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header dengan garis pembatas tipis */}
        <div className="border-b border-gray-200 pb-12 mb-16 text-center">
          <h1 className="text-[28px] font-light tracking-[0.3em] uppercase text-gray-900">Pusat Layanan</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-20">
          {/* Sidebar Navigasi - Dibuat lebih tegas */}
          <div className="w-full md:w-1/4 space-y-8">
            {Object.keys(sections).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`block w-full text-left text-[12px] uppercase tracking-[0.2em] transition-all duration-300 border-l-2 pl-6 ${
                  activeTab === tab 
                    ? 'text-black font-bold border-black' 
                    : 'text-gray-300 hover:text-gray-900 border-transparent hover:border-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Konten Aktif - Diberi padding dan tipografi yang lebih nyaman */}
          <div className="w-full md:w-3/4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-[20px] font-light uppercase tracking-[0.1em] mb-8 text-gray-900">
                  {activeTab}
                </h2>
                <div className="text-[14px] text-gray-500 leading-loose max-w-xl">
                  {sections[activeTab as keyof typeof sections].content}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}