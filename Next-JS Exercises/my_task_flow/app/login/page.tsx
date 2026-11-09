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

export default function LoginPage() {
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
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = (await res.json()) as { message?: string };

      if (!res.ok) {
        setMessage(data.message ?? 'Invalid email or password.');
        setLoading(false);
        return;
      }

      router.push('/dashboard');
    } catch {
      setMessage('Something went wrong.');
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-[#050012] via-[#05000F] to-[#020008] px-4 text-zinc-50">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-10 h-72 w-72 rounded-full bg-indigo-500/25 blur-[95px]" />
        <div className="absolute top-20 right-10 h-72 w-72 rounded-full bg-fuchsia-500/25 blur-[110px]" />
        <div className="absolute bottom-[-5rem] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-500/30 blur-[120px]" />
      </div>

      {/* Container */}
      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-medium text-indigo-100 backdrop-blur">
          <span>🔐 Secure Login</span>
        </div>

        {/* Title */}
        <h1 className="text-balance text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl md:text-6xl">
          Welcome Back to{' '}
          <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-pink-300 bg-clip-text text-transparent">
            MyTaskFlow Daily
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 max-w-xl text-balance text-sm text-zinc-300 sm:text-base">
          Log in to access your private, personalized task dashboard.
        </p>

        {/* Login Card */}
        <div className="mt-10 w-full max-w-md">
          <Card className="w-full border border-zinc-700/70 bg-zinc-900/80 shadow-xl shadow-black/40 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-zinc-50">
                Admin Login
              </CardTitle>
              <p className="text-xs text-zinc-300">
                Enter your credentials to continue.
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Email */}
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-xs font-medium text-zinc-200">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="border-zinc-700 bg-zinc-900/70 text-zinc-50 placeholder:text-zinc-500"
                    required
                  />
                </div>

                {/* Password */}
                <div className="space-y-1">
                  <Label htmlFor="password" className="text-xs font-medium text-zinc-200">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="border-zinc-700 bg-zinc-900/70 text-zinc-50 placeholder:text-zinc-500"
                    required
                  />
                </div>

                {/* Message */}
                {message && (
                  <p className="text-sm font-medium text-fuchsia-300">
                    {message}
                  </p>
                )}

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="mt-1 w-full rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-purple-600 py-5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/40 transition hover:brightness-110 disabled:opacity-70"
                >
                  {loading ? 'Checking…' : 'Login'}
                </Button>

                {/* Register Link */}
                <p className="pt-2 text-center text-xs text-zinc-300">
                  New here?{' '}
                  <button
                    type="button"
                    onClick={() => router.push('/register')}
                    className="font-medium text-fuchsia-200 underline-offset-2 hover:underline"
                  >
                    Create Admin
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
