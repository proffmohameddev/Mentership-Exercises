'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = (await res.json()) as { message?: string };

      if (!res.ok) {
        setMessage(data.message ?? 'Failed to register.');
        setLoading(false);
        return;
      }

      setMessage('Admin created! Redirecting to login…');
      setTimeout(() => router.push('/login'), 900);
    } catch {
      setMessage('Something went wrong.');
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-[#050012] via-[#05000F] to-[#020008] px-4 text-zinc-50">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-10 h-72 w-72 rounded-full bg-fuchsia-500/30 blur-[90px]" />
        <div className="absolute top-16 right-4 h-72 w-72 rounded-full bg-indigo-500/25 blur-[110px]" />
        <div className="absolute bottom-[-6rem] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-500/30 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        {/* Mini badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-medium text-fuchsia-50 shadow-sm backdrop-blur">
          <span>⚡ One-time Admin Setup</span>
        </div>

        {/* Title */}
        <h1 className="text-balance text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl md:text-6xl">
          Welcome to{' '}
          <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
            MyTaskFlow&nbsp;Daily
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 max-w-xl text-balance text-sm text-zinc-200 sm:text-base">
          Create your private admin account and keep your task universe under
          control.{' '}
          <span className="font-semibold text-fuchsia-200">
            Only one admin. Fully yours.
          </span>
        </p>

        {/* Card */}
        <div className="mt-10 w-full max-w-md">
          <Card className="w-full border border-zinc-700/70 bg-zinc-900/80 shadow-xl shadow-black/40 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-zinc-50">
                Admin Registration
              </CardTitle>
              <p className="text-xs text-zinc-300">
                This will be your primary and only admin account.
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <Label
                    htmlFor="email"
                    className="text-xs font-medium text-zinc-200"
                  >
                    Admin Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="border-zinc-700 bg-zinc-900/70 text-zinc-50 placeholder:text-zinc-500"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label
                    htmlFor="password"
                    className="text-xs font-medium text-zinc-200"
                  >
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    minLength={6}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className="border-zinc-700 bg-zinc-900/70 text-zinc-50 placeholder:text-zinc-500"
                    required
                  />
                </div>

                {message && (
                  <p className="text-sm font-medium text-fuchsia-200">
                    {message}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="mt-1 w-full rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-purple-600 py-5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/40 transition hover:brightness-110 disabled:opacity-70"
                >
                  {loading ? 'Creating admin…' : 'Create Admin'}
                </Button>

                <p className="pt-2 text-center text-xs text-zinc-300">
                  Already have an admin?{' '}
                  <button
                    type="button"
                    onClick={() => router.push('/login')}
                    className="font-medium text-fuchsia-200 underline-offset-2 hover:underline"
                  >
                    Go to Login
                  </button>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
