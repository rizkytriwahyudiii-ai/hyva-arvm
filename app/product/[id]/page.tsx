'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { useCartStore } from '@/lib/store';
import ProductCard from '@/components/ProductCard';

const StarRating = ({ count }: { count: number }) => (
  <div className="text-yellow-600 text-xs tracking-tighter">
    {'★'.repeat(count) + '☆'.repeat(5 - count)}
  </div>
);

export default function ProductDetailPage() {
  const params = useParams();
  const { addToCart } = useCartStore();

  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (!params?.id) return;
      try {
        setLoading(true);
        const { data: prodData } = await supabase
          .from('products').select('*')
          .eq('id', Number(params.id)).single();
        if (prodData) {
          setProduct(prodData);
          const { data: relData } = await supabase
            .from('products').select('*')
            .eq('category', prodData.category)
            .neq('id', prodData.id).limit(4);
          setRelatedProducts(relData || []);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [params]);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    toast.success(`${product.name} ditambahkan ke keranjang`);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast.success('Link berhasil disalin');
  };

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center text-[12px] text-gray-400">Memuat...</div>;
  if (!product) return <div className="min-h-[60vh] flex items-center justify-center text-[12px] text-gray-400">Produk tidak ditemukan.</div>;

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-16">

      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-stone-400">
        <Link href="/" className="hover:text-black transition-colors flex items-center gap-1">
          <ArrowLeft size={11} /> Home
        </Link>
        <span>/</span>
        <span className="text-black font-medium truncate max-w-[180px] md:max-w-none">{product.name}</span>
      </div>

      {/* Main Grid */}
      <div className="grid md:grid-cols-12 gap-6 md:gap-10 items-start max-w-6xl mx-auto">

        {/* IMAGE — mobile: compact, desktop: half */}
        <div className="md:col-span-5 bg-[#F8F6F3] flex justify-center items-center p-6 md:p-10">
          <img
            src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${product.image_filename}`}
            alt={product.name}
            className="w-[180px] md:w-full md:max-w-[340px] object-contain"
          />
        </div>

        {/* INFO */}
        <div className="md:col-span-7 flex flex-col space-y-4 md:space-y-6">

          {/* Nama & Harga */}
          <div>
            <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-stone-400">
              {product.brand || 'HYVA ARVM'}
            </span>
            <h1 className="text-2xl md:text-4xl font-light text-stone-900 leading-tight mt-1">
              {product.name}
            </h1>
            <p className="text-lg md:text-xl font-semibold text-stone-900 mt-1">
              Rp {product.price?.toLocaleString('id-ID')}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-2 py-1 text-[8px] uppercase tracking-[0.1em] bg-green-50 text-green-700 border border-green-200">Ready Stock</span>
              <span className="px-2 py-1 text-[8px] uppercase tracking-[0.1em] border border-stone-200 text-stone-600">Extrait de Parfum</span>
              <span className="px-2 py-1 text-[8px] uppercase tracking-[0.1em] border border-stone-200 text-stone-600">50ml</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-[8px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-1">Deskripsi</h3>
            <p className="text-[12px] text-stone-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Longevity */}
          <div>
            <div className="flex justify-between text-[8px] uppercase tracking-[0.2em] text-stone-400 mb-1.5">
              <span>Longevity</span>
              <span className="text-stone-700">{product.longevity || 80}%</span>
            </div>
            <div className="h-1 bg-stone-100 rounded-full overflow-hidden">
              <div className="h-full bg-stone-800 rounded-full transition-all duration-700" style={{ width: `${product.longevity || 80}%` }} />
            </div>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-3 gap-3 py-3 border-y border-stone-100">
            {[{ l: 'Pengiriman', v: 'Seluruh Indonesia' }, { l: 'Kualitas', v: 'Premium' }, { l: 'Tipe', v: 'EDP' }].map(i => (
              <div key={i.l}>
                <p className="text-[8px] uppercase tracking-[0.15em] text-stone-400">{i.l}</p>
                <p className="text-[10px] md:text-[11px] mt-0.5 text-stone-800 font-medium">{i.v}</p>
              </div>
            ))}
          </div>

          {/* Fragrance Notes */}
          <div>
            <h3 className="text-[8px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-2">Fragrance Notes</h3>
            <div className="space-y-2">
              {[
                { label: 'Top', val: product.top_note, stars: 5 },
                { label: 'Heart', val: product.heart_note, stars: 4 },
                { label: 'Base', val: product.base_note, stars: 3 },
              ].map((item) => (
                <div key={item.label} className="grid grid-cols-[36px_1fr_auto] items-center gap-2">
                  <span className="text-[8px] uppercase text-stone-400">{item.label}</span>
                  <span className="text-[11px] text-stone-700">{item.val}</span>
                  <StarRating count={item.stars} />
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              onClick={handleAddToCart}
              className={`py-3 text-[9px] uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-1 font-semibold ${
                added ? 'bg-green-600 text-white' : 'bg-black hover:bg-stone-800 text-white'
              }`}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {added ? 'Added!' : 'Cart'}
            </button>
            <a
              href={product.shopee_link}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 border border-stone-200 hover:border-stone-400 text-stone-600 text-[9px] uppercase tracking-[0.15em] flex items-center justify-center transition-colors"
            >
              Shopee
            </a>
            <button
              onClick={handleShare}
              className="py-3 border border-stone-100 hover:border-stone-300 text-stone-400 text-[9px] uppercase tracking-[0.15em] flex items-center justify-center gap-1 transition-colors"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg> Share
            </button>
          </div>

          <div className="flex items-center gap-2 text-[9px] text-stone-400 uppercase tracking-widest">
  <span>✓</span> 100% Original Guaranteed
  <span className="mx-2">•</span>
  <span>✓</span> Free Shipping Indonesia
</div>

        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-6 md:mt-16 border-t border-stone-100 pt-8 md:pt-12">
          <div className="text-center mb-6 md:mb-10">
              <p className="text-[10px] uppercase tracking-[0.4em] text-stone-400 mb-2">Discover More</p>
              <h2 className="text-xl md:text-3xl font-light text-stone-900">You May Also Like</h2>
            </div>    
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}