export const runtime = 'nodejs';

import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { getAuthCookieName, verifyToken } from '@/lib/auth';

type DashboardLayoutProps = {
  children: ReactNode;
};

async function enforceAdminAccess(): Promise<void> {
  // Check how many users exist
  const userCount = await prisma.user.count();
  const hasAdmin = userCount > 0;

  // Read cookie correctly (Next.js 16)
  const cookieStore = await cookies();
  const token = cookieStore.get(getAuthCookieName())?.value ?? null;

  // No token at all → decide where to send them
  if (!token) {
    if (hasAdmin) redirect('/login');
    else redirect('/register');
  }

  // Verify JWT token
  const payload = verifyToken(token);
  if (!payload?.userId) {
    if (hasAdmin) redirect('/login');
    else redirect('/register');
  }

  // Make sure user still exists
  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true },
  });

  if (!user) {
    if (hasAdmin) redirect('/login');
    else redirect('/register');
  }

  // If reached here → logged in successfully
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  await enforceAdminAccess();
  return <>{children}</>;
}
