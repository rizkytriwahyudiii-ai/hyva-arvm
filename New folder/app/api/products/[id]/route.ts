import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { Product } from '@/types';
import { sendSuccess, sendError } from '../../lib/errors';

interface Params {
  id: string;
}

export async function GET(req: Request, { params }: { params: Params }) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return sendError('ID produk tidak valid', 400);
    }

    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !product) {
      return sendError('Produk tidak ditemukan', 404);
    }

    const { data: relatedProducts } = await supabase
      .from('products')
      .select('*')
      .eq('category', product.category)
      .neq('id', id)
      .limit(4);

    return sendSuccess({
      product: product as Product,
      relatedProducts: relatedProducts as Product[],
    });
  } catch (error: any) {
    console.error('[GET /api/products/[id] error]:', error);
    return sendError(error?.message || 'Gagal memuat produk', 500);
  }
}
