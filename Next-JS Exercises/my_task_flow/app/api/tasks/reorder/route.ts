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

export async function PATCH(request: Request) {
  const userId = await getUserIdFromCookie();
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = (await request.json()) as {
    updates: {
      id: string;
      dayId: string;
      status: TaskStatus;
      order: number;
    }[];
  };

  const { updates } = body;

  if (!Array.isArray(updates) || updates.length === 0) {
    return NextResponse.json({ success: true });
  }

  await prisma.$transaction(
    updates.map((update) =>
      prisma.task.update({
        where: { id: update.id, userId },
        data: {
          dayId: update.dayId,
          status: update.status,
          order: update.order,
        },
      }),
    ),
  );

  return NextResponse.json({ success: true });
}
