'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  KeyRound, 
  Sparkles, 
  RefreshCw, 
  ArrowLeft,
  Building2,
  UserCheck
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();

  // Mode: 'phone' (mobile login) | 'email' (work email)
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');
  
  // Step: 'input' | 'otp'
  const [step, setStep] = useState<'input' | 'otp'>('input');
  
  const [phone, setPhone] = useState('9876543210');
  const [email, setEmail] = useState('admin@grandhorizon.com');
  const [companyName, setCompanyName] = useState('Grand Horizon Hospitality');
  const [otp, setOtp] = useState(['1', '2', '3', '4']);
  const [countdown, setCountdown] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const otpInputs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'otp' && countdown > 0) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  const handleInputSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (authMethod === 'phone') {
      const cleanPhone = phone.replace(/\D/g, '');
      if (cleanPhone.length !== 10) {
        setErrorMsg('Please enter a valid 10-digit mobile number');
        return;
      }
    } else {
      if (!email.includes('@')) {
        setErrorMsg('Please enter a valid work email address');
        return;
      }
    }

    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setStep('otp');
      setCountdown(30);
    }, 500);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setErrorMsg('');

    if (value && index < 3) {
      otpInputs[index + 1].current?.focus();
    }
  };

  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      // Route user to /app dashboard
      router.push('/app');
    }, 600);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-slate-50 selection:bg-[#0B3C5D] selection:text-white">
      {/* Brand Hero Side (Deep Blue #0B3C5D) */}
      <div className="bg-[#0B3C5D] text-white px-6 sm:px-12 py-10 lg:w-7/12 flex flex-col justify-between relative overflow-hidden shrink-0 shadow-lg">
        {/* Glow Effects */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-sky-400/10 rounded-full pointer-events-none blur-3xl" />
        <div className="absolute bottom-10 -left-20 w-80 h-80 bg-blue-600/10 rounded-full pointer-events-none blur-2xl" />

        {/* Top Navbar in Hero */}
        <div className="flex items-center justify-between mb-8 relative z-10">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-bold text-sky-200 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold tracking-wide uppercase">Demand O Secure Login</span>
          </div>
        </div>

        {/* Centerpiece Content */}
        <div className="relative z-10 my-auto py-6">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border-2 border-black shadow-sharp text-[#0B3C5D] font-black text-2xl">
              D•O
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
                Demand O <span className="text-amber-400">Portal</span>
              </h1>
              <p className="text-sm text-sky-200 font-semibold">
                Single sign-on for Business Hirers & Marketplace Partners
              </p>
            </div>
          </div>

          <p className="text-slate-200 text-sm lg:text-base max-w-lg mt-3 leading-relaxed">
            Instant on-demand staffing for businesses, guaranteed daily payouts for partners, and 100% verified KYC.
          </p>

          {/* Highlights */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-xl">
            <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-4">
              <ShieldCheck className="w-5 h-5 text-emerald-300 mb-1.5" />
              <p className="font-extrabold text-xs text-white">Govt. Verified</p>
              <p className="text-[11px] text-slate-300 mt-0.5">Aadhaar & PSARA checked</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-4">
              <Sparkles className="w-5 h-5 text-amber-300 mb-1.5" />
              <p className="font-extrabold text-xs text-white">0% Platform Fee</p>
              <p className="text-[11px] text-slate-300 mt-0.5">30-day trial for hirers</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-4">
              <Building2 className="w-5 h-5 text-sky-300 mb-1.5" />
              <p className="font-extrabold text-xs text-white">Instant Escrow</p>
              <p className="text-[11px] text-slate-300 mt-0.5">Automatic shift settlements</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-sky-200">
          <span>Trusted by 500+ Businesses across India</span>
          <span className="font-bold">256-Bit SSL Encrypted</span>
        </div>
      </div>

      {/* Auth Card Side (Crisp White) */}
      <div className="-mt-8 lg:mt-0 flex-1 lg:w-5/12 bg-white rounded-t-3xl lg:rounded-none border-t-2 lg:border-t-0 lg:border-l-2 border-black px-6 sm:px-12 py-10 lg:py-16 flex flex-col justify-center shadow-2xl relative z-20">
        <div className="w-full max-w-md mx-auto">
          {/* Method Switcher: Phone vs Email */}
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl border-2 border-black mb-6 shadow-sharp-sm">
            <button
              type="button"
              onClick={() => {
                setAuthMethod('phone');
                setStep('input');
              }}
              className={`flex-1 py-2 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition-all ${
                authMethod === 'phone'
                  ? 'bg-[#0B3C5D] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Mobile OTP</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthMethod('email');
                setStep('input');
              }}
              className={`flex-1 py-2 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition-all ${
                authMethod === 'email'
                  ? 'bg-[#0B3C5D] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Business Email</span>
            </button>
          </div>

          <AnimatePresence mode="wait">
            {step === 'input' ? (
              <motion.div
                key="step-input"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-snug">
                    {authMethod === 'phone' ? 'Enter Mobile Number' : 'Enter Business Email'}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                    {authMethod === 'phone'
                      ? 'We will send a 4-digit verification code to start earning or hiring.'
                      : 'Sign in to access your employer staffing dashboard and job postings.'}
                  </p>
                </div>

                <form onSubmit={handleInputSubmit} className="space-y-4">
                  {authMethod === 'phone' ? (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Mobile Number
                      </label>
                      <div className="relative flex items-center border-2 border-black rounded-2xl bg-white focus-within:ring-4 focus-within:ring-[#0B3C5D]/20 transition-all overflow-hidden shadow-sharp-sm">
                        <div className="flex items-center gap-1.5 px-3.5 py-3.5 bg-slate-100 border-r-2 border-black text-slate-900 font-extrabold text-sm select-none">
                          <span>🇮🇳 +91</span>
                        </div>
                        <input
                          type="tel"
                          inputMode="numeric"
                          maxLength={10}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                          placeholder="98765 43210"
                          className="w-full px-4 py-3.5 text-lg font-bold tracking-widest text-slate-900 focus:outline-none"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                          Company / Business Name
                        </label>
                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="Grand Horizon Hospitality"
                          className="w-full px-4 py-3.5 text-sm font-bold text-slate-900 border-2 border-black rounded-2xl shadow-sharp-sm focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                          Work Email
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="admin@grandhorizon.com"
                          className="w-full px-4 py-3.5 text-sm font-bold text-slate-900 border-2 border-black rounded-2xl shadow-sharp-sm focus:outline-none"
                        />
                      </div>
                    </>
                  )}

                  {errorMsg && (
                    <p className="text-xs font-semibold text-rose-600 mt-2">
                      ⚠️ {errorMsg}
                    </p>
                  )}

                  {/* Primary Continue Button */}
                  <div className="mt-8 pt-4">
                    <button
                      type="button"
                      onClick={handleInputSubmit}
                      disabled={isSubmitting}
                      className="w-full min-h-[56px] py-4 px-6 rounded-2xl border-2 border-black font-extrabold text-base bg-[#0B3C5D] text-white hover:bg-[#07263b] shadow-sharp transition-all flex items-center justify-center gap-2 cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                    >
                      {isSubmitting ? (
                        <RefreshCw className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <span>Continue</span>
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="step-otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#0B3C5D] bg-blue-50 px-3 py-1 rounded-full flex items-center gap-1">
                      <KeyRound className="w-3.5 h-3.5" />
                      Verification Code
                    </span>
                    <button
                      type="button"
                      onClick={() => setStep('input')}
                      className="text-xs font-bold text-slate-600 underline hover:text-[#0B3C5D]"
                    >
                      Change input
                    </button>
                  </div>

                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    Enter 4-Digit Code
                  </h2>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    Sent to {authMethod === 'phone' ? `+91 ${phone}` : email}
                  </p>
                </div>

                {/* 4 OTP Boxes */}
                <div className="my-6">
                  <div className="flex items-center justify-center gap-3">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={otpInputs[idx]}
                        type="tel"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        className={`w-14 h-16 text-center text-2xl font-black rounded-2xl border-2 transition-all shadow-sharp-sm ${
                          digit
                            ? 'border-[#0B3C5D] bg-blue-50/50 text-[#0B3C5D]'
                            : 'border-black bg-white text-slate-900 focus:border-[#0B3C5D]'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Auto-fill demo button */}
                  <div className="mt-5 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setOtp(['1', '2', '3', '4'])}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B3C5D] bg-amber-50 hover:bg-amber-100 border border-amber-300 px-3 py-1.5 rounded-full transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Auto-fill: <strong>1234</strong></span>
                    </button>
                  </div>
                </div>

                {/* Resend info */}
                <div className="text-center text-xs text-slate-500 font-medium mb-6">
                  {countdown > 0 ? (
                    <p>Resend code in 00:{countdown.toString().padStart(2, '0')}</p>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setCountdown(30)}
                      className="font-bold text-[#0B3C5D] underline"
                    >
                      Resend OTP Code
                    </button>
                  )}
                </div>

                {/* SUBMIT BUTTON - Routes the user to /app */}
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting || otp.join('').length < 4}
                  className="w-full min-h-[56px] py-4 px-6 rounded-2xl border-2 border-black font-extrabold text-base bg-[#0B3C5D] text-white hover:bg-[#07263b] shadow-sharp transition-all flex items-center justify-center gap-2 cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                >
                  {isSubmitting ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span>Submit & Go to Dashboard</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                {/* Fallback Direct Link to /app */}
                <div className="mt-4 text-center">
                  <Link
                    href="/app"
                    className="text-xs font-bold text-slate-500 hover:text-black underline"
                  >
                    Skip directly to Dashboard (/app) →
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
