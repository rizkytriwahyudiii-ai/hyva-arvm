'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Register sudah digabung ke /login — redirect saja
export default function RegisterPage() {
  const router = useRouter();
  useEffect(() => { router.replace('/login'); }, [router]);
  return null;
}
