'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { supabase } from '@/lib/supabaseClient';
import { Product } from '@/types';

import HeroSection from '@/components/HeroSection';
import ProductSection from '@/components/ProductSection';
import AboutBrand from '@/components/homepage/AboutBrand';
import FragranceNotes from '@/components/homepage/FragranceNotes';
import TestimonialSection from '@/components/homepage/TestimonialSection';
import Footer from '@/components/Footer';

function ProductList() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const category = searchParams.get('category') || '';
  const query = searchParams.get('q') || '';

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        let dbQuery = supabase.from('products').select('*');

        if (category && category !== 'Semua') {
          dbQuery = dbQuery.eq('category', category.toLowerCase());
        }

        if (query) {
          dbQuery = dbQuery.or(
            `name.ilike.%${query}%,description.ilike.%${query}%`
          );
        }

        const { data, error } = await dbQuery;
        if (error) throw error;
        setProducts(data || []);
      } catch (err) {
        console.error('[fetchProducts error]:', err);
        toast.error('Gagal memuat produk. Silakan refresh halaman.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [category, query]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 md:px-6 mt-8 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-100 animate-pulse" style={{ aspectRatio: '3/4' }} />
          ))}
        </div>
      </div>
    );
  }

  // Halaman hasil pencarian / filter kategori
  if (query || category) {
    return (
      <ProductSection
        title={query ? `Hasil: "${query}"` : `Koleksi ${category}`}
        products={products}
      />
    );
  }

  // Homepage utama — tampilkan per kategori
  return (
    <>
      <ProductSection
        title="Signature Collection"
        products={products.slice(0, 4)}
        categoryFilter="signature"
      />

      <ProductSection
        title="For Her"
        products={products.filter(
          (p: Product) => p.category?.toLowerCase() === 'wanita'
        ).slice(0, 4)}
        categoryFilter="wanita"
      />

      <ProductSection
        title="For Him"
        products={products.filter(
          (p: Product) => p.category?.toLowerCase() === 'pria'
        ).slice(0, 4)}
        categoryFilter="pria"
      />

      <ProductSection
        title="Unisex Collection"
        products={products.filter(
          (p: Product) => p.category?.toLowerCase() === 'unisex'
        ).slice(0, 4)}
        categoryFilter="unisex"
      />
    </>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <div id="products">
        <Suspense
          fallback={
            <div className="text-center py-20 text-[12px] text-gray-400">
              Memuat koleksi...
            </div>
          }
        >
          <ProductList />
        </Suspense>
      </div>

      <AboutBrand />
      <FragranceNotes />
      <TestimonialSection />
      <Footer />
    </>
  );
}
