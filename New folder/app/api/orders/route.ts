import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { getAuthenticatedUser } from '../lib/auth';
import { sendSuccess, sendError } from '../lib/errors';
import { validateCheckoutForm, validateOrderItems } from '@/lib/validation';
import { CreateOrderRequest } from '@/types';

export async function POST(req: Request) {
  try {
    const user = await getAuthenticatedUser(req);
    const body = (await req.json()) as CreateOrderRequest;

    const validation = validateCheckoutForm({
      firstName: body.name.split(' ')[0],
      lastName: body.name.split(' ').slice(1).join(' '),
      email: body.email || '',
      phone: body.phone,
      address: body.address,
      province: 'validated',
      city: 'validated',
      district: 'validated',
      village: 'validated',
    });

    if (!validation.valid) {
      return sendSuccess({ errors: validation.errors }, 400);
    }

    if (!validateOrderItems(body.items)) {
      return sendError('Item pesanan tidak valid', 400);
    }

    const orderId = `HYVA-${Date.now()}`;

    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        id: orderId,
        user_id: user.id,
        items: body.items,
        total: body.total,
        name: body.name,
        phone: body.phone,
        address: body.address,
        courier: body.courier,
        status: 'pending',
        payment_status: 'unpaid',
      })
      .select()
      .single();

    if (error) throw error;

    return sendSuccess(order, 201);
  } catch (error: any) {
    console.error('[POST /api/orders error]:', error);

    if (error.message === 'Unauthorized' || error.message === 'Invalid token') {
      return sendError('Tidak terautentikasi', 401);
    }

    return sendError(error?.message || 'Gagal membuat pesanan', 500);
  }
}
