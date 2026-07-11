'use client';

import { motion } from 'framer-motion';

export default function HeroSection() {
  const images = ['gambar1.jpg', 'gambar2.jpg', 'gambar3.jpg', 'gambar4.jpg'];
  const delayClasses = ['delay-0', 'delay-4s', 'delay-8s', 'delay-12s'];

  // Stagger anak-anak teks: judul -> deskripsi -> tombol muncul berurutan
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.18, delayChildren: 0.3 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="relative h-[90vh] sm:h-[80vh] w-full flex items-center justify-center bg-black overflow-hidden">
      {images.map((img, index) => (
        <img
          key={img}
          src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${img}`}
          alt="Hero background"
          className={`absolute inset-0 w-full h-full object-cover animate-fade ${delayClasses[index]} opacity-0 ${
            index === 3 ? 'object-[80%_50%] md:object-center' : 'object-center'
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.65)_100%)] z-10" />

      <motion.div
        className="relative z-20 text-center px-6 max-w-3xl mx-auto"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.span
          variants={item}
          className="font-sans text-[9px] md:text-[12px] tracking-[0.4em] text-white/80 uppercase mb-3 block"
        >
          Hyva Arvm Perfume
        </motion.span>

        <motion.h1
          variants={item}
          className="font-serif text-[38px] sm:text-[56px] md:text-8xl text-white tracking-tight leading-[0.9] mb-6 md:mb-8"
        >
          ELEVATE YOUR<br />SCENT
        </motion.h1>

        <motion.p
          variants={item}
          className="font-sans text-gray-300 text-[11px] md:text-base font-light mb-8 md:mb-10 tracking-[0.08em] max-w-sm mx-auto leading-relaxed border-t border-b border-white/20 py-4"
        >
          Inspired by world-class fragrances. Crafted with Extrait de Parfum quality for longevity up to 12 hours.
        </motion.p>

        <motion.div variants={item}>
          <motion.a
            href="#products"
            className="inline-block px-8 py-3 text-[10px] uppercase tracking-[0.25em] text-white border border-white"
            whileHover={{ backgroundColor: '#fff', color: '#000' }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.3 }}
          >
            Explore Collection
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator halus di bawah */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0], y: [0, 8, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-5 h-8 border border-white/40 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-1.5 bg-white/60 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}