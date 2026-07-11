import { NextResponse } from 'next/server';
import { ApiResponse } from '@/types';

export function sendSuccess<T>(data: T, status = 200) {
  return NextResponse.json(
    { success: true, data } as ApiResponse<T>,
    { status }
  );
}

export function sendError(error: string, status = 400) {
  return NextResponse.json(
    { success: false, error } as ApiResponse,
    { status }
  );
}

export function sendValidationError(errors: Record<string, string>) {
  return NextResponse.json(
    {
      success: false,
      error: 'Validation failed',
      data: errors,
    },
    { status: 400 }
  );
}
