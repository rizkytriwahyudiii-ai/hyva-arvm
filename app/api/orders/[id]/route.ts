import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { getAuthenticatedUser } from '../../lib/auth';
import { sendSuccess, sendError } from '../../lib/errors';

interface Params {
  id: string;
}

export async function GET(req: Request, { params }: { params: Params }) {
  try {
    const user = await getAuthenticatedUser(req);
    const orderId = params.id;

    const { data: order, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (error || !order) {
      return sendError('Pesanan tidak ditemukan', 404);
    }

    if (order.user_id !== user.id) {
      return sendError('Anda tidak memiliki akses ke pesanan ini', 403);
    }

    return sendSuccess(order);
  } catch (error: any) {
    console.error('[GET /api/orders/[id] error]:', error);

    if (error.message === 'Unauthorized' || error.message === 'Invalid token') {
      return sendError('Tidak terautentikasi', 401);
    }

    return sendError(error?.message || 'Gagal memuat pesanan', 500);
  }
}
