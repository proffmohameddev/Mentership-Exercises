import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { getAuthCookieName, verifyToken } from '@/lib/auth';
import type { TaskStatus } from '@prisma/client';

type Params = { params: { taskId: string } };

async function getUserIdFromCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(getAuthCookieName())?.value;
  if (!token) return null;
  const payload = verifyToken(token);
  return payload?.userId ?? null;
}

export async function PATCH(request: Request, { params }: Params) {
  const userId = await getUserIdFromCookie();
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = (await request.json()) as Partial<{
    title: string;
    description: string | null;
    status: TaskStatus;
    dayId: string;
  }>;

  const task = await prisma.task.update({
    where: { id: params.taskId, userId },
    data: body,
  });

  return NextResponse.json(task);
}

export async function DELETE(_request: Request, { params }: Params) {
  const userId = await getUserIdFromCookie();
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  await prisma.task.delete({
    where: { id: params.taskId, userId },
  });

  return NextResponse.json({ success: true });
}
