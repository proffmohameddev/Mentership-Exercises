import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const body = (await request.json()) as { email: string; password: string };

  const email = body.email.trim().toLowerCase();
  const { password } = body;

  if (!email || !password || password.length < 6) {
    return NextResponse.json(
      { message: 'Email and password are required (min 6 chars).' },
      { status: 400 },
    );
  }

  const userCount = await prisma.user.count();
  if (userCount > 0) {
    return NextResponse.json(
      { message: 'Admin already exists. Registration is disabled.' },
      { status: 403 },
    );
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { message: 'User with this email already exists.' },
      { status: 409 },
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
    },
  });

  return NextResponse.json(
    { id: user.id, email: user.email },
    { status: 201 },
  );
}
