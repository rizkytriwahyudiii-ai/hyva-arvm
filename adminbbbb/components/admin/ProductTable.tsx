import { Edit2, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { UseProductsReturn } from '@/lib/admin/useProducts';
import { STORAGE_URL } from '@/lib/admin/types';

interface ProductTableProps {
  productsHook: UseProductsReturn;
}

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
      <div className="px-6 py-4 border-b border-slate-100 bg-white">
        <h3 className="font-bold text-slate-800">Live Database Katalog Toko</h3>
        <p className="text-[12px] text-slate-400 mt-0.5">{products.length} varian produk</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-900 text-white text-[11px] uppercase tracking-wide">
            <tr>
              <th className="p-4 text-left">Foto</th>
              <th className="p-4 text-left">Nama Varian</th>
              <th className="p-4 text-left">Kategori</th>
              <th className="p-4 text-left">Harga</th>
              <th className="p-4 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50">
                <td className="p-4">
                  <img
                    src={`${STORAGE_URL}${p.image_filename}`}
                    className="w-12 h-12 rounded object-cover border border-slate-100"
                    alt={p.name}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.jpg'; }}
                  />
                </td>
                <td className="p-4 font-semibold text-slate-800">{p.name}</td>
                <td className="p-4">
                  <span className="text-[11px] uppercase px-2 py-1 bg-slate-100 text-slate-600 rounded-full">
                    {p.category}
                  </span>
                </td>
                <td className="p-4 text-amber-700 font-bold whitespace-nowrap">
                  Rp {p.price?.toLocaleString('id-ID')}
                </td>
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