import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { getAuthenticatedUser } from '@/app/api/lib/auth';
import { sendSuccess, sendError } from '@/app/api/lib/errors';
import { validateOrderItems } from '@/lib/validation';

interface ValidatePaymentRequest {
  orderId: string;
  total: number;
  items: any[];
}

export async function POST(req: Request) {
  try {
    const user = await getAuthenticatedUser(req);
    const body = (await req.json()) as ValidatePaymentRequest;

    if (!body.orderId || !body.total || !body.items) {
      return sendError('Data pesanan tidak lengkap', 400);
    }

    if (!validateOrderItems(body.items)) {
      return sendError('Item pesanan tidak valid', 400);
    }

    const { data: order, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', body.orderId)
      .single();

    if (error || !order) {
      return sendError('Pesanan tidak ditemukan', 404);
    }

    if (order.user_id !== user.id) {
      return sendError('Anda tidak memiliki akses ke pesanan ini', 403);
    }

    if (order.payment_status === 'paid') {
      return sendError('Pesanan sudah dibayar', 400);
    }

    if (order.total !== body.total) {
      return sendError('Total pembayaran tidak sesuai', 400);
    }

    return sendSuccess({ valid: true, orderId: body.orderId });
  } catch (error: any) {
    console.error('[POST /api/payment/validate error]:', error);

    if (error.message === 'Unauthorized' || error.message === 'Invalid token') {
      return sendError('Tidak terautentikasi', 401);
    }

    return sendError(error?.message || 'Gagal validasi pembayaran', 500);
  }
}
