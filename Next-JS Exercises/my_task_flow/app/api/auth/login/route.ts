import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';
import { getAuthCookieName, signToken } from '@/lib/auth';

export async function POST(request: Request) {
  const body = (await request.json()) as { email: string; password: string };

  const email = body.email.trim().toLowerCase();
  const { password } = body;

  if (!email || !password) {
    return NextResponse.json(
      { message: 'Email and password are required.' },
      { status: 400 },
    );
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json(
      { message: 'Invalid email or password.' },
      { status: 401 },
    );
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return NextResponse.json(
      { message: 'Invalid email or password.' },
      { status: 401 },
    );
  }

  const token = signToken({ userId: user.id, email: user.email });

  const response = NextResponse.json({ message: 'Logged in successfully.' });

  response.cookies.set({
    name: getAuthCookieName(),
    value: token,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
