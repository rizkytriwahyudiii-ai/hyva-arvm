'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  const footerSections = [
    {
      title: "Navigasi",
      links: [
        { name: "Beranda", path: "/" },
        { name: "Produk", path: "/search" },
        { name: "Tentang", path: "/about" },
        { name: "Blog", path: "/blog" }
      ]
    },
    {
      title: "Layanan",
      links: [
        { name: "Hubungi Kami", path: "/layanan" }, 
      { name: "FAQ", path: "/layanan" },
      { name: "Pengiriman", path: "/layanan" },
      { name: "Return", path: "/layanan" }
      ]
    }
  ];

  return (
    <footer className="bg-black text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          {/* Brand Info */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="col-span-1 sm:col-span-2 lg:col-span-1"
          >
            <h3 className="text-[13px] font-bold tracking-[0.15em] uppercase mb-4">Hyva Arvm</h3>
            <p className="text-[10px] text-gray-400 leading-relaxed tracking-[0.05em] mb-6">
              Merek parfum premium dengan kualitas Extrait de Parfum. Longevity hingga 12 jam dengan aroma elegan.
            </p>
            <div className="flex gap-4">
              {[
                { name: "Instagram", href: "https://instagram.com/hyvaarvm" },
                { name: "Shopee", href: "https://shopee.co.id/hyvaarvm" },
                { name: "TikTok", href: "https://tiktok.com/@hyvaarvm" }
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-semibold text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  {social.name}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Sections */}
          {footerSections.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (idx + 1) }}
            >
              <h4 className="text-[11px] font-bold tracking-[0.15em] uppercase mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => {
                  const isBeranda = link.name === "Beranda";
                  const showScrollButton = isBeranda && isHomepage;

                  return (
                    <li key={`${section.title}-${link.name}`}>
                      {showScrollButton ? (
                        <button
                          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                          className="text-[10px] text-gray-400 hover:text-white transition-colors"
                        >
                          {link.name}
                        </button>
                      ) : (
                        <Link
                          href={link.path}
                          className="text-[10px] text-gray-400 hover:text-white transition-colors"
                        >
                          {link.name}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-[11px] font-bold tracking-[0.15em] uppercase mb-6">Newsletter</h4>
            <p className="text-[10px] text-gray-400 mb-4 leading-relaxed">
              Dapatkan penawaran eksklusif dan tips parfum.
            </p>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                aria-label="Email untuk newsletter"
                placeholder="Email Anda"
                className="bg-gray-900 text-white text-[11px] px-3 py-2.5 border border-gray-800 focus:border-white focus:outline-none transition-colors"
                required
              />
              <button
                type="submit"
                className="bg-white text-black text-[10px] font-bold py-2.5 hover:bg-gray-200 transition-colors"
              >
                SUBSCRIBE
              </button>
            </form>
          </motion.div>
        </div>

        <div className="border-t border-gray-800 pt-8" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] text-gray-500 tracking-[0.05em]"
        >
          <p>&copy; {currentYear} Hyva Arvm Perfume. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}