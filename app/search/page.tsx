'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import ProductCard from '@/components/ProductCard';
import { Search } from 'lucide-react';

const IconFilter = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="21" y1="4" x2="14" y2="4"/><line x1="10" y1="4" x2="3" y2="4"/>
    <line x1="21" y1="12" x2="12" y2="12"/><line x1="8" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="20" x2="16" y2="20"/><line x1="12" y1="20" x2="3" y2="20"/>
    <line x1="14" y1="2" x2="14" y2="6"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="16" y1="18" x2="16" y2="22"/>
  </svg>
);

const CATEGORIES = ['Semua', 'Signature', 'Wanita', 'Pria', 'Unisex'];

function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Semua');

  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';

  useEffect(() => {
    if (category) {
      const matched = CATEGORIES.find(c => c.toLowerCase() === category.toLowerCase());
      if (matched) setActiveCategory(matched);
    }
  }, [category]);

  useEffect(() => {
    async function fetchSearch() {
      setLoading(true);
      try {
        let dbQuery = supabase.from('products').select('*');

        if (query) {
          const keywords = query.split(' ').filter(k => k.length > 1);
          if (keywords.length > 0) {
            const filterString = keywords
              .map(k => `name.ilike.%${k}%,description.ilike.%${k}%`)
              .join(',');
            dbQuery = dbQuery.or(filterString);
          }
        }

        if (activeCategory && activeCategory !== 'Semua') {
          if (activeCategory === 'Signature') {
            // Pakai kolom is_signature, tidak ganggu category asli
            dbQuery = dbQuery.eq('is_signature', true);
          } else {
            dbQuery = dbQuery.ilike('category', activeCategory);
          }
        }

        const { data, error } = await dbQuery;
        if (error) throw error;

        const unique = Array.from(new Map((data || []).map(p => [p.id, p])).values());
        setProducts(unique);
      } catch (err) {
        console.error('Search error:', err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchSearch();
  }, [query, activeCategory]);

  const handleCategory = (cat: string) => {
    setActiveCategory(cat);
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (cat !== 'Semua') params.set('category', cat.toLowerCase());
    router.push(`/search?${params.toString()}`);
  };

  const title = query
    ? `Hasil untuk "${query}"`
    : activeCategory !== 'Semua'
    ? `Koleksi ${activeCategory}`
    : 'Semua Koleksi';

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 mb-20">

      {/* Header */}
      <div className="mb-8 text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400 mb-2">Koleksi</p>
        <h1 className="text-2xl md:text-3xl font-serif text-gray-900">{title}</h1>
        {!loading && (
          <p className="text-[11px] text-gray-400 mt-2">{products.length} produk ditemukan</p>
        )}
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 justify-center flex-wrap">
        <IconFilter className="text-gray-400 shrink-0" />
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => handleCategory(cat)}
            className={`px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] border transition-all duration-200 shrink-0 ${
              activeCategory === cat
                ? 'bg-black text-white border-black'
                : 'border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-100 animate-pulse" style={{ aspectRatio: '3/4' }} />
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <Search size={32} className="text-gray-200 mx-auto mb-4" />
          <p className="text-[13px] text-gray-400">Produk tidak ditemukan.</p>
          <button
            onClick={() => handleCategory('Semua')}
            className="mt-4 text-[11px] uppercase tracking-widest text-black underline underline-offset-4"
          >
            Lihat semua koleksi
          </button>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="text-center py-20 text-[12px] text-gray-400">Memuat...</div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}