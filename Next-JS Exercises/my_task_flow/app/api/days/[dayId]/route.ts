import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { getAuthCookieName, verifyToken } from '@/lib/auth';

type RouteContext = { params: { dayId: string } };

async function getUserIdFromCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(getAuthCookieName())?.value;
  if (!token) return null;
  const payload = verifyToken(token);
  return payload?.userId ?? null;
}

// PATCH /api/days/:dayId  -> rename day
export async function PATCH(
  request: Request,
  { params }: RouteContext,
) {
  const userId = await getUserIdFromCookie();
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = (await request.json()) as { title?: string };
  const title = (body.title ?? '').trim();

  if (!title) {
    return NextResponse.json(
      { message: 'Title is required.' },
      { status: 400 },
    );
  }

  try {
    const result = await prisma.day.updateMany({
      where: { id: params.dayId, userId },
      data: { title },
    });

    if (result.count === 0) {
      return NextResponse.json(
        { message: 'Day not found.' },
        { status: 404 },
      );
    }

    // Optional: return the updated day if you need it on client
    const updated = await prisma.day.findUnique({
      where: { id: params.dayId },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error('Error updating day', error);
    return NextResponse.json(
      { message: 'Failed to update day.' },
      { status: 500 },
    );
  }
}

// DELETE /api/days/:dayId  -> delete day + its tasks
export async function DELETE(
  _request: Request,
  { params }: RouteContext,
) {
  const userId = await getUserIdFromCookie();
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Delete tasks under this day for this user
    await prisma.task.deleteMany({
      where: { dayId: params.dayId, userId },
    });

    // Delete the day itself (scoped by userId for safety)
    const result = await prisma.day.deleteMany({
      where: { id: params.dayId, userId },
    });

    if (result.count === 0) {
      return NextResponse.json(
        { message: 'Day not found.' },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting day', error);
    return NextResponse.json(
      { message: 'Failed to delete day.' },
      { status: 500 },
    );
  }
}
