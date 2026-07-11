'use client';
import { motion } from 'framer-motion';

export default function AboutBrand() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="bg-[#F9F8F6] py-16 md:py-20 lg:py-28 px-4 sm:px-6">
      <motion.div
        className="max-w-3xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        {/* Label */}
        <motion.span
          variants={itemVariants}
          className="inline-block text-[8px] sm:text-[10px] uppercase tracking-[0.4em] text-gray-500 font-medium mb-4 sm:mb-6"
        >
          Our Story
        </motion.span>

        {/* Heading */}
        <motion.h2
          variants={itemVariants}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 leading-tight mb-6 sm:mb-8"
        >
          Crafted To Leave<br className="hidden sm:block" />
          A Lasting Impression
        </motion.h2>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          className="w-12 h-1 bg-black mx-auto mb-8 sm:mb-10"
        />

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-[11px] sm:text-[12px] md:text-[13px] text-gray-600 leading-relaxed tracking-[0.02em] max-w-2xl mx-auto"
        >
          Hyva Arvm menghadirkan parfum berkualitas tinggi yang terinspirasi dari fragrance dunia. 
          Dirancang dengan Extrait de Parfum concentration untuk memberikan aroma elegan, tahan lama 
          hingga 12 jam, dan meningkatkan rasa percaya diri dalam setiap aktivitas.
        </motion.p>

        {/* Features */}
        <motion.div
          variants={itemVariants}
          className="mt-10 sm:mt-12 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 pt-8 sm:pt-10 border-t border-gray-200"
        >
          {[
            { label: "Quality", value: "Extrait de Parfum" },
            { label: "Longevity", value: "12 Hours" },
            { label: "Origin", value: "Premium Grade" }
          ].map((feature, idx) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
              className="text-center"
            >
              <p className="text-[9px] text-gray-500 uppercase tracking-[0.15em] font-medium mb-2">
                {feature.label}
              </p>
              <p className="text-[12px] sm:text-[13px] font-bold text-gray-900">
                {feature.value}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}