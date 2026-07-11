import { Edit2, PlusCircle, Save } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { UseProductsReturn } from '@/lib/admin/useProducts';
import { inputCls, selectCls } from '@/lib/admin/types';

interface ProductFormProps {
  productsHook: UseProductsReturn;
}

/** Form tambah/edit produk — dipakai di sidebar kiri tab Katalog */
export default function ProductForm({ productsHook }: ProductFormProps) {
  const { editingId, formData, setFormData, setImageFile, saving, saveProduct, cancelEdit } = productsHook;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      toast.error('Lengkapi nama dan harga produk');
      return;
    }
    const result = await saveProduct();
    if (result.success) toast.success(result.message);
    else toast.error(result.message);
  };

  return (
    <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 h-fit">
      <h3 className="font-bold mb-6 flex items-center gap-2 border-l-4 border-amber-700 pl-2 text-slate-800">
        {editingId ? <Edit2 size={18} /> : <PlusCircle size={18} />}
        {editingId ? 'Edit Produk' : 'Tambah Produk Baru'}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          className={inputCls}
          placeholder="Nama Varian Parfum"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <div className="grid grid-cols-2 gap-2">
          <select
            className={selectCls}
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="wanita">Wanita</option>
            <option value="pria">Pria</option>
            <option value="unisex">Unisex</option>
          </select>
          <input
            type="number"
            required
            className={inputCls}
            placeholder="Harga"
            value={formData.price || ''}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-500">Upload Foto Produk:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files && setImageFile(e.target.files[0])}
            className="w-full p-2 border border-slate-200 rounded-lg text-sm"
          />
          {formData.image_filename && (
            <p className="text-[11px] text-slate-400">File saat ini: {formData.image_filename}</p>
          )}
        </div>

        <textarea
          className={`${inputCls} h-20 resize-none`}
          placeholder="Deskripsi Produk"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />

        {/* Fragrance Notes */}
        <div className="grid grid-cols-3 gap-2">
          <input
            className={inputCls}
            placeholder="Top Note"
            value={formData.top_note || ''}
            onChange={(e) => setFormData({ ...formData, top_note: e.target.value })}
          />
          <input
            className={inputCls}
            placeholder="Heart Note"
            value={formData.heart_note || ''}
            onChange={(e) => setFormData({ ...formData, heart_note: e.target.value })}
          />
          <input
            className={inputCls}
            placeholder="Base Note"
            value={formData.base_note || ''}
            onChange={(e) => setFormData({ ...formData, base_note: e.target.value })}
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-500">
            Longevity: {formData.longevity || 80}%
          </label>
          <input
            type="range"
            min={0}
            max={100}
            value={formData.longevity || 80}
            onChange={(e) => setFormData({ ...formData, longevity: Number(e.target.value) })}
            className="w-full"
          />
        </div>

        <input
          className={inputCls}
          placeholder="Kata kunci pencarian (pisahkan spasi)"
          value={formData.keywords || ''}
          onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
        />

        <input
          className={inputCls}
          placeholder="Link Shopee (opsional)"
          value={formData.shopee_link || ''}
          onChange={(e) => setFormData({ ...formData, shopee_link: e.target.value })}
        />

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 bg-slate-900 disabled:bg-slate-400 text-white py-3 rounded-lg font-bold text-sm hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
          >
            <Save size={16} />
            {saving ? 'Menyimpan...' : editingId ? 'Update Varian' : 'Simpan Varian'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="px-4 bg-slate-200 hover:bg-slate-300 rounded-lg text-sm font-semibold transition-colors"
            >
              Batal
            </button>
          )}
        </div>
      </form>
    </div>
  );
}