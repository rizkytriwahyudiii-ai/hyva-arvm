import { Edit2, Trash2, Star } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { UseProductsReturn } from '@/lib/admin/useProducts';
import { STORAGE_URL } from '@/lib/admin/types';

interface ProductTableProps {
  productsHook: UseProductsReturn;
}

const categoryColor: Record<string, string> = {
  wanita: 'bg-pink-50 text-pink-700',
  pria:   'bg-blue-50 text-blue-700',
  unisex: 'bg-purple-50 text-purple-700',
};

/** Tabel daftar produk (Live Database Katalog) — sisi kanan tab Katalog */
export default function ProductTable({ productsHook }: ProductTableProps) {
  const { products, loading, startEdit, deleteProduct } = productsHook;

  const handleDelete = async (id: number, filename: string) => {
    if (!confirm('Yakin ingin menghapus permanen varian parfum ini dari katalog?')) return;
    const result = await deleteProduct(id, filename);
    if (result.success) toast.success(result.message);
    else toast.error(result.message);
  };

  if (loading) {
    return <p className="text-center text-slate-400 py-12 text-sm">Memuat katalog produk...</p>;
  }

  return (
    <div className="border border-slate-100 rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 bg-white flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-800">Live Database Katalog Toko</h3>
          <p className="text-[12px] text-slate-400 mt-0.5">{products.length} varian produk</p>
        </div>
        <span className="text-[11px] text-slate-400 flex items-center gap-1">
          <Star size={11} className="text-amber-500 fill-amber-500" /> = Signature
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-900 text-white text-[11px] uppercase tracking-wide">
            <tr>
              <th className="p-4 text-left">Foto</th>
              <th className="p-4 text-left">Nama Varian</th>
              <th className="p-4 text-left">Kategori</th>
              <th className="p-4 text-left">Harga</th>
              <th className="p-4 text-left">Longevity</th>
              <th className="p-4 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                {/* Foto + badge signature */}
                <td className="p-4">
                  <div className="relative w-12 h-12">
                    <img
                      src={`${STORAGE_URL}${p.image_filename}`}
                      className="w-12 h-12 rounded object-cover border border-slate-100"
                      alt={p.name}
                      onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.jpg'; }}
                    />
                    {p.is_signature && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center">
                        <Star size={8} className="text-white fill-white" />
                      </div>
                    )}
                  </div>
                </td>

                {/* Nama + karakter */}
                <td className="p-4">
                  <p className="font-semibold text-slate-800">{p.name}</p>
                  {p.karakter && (
                    <p className="text-[11px] text-slate-400 mt-0.5">{p.karakter}</p>
                  )}
                </td>

                {/* Kategori dengan warna */}
                <td className="p-4">
                  <span className={`text-[11px] uppercase px-2 py-1 rounded-full font-medium ${categoryColor[p.category] || 'bg-slate-100 text-slate-600'}`}>
                    {p.category}
                  </span>
                </td>

                {/* Harga */}
                <td className="p-4 text-amber-700 font-bold whitespace-nowrap">
                  Rp {p.price?.toLocaleString('id-ID')}
                </td>

                {/* Longevity bar */}
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: `${p.longevity || 0}%` }} />
                    </div>
                    <span className="text-[11px] text-slate-400">{p.longevity || 0}%</span>
                  </div>
                </td>

                {/* Aksi */}
                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(p)}
                      className="bg-amber-600 hover:bg-amber-700 text-white p-2 rounded-lg transition-colors"
                      title="Edit produk"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id!, p.image_filename)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
                      title="Hapus produk"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
