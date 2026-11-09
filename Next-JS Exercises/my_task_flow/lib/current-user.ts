// lib/current-user.ts
'use server';

import { cookies } from 'next/headers';
import { prisma } from './prisma';
import { getAuthCookieName, verifyToken } from './auth';

export type CurrentUser = {
  id: string;
  email: string;
  createdAt: Date;
};

export async function getCurrentUser(): Promise<CurrentUser | null> {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(getAuthCookieName());

    if (!cookie?.value) {
      return null;
    }

    const payload = verifyToken(cookie.value);
    if (!payload?.userId) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true, createdAt: true },
    });

    if (!user) return null;

    return user;
  } catch {
    // Any error → treat as unauthenticated
    return null;
  }
}
