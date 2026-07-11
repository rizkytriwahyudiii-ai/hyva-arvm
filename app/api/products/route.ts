import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { Product } from '@/types';
import { sendSuccess, sendError } from '../lib/errors';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = supabase.from('products').select('*', { count: 'exact' });

    if (category && category !== 'Semua') {
      query = query.eq('category', category.toLowerCase());
    }

    if (search) {
      query = query.or(
        `name.ilike.%${search}%,description.ilike.%${search}%`
      );
    }

    const { data, error, count } = await query
      .range(offset, offset + limit - 1)
      .limit(limit);

    if (error) throw error;

    return sendSuccess({
      products: data as Product[],
      total: count || 0,
      limit,
      offset,
    });
  } catch (error: any) {
    console.error('[GET /api/products error]:', error);
    return sendError(error?.message || 'Gagal memuat produk', 500);
  }
}
