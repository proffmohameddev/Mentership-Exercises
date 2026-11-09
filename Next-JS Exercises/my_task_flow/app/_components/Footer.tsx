// app/_components/footer.tsx
import Link from 'next/link';
import { Github, Twitter, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-800/70 bg-gradient-to-t from-[#050012] via-[#05000F] to-transparent">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand + CTA */}
          <div className="max-w-sm space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-500/40 bg-fuchsia-500/10 px-3 py-1 text-[11px] font-medium text-fuchsia-100 shadow-sm shadow-fuchsia-500/30">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>MyTaskFlow · AI Daily Planner</span>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-fuchsia-500 via-pink-500 to-purple-500 text-white shadow-md shadow-fuchsia-500/40">
                <span className="text-lg font-semibold leading-none">Mt</span>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-semibold tracking-tight text-zinc-50">
                  MyTaskFlow
                </span>
                <span className="text-xs text-zinc-400">
                  One admin. One daily command center.
                </span>
              </div>
            </div>

            <p className="text-sm text-zinc-400">
              Plan your day in focused sections, drag tasks across Todo, In
              Process, and Finished — and keep everything private to you as
              admin.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <Button
                asChild
                size="sm"
                className="rounded-full bg-gradient-to-r from-emerald-500 via-sky-500 to-fuchsia-500 text-xs font-semibold shadow-emerald-500/40 hover:brightness-110"
              >
                <Link href="/register">Create admin account</Link>
              </Button>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="rounded-full border-zinc-700 bg-zinc-900/60 text-xs text-zinc-200 hover:bg-zinc-800"
              >
                <Link href="/login">Go to dashboard</Link>
              </Button>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid flex-1 gap-6 text-sm text-zinc-300 sm:grid-cols-3">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Product
              </p>
              <ul className="space-y-1.5 text-xs">
                <li>
                  <Link
                    href="/"
                    className="text-zinc-300 transition hover:text-emerald-300"
                  >
                    Overview
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className="text-zinc-300 transition hover:text-emerald-300"
                  >
                    Daily Boards
                  </Link>
                </li>
                <li>
                  <span className="cursor-default text-zinc-500">
                    Kanban Statuses
                  </span>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Support
              </p>
              <ul className="space-y-1.5 text-xs">
                <li>
                  <span className="cursor-default text-zinc-400">
                    Docs (coming soon)
                  </span>
                </li>
                <li>
                  <span className="cursor-default text-zinc-400">
                    Help center
                  </span>
                </li>
                <li>
                  <span className="cursor-default text-zinc-400">
                    Report an issue
                  </span>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Creator
              </p>
              <ul className="space-y-1.5 text-xs">
                <li>
                  <span className="cursor-default text-zinc-300">
                    Built by Eng Abdalla
                  </span>
                </li>
                <li>
                  <Link
                    href="https://github.com/engabdullah-2024"
                    className="text-zinc-300 transition hover:text-fuchsia-300"
                  >
                    GitHub
                  </Link>
                </li>
                <li>
                  <span className="cursor-default text-zinc-500">
                    Somalia · Remote first
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Separator className="my-6 border-zinc-800/80" />

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} MyTaskFlow. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex gap-3">
              <Link
                href="#"
                className="hover:text-zinc-300"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="hover:text-zinc-300"
              >
                Terms
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full border border-zinc-700/70 bg-zinc-900/80 text-zinc-300 hover:bg-zinc-800"
              >
                <Github className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full border border-zinc-700/70 bg-zinc-900/80 text-zinc-300 hover:bg-zinc-800"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full border border-zinc-700/70 bg-zinc-900/80 text-zinc-300 hover:bg-zinc-800"
              >
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
