'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Footer from '@/components/Footer';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0F0F0F] text-white py-24 md:py-36 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-[10px] uppercase tracking-[0.45em] text-white/40 mb-5"
          >
            Our Story
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
        </div>
      </section>

      {/* Konten */}
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
            <p className="text-[14px] text-gray-600 leading-8">
              Kami meracik setiap botol dengan bahan Extrait de Parfum berkonsentrasi tinggi — memastikan aroma bertahan hingga 12 jam penuh, menemanimu dari pagi hingga malam.
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

      {/* Stats */}
      <section className="bg-[#F8F5F0] py-14">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-3 gap-8 text-center">
          {[
            { v: '100+', l: 'Koleksi Parfum' },
            { v: '12 Jam', l: 'Ketahanan Aroma' },
            { v: '5.000+', l: 'Pelanggan Puas' },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <p className="text-2xl md:text-4xl font-serif font-bold text-gray-900">{s.v}</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mt-1">{s.l}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center px-6">
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
