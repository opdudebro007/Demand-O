'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Users, 
  Briefcase, 
  Building2, 
  CheckCircle2, 
  Clock, 
  Award,
  Radio
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col justify-between selection:bg-[#0B3C5D] selection:text-white">
      {/* Top Navbar */}
      <header className="w-full bg-white border-b-2 border-black px-6 lg:px-12 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-[#0B3C5D] rounded-2xl flex items-center justify-center border-2 border-black shadow-sharp text-white font-black text-xl">
            D•O
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">
              Demand <span className="text-[#0B3C5D]">O</span>
            </h1>
            <p className="text-xs text-slate-500 font-bold mt-0.5">
              Workforce Marketplace
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-5 py-2.5 rounded-xl border-2 border-black font-extrabold text-xs sm:text-sm bg-[#0B3C5D] text-white hover:bg-[#07263b] shadow-sharp transition-all flex items-center gap-1.5"
          >
            <span>Sign In / Enter</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Hero Splash Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-12 lg:py-16 flex flex-col items-center justify-center text-center">
        {/* Trust Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border-2 border-[#0B3C5D]/30 text-[#0B3C5D] text-xs font-black mb-6"
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>India's Verified On-Demand Blue-Collar Marketplace</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight max-w-4xl"
        >
          Reliable Staffing for Businesses,{' '}
          <span className="text-[#0B3C5D] underline decoration-amber-400 decoration-wavy decoration-2">
            Instant Work
          </span>{' '}
          for Partners.
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-slate-600 max-w-2xl mt-4 font-medium leading-relaxed"
        >
          Connecting verified sweepers, drivers, security guards, chefs, and helpers with top hotels, warehouses, and households in minutes.
        </motion.p>

        {/* Big Working Next.js <Link> Button to /login */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="/login"
            className="w-full sm:w-auto min-h-[58px] px-8 py-4 rounded-2xl bg-[#0B3C5D] text-white font-extrabold text-base border-2 border-black shadow-sharp hover:bg-[#07263b] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-3"
          >
            <span>Proceed to Login / Register</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </Link>

          <Link
            href="/app"
            className="w-full sm:w-auto min-h-[58px] px-8 py-4 rounded-2xl bg-white text-slate-900 font-extrabold text-base border-2 border-black shadow-sharp-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
          >
            <Building2 className="w-5 h-5 text-[#0B3C5D]" />
            <span>Go to App Dashboard</span>
          </Link>
        </motion.div>

        {/* Value Highlights Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full text-left">
          <div className="bg-white border-2 border-black rounded-3xl p-6 shadow-sharp">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border-2 border-black flex items-center justify-center text-[#0B3C5D] mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-black text-lg text-slate-900">18-Min Dispatch</h3>
            <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
              Nearby GPS-tracked workforce ready to arrive at your site on instant notice.
            </p>
          </div>

          <div className="bg-white border-2 border-black rounded-3xl p-6 shadow-sharp">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border-2 border-black flex items-center justify-center text-emerald-700 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-black text-lg text-slate-900">100% Aadhaar Verified</h3>
            <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
              Police clearance and government identity checked for all personnel.
            </p>
          </div>

          <div className="bg-white border-2 border-black rounded-3xl p-6 shadow-sharp">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border-2 border-black flex items-center justify-center text-amber-700 mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-black text-lg text-slate-900">0% Commission Trial</h3>
            <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
              30 days free platform fee for employers, and daily UPI payouts for partners.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t-2 border-black px-6 py-4 text-center text-xs text-slate-500 font-bold">
        <span>Demand O Inc. © 2026 • Verified Workforce Solutions</span>
      </footer>
    </div>
  );
}
