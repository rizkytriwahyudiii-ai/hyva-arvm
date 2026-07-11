'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Footer from '@/components/Footer';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

export default function AboutPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative bg-[#0F0F0F] text-white py-28 md:py-40 px-6 overflow-hidden">
        {/* Ambient texture — large faded wordmark, signature detail rather than decoration */}
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
        >
          <span className="font-serif text-[22vw] md:text-[16vw] leading-none text-white/[0.025] whitespace-nowrap">
            HYVA ARVM
          </span>
        </div>

        <div className="relative max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-[10px] uppercase tracking-[0.45em] text-white/40 mb-5"
          >
            Est. 2023 — Mojokerto, Indonesia
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif leading-tight"
          >
            Crafted To Leave<br />
            <span className="italic font-light text-white/70">A Lasting Impression</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[12px] md:text-[13px] text-white/50 leading-relaxed mt-7 max-w-md mx-auto"
          >
            Parfum Extrait de Parfum buatan Indonesia, diracik untuk bertahan
            sepanjang hari — dari pagi yang sibuk hingga malam yang panjang.
          </motion.p>
        </div>
      </section>

      {/* ============ TENTANG + FILOSOFI ============ */}
      <section className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            <p className="text-[10px] uppercase tracking-[0.35em] text-gray-400 mb-5">Tentang Kami</p>
            <p className="text-[14px] text-gray-600 leading-8 mb-6">
              Hyva Arvm lahir dari satu keyakinan: setiap orang berhak menikmati aroma berkelas tanpa harus merogoh kocek untuk parfum original.
            </p>
            <p className="text-[14px] text-gray-600 leading-8 mb-6">
              Kami meracik setiap botol dengan bahan Extrait de Parfum berkonsentrasi tinggi — memastikan aroma bertahan hingga 12 jam penuh, menemanimu dari pagi hingga malam.
            </p>
            <p className="text-[14px] text-gray-600 leading-8">
              Berbasis di Mojokerto, setiap batch diformulasikan dan diuji ulang secara manual sebelum dikirim ke tanganmu — bukan produksi massal tanpa kendali kualitas.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.15 }}
          >
            <p className="text-[10px] uppercase tracking-[0.35em] text-gray-400 mb-5">Filosofi</p>
            <div className="space-y-6">
              {[
                { n: '01', title: 'Inspired', desc: 'Setiap koleksi terinspirasi dari fragrance dunia terbaik — diadaptasi untuk iklim tropis Indonesia.' },
                { n: '02', title: 'Crafted', desc: 'Konsentrasi Extrait de Parfum dipilih untuk ketahanan maksimal, bukan sekadar keharuman sesaat.' },
                { n: '03', title: 'Elevated', desc: 'Parfum bukan sekadar aroma — ia adalah bagian dari kepribadian dan cara kamu hadir di dunia.' },
              ].map(item => (
                <div key={item.n} className="flex gap-5 items-start border-b border-gray-100 pb-6 last:border-0">
                  <span className="text-[10px] text-gray-300 tracking-widest mt-0.5 w-5 shrink-0">{item.n}</span>
                  <div>
                    <p className="text-[13px] font-semibold text-gray-900 mb-1">{item.title}</p>
                    <p className="text-[12px] text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ EXTRAIT DE PARFUM — KEDALAMAN PRODUK ============ */}
      <section className="bg-white border-t border-gray-100 py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-[10px] uppercase tracking-[0.35em] text-gray-400 mb-4">Mengapa Extrait de Parfum</p>
            <h2 className="text-2xl md:text-3xl font-serif text-gray-900 max-w-lg mx-auto leading-snug">
              Konsentrasi Tertinggi, Ketahanan Terlama
            </h2>
          </motion.div>

          {/* Comparison bar — concentration is the real differentiator, so show it as a measured scale, not a generic feature grid */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="space-y-5 max-w-2xl mx-auto"
          >
            {[
              { label: 'Eau de Cologne', pct: 4, hrs: '2 jam', active: false },
              { label: 'Eau de Toilette', pct: 12, hrs: '4–5 jam', active: false },
              { label: 'Eau de Parfum', pct: 18, hrs: '6–8 jam', active: false },
              { label: 'Extrait de Parfum — Hyva Arvm', pct: 30, hrs: '10–12 jam', active: true },
            ].map((row) => (
              <motion.div key={row.label} variants={fadeUp} className="flex items-center gap-4">
                <span
                  className={`text-[11px] w-44 md:w-52 shrink-0 ${
                    row.active ? 'font-bold text-gray-900' : 'text-gray-500'
                  }`}
                >
                  {row.label}
                </span>
                <div className="flex-1 h-[6px] bg-gray-100 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${row.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className={row.active ? 'h-full bg-black' : 'h-full bg-gray-300'}
                  />
                </div>
                <span
                  className={`text-[10px] w-16 text-right shrink-0 tracking-wide ${
                    row.active ? 'text-gray-900 font-semibold' : 'text-gray-400'
                  }`}
                >
                  {row.hrs}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[11px] text-gray-400 text-center mt-8 max-w-md mx-auto leading-relaxed"
          >
            Persentase merujuk pada kadar minyak wangi (fragrance oil) dalam komposisi. Semakin tinggi kadarnya, semakin lama aroma menempel di kulit.
          </motion.p>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="bg-[#F8F5F0] py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 text-center">
          {[
            { v: '100+', l: 'Koleksi Parfum' },
            { v: '12 Jam', l: 'Ketahanan Aroma' },
            { v: '5.000+', l: 'Pelanggan Puas' },
            { v: '4.8/5', l: 'Rating Ulasan' },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <p className="text-2xl md:text-4xl font-serif font-bold text-gray-900">{s.v}</p>
              <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-gray-400 mt-1">{s.l}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============ PERJALANAN BRAND ============ */}
      <section className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-[10px] uppercase tracking-[0.35em] text-gray-400 mb-4">Perjalanan Kami</p>
          <h2 className="text-2xl md:text-3xl font-serif text-gray-900">Dari Botol Pertama Hingga Kini</h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="relative"
        >
          {/* vertical rule connecting the milestones — order here is genuinely chronological */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gray-200 md:left-1/2" />

          <div className="space-y-10">
            {[
              { year: '2023', title: 'Titik Mula', desc: 'Hyva Arvm dimulai dari dapur rumah di Mojokerto, meracik tiga varian pertama untuk kalangan terbatas.' },
              { year: '2024', title: 'Ekspansi Koleksi', desc: 'Lini produk tumbuh menjadi lebih dari 50 varian, mencakup kategori Wanita, Pria, dan Unisex.' },
              { year: '2025', title: 'Hadir Secara Daring', desc: 'Toko resmi daring diluncurkan, membawa Hyva Arvm menjangkau pelanggan di seluruh Indonesia.' },
              { year: '2026', title: 'Hari Ini', desc: 'Lebih dari 100 koleksi aktif dan ribuan pelanggan setia — dengan komitmen kualitas yang sama seperti botol pertama.' },
            ].map((item, i) => (
              <motion.div
                key={item.year}
                variants={fadeUp}
                className={`relative flex flex-col md:flex-row gap-4 md:gap-10 ${
                  i % 2 === 1 ? 'md:flex-row-reverse text-left md:text-right' : 'text-left'
                }`}
              >
                <div className={`md:w-1/2 ${i % 2 === 1 ? 'md:text-left' : 'md:text-right'}`}>
                  {i % 2 === 0 && (
                    <>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400">{item.year}</span>
                      <p className="text-[14px] font-semibold text-gray-900 mt-1">{item.title}</p>
                      <p className="text-[12px] text-gray-500 leading-relaxed mt-1.5 md:max-w-sm md:ml-auto">{item.desc}</p>
                    </>
                  )}
                </div>

                <span className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0.5 w-3.5 h-3.5 rounded-full bg-black border-4 border-[#F8F5F0]" />

                <div className="md:w-1/2 pl-8 md:pl-0">
                  {i % 2 === 1 && (
                    <>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400">{item.year}</span>
                      <p className="text-[14px] font-semibold text-gray-900 mt-1">{item.title}</p>
                      <p className="text-[12px] text-gray-500 leading-relaxed mt-1.5 md:max-w-sm">{item.desc}</p>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ============ KOMITMEN KAMI ============ */}
      <section className="bg-[#0F0F0F] text-white py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/40 mb-4">Komitmen Kami</p>
            <h2 className="text-2xl md:text-3xl font-serif">Standar yang Kami Jaga di Setiap Botol</h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10"
          >
            {[
              { title: 'Cruelty-Free', desc: 'Tidak ada bahan yang diuji pada hewan dalam proses formulasi kami.' },
              { title: 'Diracik Lokal', desc: 'Diformulasikan dan dikemas langsung di Mojokerto, mendukung industri dalam negeri.' },
              { title: 'Kontrol Kualitas Manual', desc: 'Setiap batch diperiksa aroma dan kejernihannya sebelum lolos kemas.' },
            ].map((item) => (
              <motion.div key={item.title} variants={fadeUp} className="text-center sm:text-left">
                <div className="w-8 h-px bg-white/30 mb-4 mx-auto sm:mx-0" />
                <p className="text-[13px] font-semibold mb-2">{item.title}</p>
                <p className="text-[12px] text-white/50 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-20 md:py-28 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400 mb-4">Mulai Perjalananmu</p>
          <h2 className="text-2xl md:text-4xl font-serif text-gray-900 mb-8">
            Temukan Aroma yang Menjadi Dirimu
          </h2>
          <Link
            href="/"
            className="inline-block px-10 py-4 bg-black text-white text-[10px] uppercase tracking-[0.25em] hover:bg-gray-800 transition-colors"
          >
            Lihat Koleksi
          </Link>
        </motion.div>
      </section>

      <Footer />
    </>
  );
}