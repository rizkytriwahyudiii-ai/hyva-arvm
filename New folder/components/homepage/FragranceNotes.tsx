'use client';
import { motion } from 'framer-motion';

export default function FragranceNotes() {
  const notes = [
    {
      label: 'Top Notes',
      desc: 'Citrus, Fruity, Fresh',
      detail: 'Kesan pertama yang segar — aroma yang langsung tercium saat parfum diaplikasikan.',
      svg: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
          <circle cx="32" cy="32" r="18" stroke="#8B7355" strokeWidth="1.5" />
          <circle cx="32" cy="32" r="10" stroke="#8B7355" strokeWidth="1" strokeDasharray="2 3" />
          <line x1="32" y1="8" x2="32" y2="14" stroke="#8B7355" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="32" y1="50" x2="32" y2="56" stroke="#8B7355" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="8" y1="32" x2="14" y2="32" stroke="#8B7355" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="50" y1="32" x2="56" y2="32" stroke="#8B7355" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      label: 'Heart Notes',
      desc: 'Floral, Jasmine, Rose',
      detail: 'Karakter utama parfum — bunga-bunga halus yang membentuk identitas aroma.',
      svg: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
          <path d="M32 50 C32 50 12 38 12 24 C12 17 17 12 24 12 C28 12 32 15 32 15 C32 15 36 12 40 12 C47 12 52 17 52 24 C52 38 32 50 32 50Z" stroke="#8B7355" strokeWidth="1.5" fill="none" />
        </svg>
      ),
    },
    {
      label: 'Base Notes',
      desc: 'Musk, Amber, Woody',
      detail: 'Fondasi aroma yang bertahan paling lama — hangat dan meninggalkan kesan mendalam.',
      svg: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
          <rect x="20" y="36" width="24" height="16" rx="1" stroke="#8B7355" strokeWidth="1.5" />
          <path d="M24 36 L24 28 C24 22 32 16 32 16 C32 16 40 22 40 28 L40 36" stroke="#8B7355" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[11px] uppercase tracking-[0.4em] text-gray-400">Fragrance Notes</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-serif text-gray-900">The Language Of Scent</h2>
          <p className="mt-3 text-[12px] text-gray-500 max-w-xs mx-auto leading-relaxed">
            Tiga lapisan aroma yang saling melengkapi.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {notes.map((note, i) => (
            <motion.div
              key={i}
              className="flex md:flex-col items-start md:items-center gap-5 md:gap-0 border border-gray-100 p-6 md:p-8 md:text-center"
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
              }}
              whileHover={{ borderColor: 'rgba(139,115,85,0.4)', y: -3 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 flex items-center justify-center border border-[#8B7355]/20 rounded-full md:mb-6"
                whileHover={{ scale: 1.08, rotate: 8 }}
                transition={{ duration: 0.3 }}
              >
                {note.svg}
              </motion.div>
              <div className="flex-1">
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#8B7355] mb-1">0{i + 1}</p>
                <h3 className="text-[14px] font-semibold text-gray-900 mb-1">{note.label}</h3>
                <p className="text-[11px] text-gray-500">{note.desc}</p>
                <div className="w-6 h-px bg-gray-200 my-3 md:mx-auto" />
                <p className="text-[11px] text-gray-400 leading-relaxed">{note.detail}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}