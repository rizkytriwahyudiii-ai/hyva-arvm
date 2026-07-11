'use client';
import { motion } from 'framer-motion';

export default function TestimonialSection() {
  const testimonials = [
    {
      name: 'Aulia',
      location: 'Surabaya',
      rating: 5,
      text: 'Wanginya tahan lama dan mirip parfum original. Udah order 3x dan selalu puas!',
      product: 'Inspired by YSL Libre',
    },
    {
      name: 'Dian',
      location: 'Jakarta',
      rating: 5,
      text: 'Packaging rapi dan aromanya benar-benar premium. Banyak yang nanya parfum apa yang aku pakai.',
      product: 'Inspired by Aqua Kiss',
    },
    {
      name: 'Rizal',
      location: 'Bandung',
      rating: 5,
      text: 'Harga terjangkau tapi kualitas di atas ekspektasi. Recommended banget buat yang mau coba luxury scent.',
      product: 'Inspired by Dunhill Blue',
    },
  ];

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="bg-[#0F0F0F] text-white py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[11px] uppercase tracking-[0.4em] text-white/40">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-serif mt-4 leading-tight">
              Loved By Our
              <br />
              <span className="italic font-light text-white/70">Customers</span>
            </h2>
          </motion.div>

          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  className="text-[#8B7355] text-lg"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.3, ease: 'backOut' }}
                >
                  ★
                </motion.span>
              ))}
            </div>
            <p className="text-[12px] text-white/50">5.0 dari ribuan pelanggan</p>
          </motion.div>
        </div>

        {/* Cards — stagger masuk satu-satu */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariant}
              whileHover={{ y: -6, backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.15)' }}
              transition={{ duration: 0.3 }}
              className="border border-white/8 bg-white/3 p-8 flex flex-col"
            >
              {/* Rating bintang — pop in stagger tiap card kena hover-in-view */}
              <div className="flex gap-0.5 mb-5">
                {[...Array(item.rating)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="text-[#8B7355] text-sm"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.06, duration: 0.25 }}
                  >
                    ★
                  </motion.span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-white/75 leading-7 text-[13px] flex-grow mb-6">
                &ldquo;{item.text}&rdquo;
              </p>

              {/* Divider — menggambar dari kiri */}
              <motion.div
                className="h-px bg-white/8 mb-5"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              />

              {/* Author */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[12px] font-semibold tracking-wide uppercase text-white">{item.name}</p>
                  <p className="text-[10px] text-white/40 mt-0.5">{item.location}</p>
                </div>
                <p className="text-[9px] uppercase tracking-[0.15em] text-[#8B7355] text-right max-w-[120px] leading-relaxed">
                  {item.product}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}