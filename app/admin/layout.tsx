import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Panel | Hyva Arvm',
  robots: { index: false, follow: false }, // Tidak boleh diindex Google
};

/**
 * Layout khusus admin — override layout root.
 * Tidak menyertakan Navbar, Footer, atau ChatButton dari layout utama.
 * Halaman admin berdiri sendiri.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
