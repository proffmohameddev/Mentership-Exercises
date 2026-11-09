// app/dashboard/page.tsx
'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Day } from '../types/taskflow';
import { DayBoard } from '../_components/DayBoard';

const daysFetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to load days');
  }
  return (await res.json()) as Day[];
};

const meFetcher = async (url: string) => {
  const res = await fetch(url);
  if (res.status === 401) return null;
  if (!res.ok) {
    throw new Error('Failed to load user');
  }
  return (await res.json()) as { id: string; email: string };
};

export default function DashboardPage() {
  const router = useRouter();

  const { data: daysData, mutate: mutateDays } = useSWR<Day[]>(
    '/api/days',
    daysFetcher,
  );

  const { data: currentUser } = useSWR<{ id: string; email: string } | null>(
    '/api/auth/me',
    meFetcher,
  );

  const [newDayTitle, setNewDayTitle] = useState('');

  const days = daysData ?? [];

  const totalTasks = days.reduce((sum, d) => sum + d.tasks.length, 0);
  const todoTasks = days.reduce(
    (sum, d) => sum + d.tasks.filter((t) => t.status === 'TODO').length,
    0,
  );
  const inProcessTasks = days.reduce(
    (sum, d) =>
      sum + d.tasks.filter((t) => t.status === 'IN_PROCESS').length,
    0,
  );
  const finishedTasks = days.reduce(
    (sum, d) =>
      sum + d.tasks.filter((t) => t.status === 'FINISHED').length,
    0,
  );

  async function handleCreateDay(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!newDayTitle.trim()) return;

    await fetch('/api/days', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newDayTitle.trim() }),
    });

    setNewDayTitle('');
    await mutateDays();
  }

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    await mutateDays([], { revalidate: false });
    router.push('/login');
  }

  const userEmail =
    currentUser === undefined
      ? 'Loading…'
      : currentUser === null
        ? 'Unknown user'
        : currentUser.email;

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#050012] via-[#05000F] to-[#020008] text-zinc-50">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-10 h-80 w-80 rounded-full bg-fuchsia-500/25 blur-[110px]" />
        <div className="absolute top-10 right-0 h-80 w-80 rounded-full bg-indigo-500/25 blur-[120px]" />
        <div className="absolute bottom-[-7rem] left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-500/25 blur-[140px]" />
      </div>

      {/* Shell layout: sidebar + main */}
      <div className="relative z-10 mx-auto flex w/full max-w-7xl flex-col xl:flex-row">
        {/* Sidebar (desktop) */}
        <aside className="hidden w-full max-w-xs flex-col border-r border-zinc-800/70 bg-black/25 px-5 py-6 backdrop-blur-xl xl:flex">
          <div className="mb-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-400">
              MyTaskFlow Daily
            </p>
            <h1 className="mt-2 text-lg font-semibold text-zinc-50">
              Your Private Task HQ
            </h1>
            <p className="mt-2 text-xs text-zinc-400">
              One admin. Day-based planning. Kanban flow. No distractions.
            </p>
          </div>

          <div className="space-y-3 text-xs text-zinc-300">
            <div className="rounded-xl border border-zinc-800/70 bg-zinc-950/70 px-3 py-3 shadow-sm shadow-emerald-500/15">
              <p className="text-[11px] font-medium text-zinc-200">
                Today&apos;s snapshot
              </p>
              <p className="mt-2 text-[11px] text-zinc-400">
                Total tasks:{' '}
                <span className="font-semibold text-zinc-100">
                  {totalTasks}
                </span>
                <br />
                Todo:{' '}
                <span className="font-semibold text-amber-300">
                  {todoTasks}
                </span>
                <br />
                In Process:{' '}
                <span className="font-semibold text-sky-300">
                  {inProcessTasks}
                </span>
                <br />
                Finished:{' '}
                <span className="font-semibold text-emerald-300">
                  {finishedTasks}
                </span>
              </p>
            </div>
            <p className="text-[11px] text-zinc-500">
              Tip: Use{' '}
              <span className="font-medium text-emerald-300">Day 1</span>,{' '}
              <span className="font-medium text-emerald-300">Deep Work</span>, or{' '}
              <span className="font-medium text-emerald-300">Revision Day</span>{' '}
              to structure your week.
            </p>
          </div>

          {/* User + logout */}
          <div className="mt-auto border-t border-zinc-800/70 pt-4 text-[11px]">
            <p className="text-zinc-400">Logged in as</p>
            <p className="mt-0.5 truncate font-medium text-zinc-100">
              {userEmail}
            </p>
            <Button
              type="button"
              size="sm"
              onClick={handleLogout}
              className="mt-3 h-7 rounded-full bg-zinc-800 text-[11px] font-medium text-zinc-100 hover:bg-zinc-700"
            >
              Log out
            </Button>
            <p className="mt-3 text-[11px] text-zinc-500">
              Built with{' '}
              <span className="font-medium text-zinc-300">
                Next.js · Prisma · MongoDB
              </span>
            </p>
          </div>
        </aside>

        {/* Main content */}
        <section className="flex-1 px-4 py-5 sm:px-6 lg:px-8">
          {/* Top mobile bar (user info / logout) */}
          <div className="mb-4 flex items-center justify-between rounded-xl border border-zinc-800/70 bg-black/30 px-3 py-2 text-[11px] backdrop-blur-xl xl:hidden">
            <div className="min-w-0">
              <p className="text-zinc-400">Logged in as</p>
              <p className="truncate font-medium text-zinc-100">
                {userEmail}
              </p>
            </div>
            <Button
              type="button"
              size="sm"
              onClick={handleLogout}
              className="ml-3 h-7 rounded-full bg-zinc-800 text-[11px] font-medium text-zinc-100 hover:bg-zinc-700"
            >
              Log out
            </Button>
          </div>

          {/* Hero top bar */}
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[11px] font-medium text-fuchsia-50 backdrop-blur">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>📊 Daily Command Center</span>
              </div>
              <h2 className="text-balance text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
                Plan, drag, and finish your{' '}
                <span className="bg-gradient-to-r from-emerald-300 via-sky-300 to-fuchsia-300 bg-clip-text text-transparent">
                  Day by Flow
                </span>
                .
              </h2>
              <p className="mt-2 max-w-xl text-sm text-zinc-300">
                Every day has its own board. Move tasks between{' '}
                <span className="font-medium text-amber-300">Todo</span>,{' '}
                <span className="font-medium text-sky-300">In Process</span>, and{' '}
                <span className="font-medium text-emerald-300">Finished</span>{' '}
                with smooth drag &amp; drop and clear progress.
              </p>
            </div>

            {/* Status stats cards – SaaS color mix */}
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Card className="min-w-[120px] border-none bg-gradient-to-br from-slate-950 via-emerald-600/40 to-sky-600/30 shadow-sm shadow-emerald-500/30">
                <CardContent className="px-4 py-2">
                  <p className="text-[11px] text-emerald-100/80">Total</p>
                  <p className="text-lg font-semibold text-emerald-50">
                    {totalTasks}
                  </p>
                </CardContent>
              </Card>
              <Card className="min-w-[120px] border-none bg-gradient-to-br from-slate-950 via-amber-500/40 to-orange-500/30 shadow-sm shadow-amber-500/30">
                <CardContent className="px-4 py-2">
                  <p className="text-[11px] text-amber-100/80">Todo</p>
                  <p className="text-lg font-semibold text-amber-50">
                    {todoTasks}
                  </p>
                </CardContent>
              </Card>
              <Card className="min-w-[120px] border-none bg-gradient-to-br from-slate-950 via-sky-500/40 to-indigo-500/30 shadow-sm shadow-sky-500/30">
                <CardContent className="px-4 py-2">
                  <p className="text-[11px] text-sky-100/80">In Process</p>
                  <p className="text-lg font-semibold text-sky-50">
                    {inProcessTasks}
                  </p>
                </CardContent>
              </Card>
              <Card className="min-w-[120px] border-none bg-gradient-to-br from-slate-950 via-emerald-500/40 to-lime-500/30 shadow-sm shadow-emerald-500/30">
                <CardContent className="px-4 py-2">
                  <p className="text-[11px] text-emerald-100/80">Finished</p>
                  <p className="text-lg font-semibold text-emerald-50">
                    {finishedTasks}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Add new Day card */}
          <div>
            <Card className="mb-6 border border-zinc-800/70 bg-black/30 shadow-sm shadow-zinc-900/40 backdrop-blur-xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-zinc-50">
                  Create a new Day section
                </CardTitle>
                <p className="text-xs text-zinc-300">
                  Example:{' '}
                  <span className="font-medium">Day 1</span>,{' '}
                  <span className="font-medium">Deep Work Day</span>,{' '}
                  <span className="font-medium">Exam Prep</span>, etc.
                </p>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={handleCreateDay}
                  className="flex flex-col gap-2 sm:flex-row"
                >
                  <Input
                    value={newDayTitle}
                    onChange={(event) => setNewDayTitle(event.target.value)}
                    placeholder="New Day title (e.g. Day 1)"
                    className="border-zinc-700 bg-zinc-950/80 text-sm text-zinc-50 placeholder:text-zinc-500"
                  />
                  <Button
                    type="submit"
                    className="sm:w-auto rounded-full bg-gradient-to-r from-emerald-500 via-sky-500 to-fuchsia-500 text-xs font-semibold text-slate-950 shadow-emerald-500/30 hover:brightness-110"
                  >
                    + Add Day
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Days grid */}
          <div>
            <Card className="border border-zinc-800/70 bg-black/30 shadow-sm shadow-zinc-900/40 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-zinc-50">
                  Your Day Sections
                </CardTitle>
              </CardHeader>
              <CardContent>
                {days.length === 0 ? (
                  <p className="text-sm text-zinc-300">
                    No days created yet. Start by adding{' '}
                    <span className="font-medium text-emerald-300">
                      Day 1
                    </span>{' '}
                    above and drop your first tasks in.
                  </p>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
                    {days.map((day) => (
                      <DayBoard key={day.id} day={day} mutate={mutateDays} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}
