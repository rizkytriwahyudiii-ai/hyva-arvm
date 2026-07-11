'use client';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function TestimonialSection() {
  const testimonials = [
    {
      name: "Aulia",
      text: "Wanginya tahan lama dan mirip parfum original.",
      rating: 5
    },
    {
      name: "Dian",
      text: "Packaging rapi dan aromanya premium.",
      rating: 5
    },
    {
      name: "Rizal",
      text: "Harga terjangkau tapi kualitas di atas ekspektasi.",
      rating: 5
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section className="bg-black text-white py-16 md:py-24 lg:py-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-[8px] sm:text-[10px] uppercase tracking-[0.4em] text-gray-400 font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight">
            Loved By Our Customers
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8 rounded-lg hover:border-gray-600 transition-all duration-300"
              whileHover={{ y: -4 }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                  >
                    <Star
                      size={14}
                      fill="currentColor"
                      className="text-yellow-400"
                      strokeWidth={0}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-300 text-[11px] sm:text-[12px] leading-relaxed mb-6 min-h-[48px] tracking-[0.01em]">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="pt-6 border-t border-gray-800">
                <p className="text-[11px] font-bold text-white uppercase tracking-[0.15em]">
                  {testimonial.name}
                </p>
                <p className="text-[9px] text-gray-500 uppercase tracking-[0.1em] mt-1">
                  Verified Customer
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12 sm:mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-[10px] text-gray-400 uppercase tracking-[0.15em] mb-4">
            Join thousands of satisfied customers
          </p>
          <motion.a
            href="#products"
            className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] text-white border border-white px-6 py-3 hover:bg-white hover:text-black transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Shop Now
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}