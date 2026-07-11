import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Product, EMPTY_PRODUCT } from './types';

/**
 * Hook untuk mengelola CRUD produk: fetch, save (insert/update), delete.
 * Upload gambar ke Supabase Storage bucket 'produk-parfum' dilakukan
 * di sini juga supaya komponen UI tidak perlu tahu detail storage.
 */
export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Product>(EMPTY_PRODUCT);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('products').select('*').order('id', { ascending: false });
    if (!error) setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const startEdit = (product: Product) => {
    setEditingId(product.id || null);
    setFormData(product);
    setImageFile(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData(EMPTY_PRODUCT);
    setImageFile(null);
  };

  const saveProduct = async (): Promise<{ success: boolean; message: string }> => {
    setSaving(true);
    let filename = formData.image_filename;

    try {
      if (imageFile) {
        // Hapus file lama kalau sedang edit dan ganti gambar
        if (editingId && formData.image_filename) {
          await supabase.storage.from('produk-parfum').remove([formData.image_filename]);
        }
        const ext = imageFile.name.split('.').pop();
        const newFileName = `${Date.now()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from('produk-parfum')
          .upload(newFileName, imageFile);
        if (uploadError) throw uploadError;
        filename = newFileName;
      }

      const dataToSave = { ...formData, image_filename: filename };

      if (editingId) {
        const { error } = await supabase.from('products').update(dataToSave).eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('products').insert([dataToSave]);
        if (error) throw error;
      }

      cancelEdit();
      await fetchProducts();
      return { success: true, message: 'Produk berhasil disimpan!' };
    } catch (error: any) {
      return { success: false, message: 'Gagal: ' + error.message };
    } finally {
      setSaving(false);
    }
  };

  const deleteProduct = async (id: number, filename: string): Promise<{ success: boolean; message: string }> => {
    try {
      if (filename) {
        await supabase.storage.from('produk-parfum').remove([filename]);
      }
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      await fetchProducts();
      return { success: true, message: 'Produk berhasil dihapus' };
    } catch (error: any) {
      return { success: false, message: 'Gagal menghapus: ' + error.message };
    }
  };

  return {
    products, loading, editingId, formData, imageFile, saving,
    setFormData, setImageFile,
    startEdit, cancelEdit, saveProduct, deleteProduct, fetchProducts,
  };
}

export type UseProductsReturn = ReturnType<typeof useProducts>;