'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';
import 'leaflet/dist/leaflet.css';

import { supabase } from '@/lib/supabaseClient';
import { useCartStore } from '@/lib/store';
import { COURIERS } from '@/lib/checkout/types';
import { getOngkir, buildFullAddress } from '@/lib/checkout/calculations';
import { useWilayah } from '@/lib/checkout/useWilayah';
import { useMapConfirm } from '@/lib/checkout/useMapConfirm';

import CheckoutSteps from '@/components/checkout/CheckoutSteps';
import StepInfo from '@/components/checkout/StepInfo';
import StepKurir from '@/components/checkout/StepKurir';
import StepKonfirmasi from '@/components/checkout/StepKonfirmasi';
import OrderSummary from '@/components/checkout/OrderSummary';

const MapPicker = dynamic(() => import('@/components/MapPicker'), { ssr: false });

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCartStore();
  const wilayah = useWilayah();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [courier, setCourier] = useState('');

  const { handleMapConfirm } = useMapConfirm(wilayah, setPostalCode);

  // Kalkulasi turunan
  const selectedCourier = COURIERS.find((c) => c.id === courier);
  const ongkir = getOngkir(wilayah.provinceName, selectedCourier);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal + ongkir;
  const fullAddress = buildFullAddress({
    detailAddress,
    villageName: wilayah.villageName,
    districtName: wilayah.districtName,
    cityName: wilayah.cityName,
    provinceName: wilayah.provinceName,
    postalCode,
  });

  // Load profil user + daftar provinsi saat mount
  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }

      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (data) {
        setName(data.full_name || '');
        setPhone(data.phone || '');
      }

      await wilayah.loadProvinces();
      setProfileLoaded(true);
    };
    init();
  }, []);

  // Redirect ke cart kalau kosong (setelah profile selesai load, supaya tidak race condition)
  useEffect(() => {
    if (profileLoaded && cart.length === 0) router.push('/cart');
  }, [cart, profileLoaded]);

const handlePlaceOrder = async () => {
  setLoading(true);

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('Tidak terautentikasi');
    }

    const orderId = `HYVA-${Date.now()}`;

    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        items: cart,
        total,
        name,
        phone,
        address: fullAddress,
        courier: `${selectedCourier?.name} (${selectedCourier?.estimate})`,
        status: 'pending',
        payment_status: 'unpaid',
        midtrans_order_id: orderId,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

      console.log('=== CHECKOUT DATA ===');

console.log({
  subtotal,
  ongkir,
  total,
  cart,
});

console.log(
  'TOTAL ITEM =',
  cart.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  )
);

console.log(
  'EXPECTED TOTAL =',
  cart.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  ) + ongkir
);

    const response = await fetch(
      '/api/payment/create',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          total,
          ongkir,
          name,
          phone,
          email: user.email,
          items: cart,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.error || 'Gagal membuat transaksi'
      );
    }

    if (!result.token) {
      throw new Error(
        'Token Midtrans tidak ditemukan'
      );
    }

    window.snap.pay(result.token, {
      onSuccess: async function (result: any) {
  console.log(
    'Midtrans Success:',
    result
  );

  await supabase
    .from('orders')
    .update({
      payment_status: 'paid',
      status: 'processing',
    })
    .eq('id', order.id);

  clearCart();

  toast.success(
    'Pembayaran berhasil'
  );

  router.push(
    `/order/success?id=${order.id}`
  );
},

      onPending: function (result: any) {
        console.log(
          'Midtrans Pending:',
          result
        );

        toast.success(
          'Menunggu pembayaran'
        );
      },

      onError: function (result: any) {
        console.error(
          'Midtrans Error:',
          result
        );

        toast.error(
          'Pembayaran gagal'
        );
      },

      onClose: function () {
        toast(
          'Anda menutup popup pembayaran'
        );
      },
    });
  } catch (err: any) {
    console.error(err);

    toast.error(
      err.message ||
        'Terjadi kesalahan saat checkout'
    );
  } finally {
    setLoading(false);
  }
};

  if (!profileLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[12px] text-gray-400">
        Memuat...
      </div>
    );
  }

  return (
    <>
      {showMap && (
  <MapPicker onClose={() => setShowMap(false)} onConfirm={(data) => {setShowMap(false); handleMapConfirm(data);}} />)}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-16">

        <div className="mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-gray-400 hover:text-black transition-colors mb-4"
          >
            <ArrowLeft size={12} /> Keranjang
          </Link>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">HYVA ARVM</p>
          <h1 className="text-2xl font-serif text-gray-900">Checkout</h1>
        </div>

        <CheckoutSteps step={step} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {step === 1 && (
              <StepInfo
                name={name} setName={setName}
                phone={phone} setPhone={setPhone}
                postalCode={postalCode} setPostalCode={setPostalCode}
                detailAddress={detailAddress} setDetailAddress={setDetailAddress}
                wilayah={wilayah}
                onOpenMap={() => setShowMap(true)}
                onNext={() => setStep(2)}
              />
            )}

            {step === 2 && (
              <StepKurir
                provinceName={wilayah.provinceName}
                locationLabel={wilayah.cityName || wilayah.provinceName}
                courier={courier}
                setCourier={setCourier}
                onBack={() => setStep(1)}
                onNext={() => setStep(3)}
              />
            )}

            {step === 3 && (
              <StepKonfirmasi
                name={name}
                phone={phone}
                fullAddress={fullAddress}
                courierLabel={`${selectedCourier?.name} — ${selectedCourier?.estimate}`}
                ongkir={ongkir}
                cart={cart}
                total={total}
                loading={loading}
                onBack={() => setStep(2)}
                onSubmit={handlePlaceOrder}
              />
            )}
          </div>

          <OrderSummary cart={cart} subtotal={subtotal} ongkir={ongkir} total={total} />
        </div>
      </div>
    </>
  );
}