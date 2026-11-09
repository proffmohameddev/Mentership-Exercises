'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Play, ShieldCheck, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function HeroPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] text-slate-50">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-10 h-80 w-80 rounded-full bg-sky-500/25 blur-[120px]" />
        <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-emerald-400/20 blur-[110px]" />
        <div className="absolute bottom-[-6rem] left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/15 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.4),_transparent_60%)]" />
      </div>

      {/* Shell container */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pb-10 pt-10 sm:px-6 lg:px-8">
        {/* Hero section (no header) */}
        <motion.section
          className="flex flex-1 flex-col gap-10 lg:flex-row lg:items-center"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Left column – copy */}
          <div className="flex-1">
            {/* Top badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-500/25 bg-slate-900/70 px-3 py-1 text-[11px] font-medium tracking-[0.16em] uppercase text-sky-100 shadow-sm backdrop-blur">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400 text-[10px] text-slate-950">
                ⚡
              </span>
              <span>One admin · Zero noise · Daily flow</span>
            </div>

            {/* Main heading */}
            <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Turn chaotic to-dos into a{' '}
              <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-300 bg-clip-text font-black text-transparent">
                calm personal command center.
              </span>
            </h1>

            {/* Subcopy */}
            <p className="mt-4 max-w-xl text-sm text-slate-300 sm:text-base">
              MyTaskFlow Daily is a founder-grade task OS. Organize your week by
              days, drag work across focused lanes, and see your true momentum —
              without teams, workspaces, or bloated PM tools.
            </p>

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 px-7 py-5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/40 hover:brightness-110"
              >
                <ArrowRight className="h-4 w-4" />
                Start my 7-day focus sprint
              </Button>

              <button
                type="button"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-200 hover:text-slate-50"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700/70 bg-slate-900/80">
                  <Play className="h-3.5 w-3.5 text-sky-300" />
                </span>
                <span className="text-xs sm:text-sm">
                  Watch 90-second product tour
                </span>
              </button>
            </div>

            {/* Social proof + guarantees */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-[11px] text-slate-400 sm:text-xs">
              <div className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Private by design · Single admin · Local to your flow</span>
              </div>
              <span className="hidden text-slate-600 sm:inline">•</span>
              <div className="inline-flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-sky-400" />
                <span>Measure shipped work, not vanity productivity stats</span>
              </div>
            </div>

            {/* Metrics strip */}
            <div className="mt-8 grid max-w-xl grid-cols-3 gap-4 text-[11px] text-slate-300 sm:text-xs">
              <div className="rounded-xl border border-slate-800/70 bg-slate-900/70 px-3 py-3">
                <p className="text-[11px] text-slate-400">Time reclaimed</p>
                <p className="mt-1 text-lg font-semibold text-sky-300">
                  40%+
                </p>
                <p className="mt-1 text-[11px] text-slate-500">
                  Avg. focus time lift after 2 weeks.
                </p>
              </div>
              <div className="rounded-xl border border-slate-800/70 bg-slate-900/70 px-3 py-3">
                <p className="text-[11px] text-slate-400">Setup time</p>
                <p className="mt-1 text-lg font-semibold text-emerald-300">
                  7 days
                </p>
                <p className="mt-1 text-[11px] text-slate-500">
                  To fully replace your current system.
                </p>
              </div>
              <div className="rounded-xl border border-slate-800/70 bg-slate-900/70 px-3 py-3">
                <p className="text-[11px] text-slate-400">Ownership</p>
                <p className="mt-1 text-lg font-semibold text-cyan-300">
                  1 admin
                </p>
                <p className="mt-1 text-[11px] text-slate-500">
                  You own every task, lane, and decision.
                </p>
              </div>
            </div>

            {/* Logos / trusted by */}
            <div className="mt-7 space-y-2 text-[11px] text-slate-500">
              <p className="uppercase tracking-[0.2em] text-slate-500">
                Trusted by
              </p>
              <div className="flex flex-wrap gap-4 text-[11px] text-slate-400">
                <span className="rounded-full border border-slate-800/80 px-3 py-1">
                  Indie SaaS founders
                </span>
                <span className="rounded-full border border-slate-800/80 px-3 py-1">
                  Student engineers
                </span>
                <span className="rounded-full border border-slate-800/80 px-3 py-1">
                  Solo product builders
                </span>
              </div>
            </div>
          </div>

          {/* Right column – live preview card */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.12 }}
          >
            <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-800/80 bg-slate-950/90 p-4 shadow-2xl shadow-sky-900/40 backdrop-blur-xl">
              {/* Top header */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="text-xs font-medium text-slate-200">
                    Day 3 · Deep Work Sprint
                  </span>
                </div>
                <Badge
                  variant="outline"
                  className="border-emerald-400/40 bg-emerald-400/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-200"
                >
                  Live board
                </Badge>
              </div>

              {/* Preview lanes */}
              <div className="grid grid-cols-3 gap-3 text-[11px]">
                {/* Column 1 */}
                <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-2">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-semibold text-slate-100">Todo</span>
                    <span className="text-[10px] text-slate-500">3</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="rounded-lg bg-slate-800/90 px-2 py-1.5 text-slate-100">
                      Wire up auth &amp; session
                    </div>
                    <div className="rounded-lg bg-slate-800/80 px-2 py-1.5 text-slate-100">
                      Draft launch tweet thread
                    </div>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="rounded-xl border border-sky-700/70 bg-slate-900/80 p-2">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-semibold text-sky-100">
                      In Process
                    </span>
                    <span className="text-[10px] text-slate-500">2</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="rounded-lg bg-sky-900/70 px-2 py-1.5 text-slate-50">
                      Build daily dashboard view
                    </div>
                    <div className="rounded-lg bg-sky-900/50 px-2 py-1.5 text-slate-50">
                      Hook metrics to events
                    </div>
                  </div>
                </div>

                {/* Column 3 */}
                <div className="rounded-xl border border-emerald-700/70 bg-slate-900/80 p-2">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-semibold text-emerald-100">
                      Finished
                    </span>
                    <span className="text-[10px] text-slate-500">5</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between rounded-lg bg-emerald-900/60 px-2 py-1.5 text-emerald-50">
                      <span>New hero experience</span>
                      <span className="text-[9px] text-emerald-200">
                        Today
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-emerald-900/40 px-2 py-1.5 text-emerald-50">
                      <span>Tasks engine v2</span>
                      <span className="text-[9px] text-emerald-200">
                        Yesterday
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom hint */}
              <div className="mt-4 flex items-center justify-between rounded-xl border border-dashed border-slate-800/80 bg-slate-900/70 px-3 py-2.5">
                <div className="flex flex-col text-[11px] text-slate-300">
                  <span className="font-medium text-slate-100">
                    Drag tasks across days and lanes.
                  </span>
                  <span className="text-slate-500">
                    MyTaskFlow keeps your work in motion while your UI stays
                    calm.
                  </span>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wide text-emerald-300">
                  Flow mode
                </span>
              </div>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </main>
  );
}
