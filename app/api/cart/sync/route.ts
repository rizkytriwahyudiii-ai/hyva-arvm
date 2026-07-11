import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { getAuthenticatedUser } from '../lib/auth';
import { sendSuccess, sendError } from '../lib/errors';
import { CartItem } from '@/types';

interface SyncCartRequest {
  items: CartItem[];
  action: 'load' | 'update' | 'clear';
}

export async function POST(req: Request) {
  try {
    const user = await getAuthenticatedUser(req);
    const body = (await req.json()) as SyncCartRequest;

    if (!body.action || !['load', 'update', 'clear'].includes(body.action)) {
      return sendError('Aksi tidak valid', 400);
    }

    if (body.action === 'clear') {
      await supabase.from('cart_items').delete().eq('user_id', user.id);
      return sendSuccess({ items: [] });
    }

    if (body.action === 'load') {
      const { data } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id);

      return sendSuccess({
        items: data || [],
      });
    }

    if (body.action === 'update') {
      for (const item of body.items) {
        await supabase.from('cart_items').upsert(
          {
            user_id: user.id,
            product_id: item.id,
            name: item.name,
            price: item.price,
            image_url: item.image_url,
            quantity: item.quantity,
          },
          { onConflict: 'user_id,product_id' }
        );
      }

      return sendSuccess({
        items: body.items,
        message: 'Keranjang tersinkronisasi',
      });
    }

    return sendSuccess({ items: [] });
  } catch (error: any) {
    console.error('[POST /api/cart/sync error]:', error);

    if (error.message === 'Unauthorized' || error.message === 'Invalid token') {
      return sendError('Tidak terautentikasi', 401);
    }

    return sendError(error?.message || 'Gagal sinkronisasi keranjang', 500);
  }
}
