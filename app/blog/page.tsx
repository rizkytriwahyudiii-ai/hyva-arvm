'use client';
import Link from "next/link";
import { motion } from "framer-motion";

// Data artikel contoh (ini bisa nanti Anda ambil dari CMS atau database)
const blogPosts = [
  {
    id: 1,
    title: "Rahasia Wangi Parfum Bertahan Hingga 12 Jam",
    excerpt: "Temukan teknik aplikasi parfum yang tepat agar aroma favorit Anda tetap memikat sepanjang hari.",
    date: "27 Juni 2026",
    category: "Tips & Trick"
  },
  {
    id: 2,
    title: "Mengenal Kualitas Extrait de Parfum",
    excerpt: "Apa yang membedakan Extrait de Parfum dengan jenis wewangian lainnya? Simak penjelasan lengkapnya.",
    date: "20 Juni 2026",
    category: "Edukasi"
  },
  {
    id: 3,
    title: "Inspirasi Aroma untuk Kencan Pertama",
    excerpt: "Pilihan aroma yang elegan dan berkesan untuk menemani momen spesial Anda.",
    date: "15 Juni 2026",
    category: "Lifestyle"
  }
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Blog */}
        <div className="mb-16">
          <h1 className="text-[32px] font-light tracking-[0.2em] uppercase mb-4">Blog</h1>
          <p className="text-[12px] text-gray-500 uppercase tracking-[0.1em]">
            Temukan wawasan, tips, dan inspirasi dunia wewangian.
          </p>
        </div>

        {/* Grid Artikel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {blogPosts.map((post) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="h-64 bg-gray-100 mb-6 group-hover:bg-gray-200 transition-colors" />
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">
                {post.category}
              </span>
              <h2 className="text-[16px] font-bold mt-2 mb-3 leading-tight group-hover:underline">
                {post.title}
              </h2>
              <p className="text-[11px] text-gray-500 leading-relaxed mb-4">
                {post.excerpt}
              </p>
              <div className="text-[10px] text-gray-300 uppercase tracking-[0.1em]">
                {post.date}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  );
}