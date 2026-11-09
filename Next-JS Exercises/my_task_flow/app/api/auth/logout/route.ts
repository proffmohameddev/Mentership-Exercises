// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';
import { getAuthCookieName } from '@/lib/auth';

export async function POST() {
  const res = NextResponse.json({ success: true });

  // Clear auth cookie
  res.cookies.set({
    name: getAuthCookieName(),
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0, // delete
  });

  return res;
}
