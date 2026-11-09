import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { getAuthCookieName, verifyToken } from '@/lib/auth';
import type { TaskStatus } from '@prisma/client';

async function getUserIdFromCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(getAuthCookieName())?.value;
  if (!token) return null;
  const payload = verifyToken(token);
  return payload?.userId ?? null;
}

export async function POST(request: Request) {
  const userId = await getUserIdFromCookie();
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = (await request.json()) as {
    title: string;
    description?: string;
    dayId: string;
    status: TaskStatus;
  };

  const { title, description, dayId, status } = body;

  const maxOrder = await prisma.task.aggregate({
    where: { dayId, status, userId },
    _max: { order: true },
  });

  const task = await prisma.task.create({
    data: {
      title: title.trim(),
      description: description?.trim() ?? null,
      dayId,
      status,
      userId,
      order: (maxOrder._max.order ?? 0) + 1,
    },
  });

  return NextResponse.json(task, { status: 201 });
}
