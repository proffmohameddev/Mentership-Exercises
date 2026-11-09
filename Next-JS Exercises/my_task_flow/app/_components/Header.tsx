// app/_components/header.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type CurrentUser = {
  id: string;
  email: string;
};

export function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<CurrentUser | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  // Load current user from API
  useEffect(() => {
    let cancelled = false;

    const loadUser = async () => {
      setIsLoadingUser(true);
      try {
        const res = await fetch('/api/auth/me', {
          cache: 'no-store',
          credentials: 'include',
        });

        if (!res.ok) {
          // 401 or any error → treat as logged out
          if (!cancelled) {
            setUser(null);
          }
        } else {
          const data = (await res.json()) as CurrentUser;
          if (!cancelled) {
            setUser(data);
          }
        }
      } catch {
        if (!cancelled) {
          setUser(null);
        }
      } finally {
        if (!cancelled) {
          setIsLoadingUser(false);
        }
      }
    };

    void loadUser();
    setMenuOpen(false);

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch {
      // ignore
    }
    setUser(null);
    setMenuOpen(false);
    router.push('/login');
  }

  function handleGoDashboard() {
    setMenuOpen(false);
    router.push('/dashboard');
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-zinc-800/70 bg-gradient-to-r from-[#130024]/90 via-[#050012]/90 to-[#020008]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Logo + label */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-fuchsia-500 via-pink-500 to-purple-500 text-white shadow-md shadow-fuchsia-500/40">
            <span className="text-lg font-semibold leading-none">Mt</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-base font-semibold tracking-tight text-zinc-50">
              MyTaskFlow
            </span>
            <span className="inline-flex items-center rounded-full bg-fuchsia-500/15 px-3 py-0.5 text-[11px] font-medium text-fuchsia-200 shadow-sm shadow-fuchsia-500/30">
              AI Daily Planner
            </span>
          </div>
        </Link>

        {/* Right side */}
        <nav className="relative flex items-center gap-3">
          {/* While loading user, don't show wrong UI (no buttons flash) */}
          {isLoadingUser ? (
            <div className="flex items-center gap-2">
              <div className="h-8 w-20 animate-pulse rounded-full bg-zinc-800/70" />
              <div className="h-8 w-24 animate-pulse rounded-full bg-zinc-800/70" />
            </div>
          ) : !user ? (
            // Not logged in → show auth buttons
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-zinc-300 transition hover:text-zinc-50"
              >
                Sign in
              </Link>

              <Button
                asChild
                className="rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-fuchsia-500/40 transition hover:brightness-110"
              >
                <Link href="/register">Sign up</Link>
              </Button>
            </>
          ) : (
            // Logged in → show user pill + dropdown
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-full border border-zinc-700/80 bg-zinc-900/70 px-3 py-1.5 text-xs font-medium text-zinc-100 shadow-sm shadow-black/40 hover:border-zinc-500 hover:bg-zinc-900/90"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-fuchsia-500 via-pink-500 to-purple-500 text-[11px] font-semibold">
                  {user.email.charAt(0).toUpperCase()}
                </span>
                <span className="hidden max-w-[140px] truncate sm:inline">
                  {user.email}
                </span>
                <ChevronDown className="h-4 w-4 text-zinc-300" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48">
                  <Card className="border-zinc-800/80 bg-zinc-950/95 shadow-lg shadow-black/40">
                    <CardContent className="p-2 text-xs text-zinc-200">
                      <p className="mb-2 truncate text-[11px] text-zinc-400">
                        Signed in as
                        <br />
                        <span className="font-medium text-zinc-100">
                          {user.email}
                        </span>
                      </p>
                      <button
                        type="button"
                        onClick={handleGoDashboard}
                        className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-[12px] hover:bg-zinc-800"
                      >
                        <span>Dashboard</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="mt-1 flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-[12px] text-rose-300 hover:bg-zinc-900"
                      >
                        <span>Log out</span>
                      </button>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
