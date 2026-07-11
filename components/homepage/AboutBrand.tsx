'use client';
import { motion } from 'framer-motion';

export default function AboutBrand() {
  const stats = [
    { value: '100+', label: 'Koleksi' },
    { value: '12 Jam', label: 'Ketahanan' },
    { value: '5000+', label: 'Pelanggan' },
  ];

  return (
    <section className="bg-[#F8F5F0] py-16 md:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* Kiri: Teks — fade up dari bawah */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[11px] uppercase tracking-[0.4em] text-gray-500">Our Story</span>
            <h2 className="mt-4 md:mt-6 text-3xl md:text-5xl font-serif text-black leading-tight">
              Crafted To Leave
              <br />
              <span className="italic font-light">A Lasting Impression</span>
            </h2>
            <motion.div
              className="h-[1px] bg-[#8B7355] my-6 md:my-8"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <p className="text-gray-600 leading-7 text-[13px] md:text-[14px]">
              Hyva Arvm menghadirkan parfum berkualitas tinggi yang terinspirasi dari fragrance dunia.
              Dirancang untuk memberikan aroma elegan, tahan lama, dan meningkatkan rasa percaya diri
              dalam setiap aktivitas.
            </p>

            {/* Stats — angka naik (count-up feel) lewat stagger fade */}
            <motion.div
              className="grid grid-cols-3 gap-4 mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
              }}
            >
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  }}
                >
                  <p className="text-xl md:text-2xl font-serif font-bold text-gray-900">{s.value}</p>
                  <p className="text-[9px] md:text-[10px] uppercase tracking-[0.1em] text-gray-500 mt-1">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Kanan: Visual — slide in dari kanan, desktop only */}
          <motion.div
            className="relative hidden md:block"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B7355]/8 rounded-full" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#8B7355]/5 rounded-full" />
            <div className="relative z-10 border border-[#8B7355]/20 p-10 bg-white/70 backdrop-blur-sm">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#8B7355] mb-6">Our Commitment</p>
              <div className="space-y-5">
                {[
                  { title: 'Extrait de Parfum', desc: 'Konsentrasi tinggi untuk ketahanan hingga 12 jam' },
                  { title: 'Inspired by World-Class', desc: 'Terinspirasi dari parfum mewah kelas dunia' },
                  { title: 'Premium Ingredients', desc: 'Bahan baku pilihan berkualitas tinggi' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  >
                    <div className="w-5 h-5 flex-shrink-0 border border-[#8B7355]/30 flex items-center justify-center mt-0.5">
                      <div className="w-1.5 h-1.5 bg-[#8B7355] rounded-full" />
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold text-gray-900">{item.title}</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}