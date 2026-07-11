import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import Navbar from '@/components/navbar/navbar';
import PageTransition from '@/components/PageTransition';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Script from 'next/script';
import ChatButton from '@/components/ChatButton';

const playfair = Playfair_Display({ variable: '--font-serif', subsets: ['latin'] });
const inter = Inter({ variable: '--font-sans', subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Hyva Arvm | Luxury Inspired Fragrance',
    template: '%s | Hyva Arvm',
  },
  description:
    'Parfum berkualitas tinggi terinspirasi dari fragrance dunia. Extrait de Parfum — ketahanan hingga 12 jam.',
  keywords: ['parfum', 'hyva arvm', 'parfum inspired', 'extrait de parfum', 'parfum tahan lama'],
  openGraph: {
    title: 'Hyva Arvm | Luxury Inspired Fragrance',
    description: 'Temukan koleksi parfum premium Hyva Arvm. Inspired by world-class fragrances.',
    type: 'website',
    locale: 'id_ID',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${playfair.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900 font-sans">
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#000',
              color: '#fff',
              borderRadius: '8px',
              fontSize: '12px',
              padding: '12px 20px',
            },
          }}
        />
        <Navbar />
        <main className="flex-grow w-full pt-20">
          <PageTransition>{children}</PageTransition>
        </main>
        <ChatButton />
        <Script
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
