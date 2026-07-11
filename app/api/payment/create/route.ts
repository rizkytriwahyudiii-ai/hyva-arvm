import { NextResponse } from 'next/server';
import { snap } from '@/lib/payment/midtrans';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      orderId,
      total,
      ongkir,
      name,
      phone,
      email,
      items,
    } = body;

    const itemDetails = [
      ...(items?.map((item: any) => ({
        id: String(item.id),
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })) || []),

      {
        id: 'shipping',
        name: 'Ongkos Kirim',
        quantity: 1,
        price: ongkir,
      },
    ];

    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: total,
      },

      customer_details: {
        first_name: name,
        phone,
        email,
      },

      item_details: itemDetails,
    };

    console.log(
      'MIDTRANS TOTAL:',
      total
    );

    console.log(
      'MIDTRANS ITEMS:',
      itemDetails
    );

    const transaction =
      await snap.createTransaction(parameter);

    console.log(
      'MIDTRANS TOKEN:',
      transaction.token
    );

    console.log(
      'MIDTRANS URL:',
      transaction.redirect_url
    );

    return NextResponse.json({
      token: transaction.token,
      redirect_url:
        transaction.redirect_url,
    });
  } catch (error: any) {
    console.error(
      'MIDTRANS ERROR:',
      error
    );

    return NextResponse.json(
      {
        error:
          error?.message ||
          'Gagal membuat Snap Token',
      },
      {
        status: 500,
      }
    );
  }
}