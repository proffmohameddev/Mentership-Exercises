import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { getAuthCookieName, verifyToken } from '@/lib/auth';

async function getUserIdFromCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(getAuthCookieName())?.value;
  if (!token) return null;
  const payload = verifyToken(token);
  return payload?.userId ?? null;
}

export async function GET() {
  const userId = await getUserIdFromCookie();
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const days = await prisma.day.findMany({
    where: { userId },
    orderBy: { order: 'asc' },
    include: {
      tasks: {
        orderBy: [{ status: 'asc' }, { order: 'asc' }],
      },
    },
  });

  return NextResponse.json(days);
}

export async function POST(request: Request) {
  const userId = await getUserIdFromCookie();
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = (await request.json()) as { title: string };
  const title = body.title.trim() || 'Untitled Day';

  const maxOrder = await prisma.day.aggregate({
    where: { userId },
    _max: { order: true },
  });

  const day = await prisma.day.create({
    data: {
      title,
      order: (maxOrder._max.order ?? 0) + 1,
      userId,
    },
  });

  return NextResponse.json(day, { status: 201 });
}
