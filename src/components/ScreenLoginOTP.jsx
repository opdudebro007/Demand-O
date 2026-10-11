import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  RefreshCw, 
  KeyRound, 
  Globe, 
  Sparkles,
  Award,
  Wallet,
  Clock,
  HeartHandshake
} from 'lucide-react';
import { TRANSLATIONS } from '../data/categories';

export default function ScreenLoginOTP({ onNext, lang, setLang, workerData, setWorkerData, onSwitchToEmployer }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [phone, setPhone] = useState(workerData.phone || '');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [countdown, setCountdown] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const otpInputs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Timer countdown for OTP
  useEffect(() => {
    let timer;
    if (step === 'otp' && countdown > 0) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  const handlePhoneSubmit = (e) => {
    e?.preventDefault();
    const cleanNumber = phone.replace(/\D/g, '');
    if (cleanNumber.length !== 10) {
      setErrorMsg(lang === 'hi' ? 'कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें' : 'Please enter a valid 10-digit mobile number');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setWorkerData(prev => ({ ...prev, phone: cleanNumber }));
      setStep('otp');
      setCountdown(30);
      setOtp(['', '', '', '']);
      setTimeout(() => {
        otpInputs[0].current?.focus();
      }, 300);
    }, 600);
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setErrorMsg('');

    if (value && index < 3) {
      otpInputs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs[index - 1].current?.focus();
    }
  };

  const handleAutoFillDemo = () => {
    setOtp(['1', '2', '3', '4']);
    setErrorMsg('');
  };

  const handleVerifyOtp = () => {
    const fullOtp = otp.join('');
    if (fullOtp.length !== 4) {
      setErrorMsg(lang === 'hi' ? 'कृपया 4 अंकों का ओटीपी दर्ज करें' : 'Please enter 4-digit OTP code');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onNext();
    }, 650);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-slate-50">
      {/* Brand Side / Hero: Deep Blue (#0B3C5D) - Top on Mobile, Left 55% on Laptop */}
      <div className="bg-[#0B3C5D] text-white px-6 pt-8 pb-12 lg:p-14 lg:w-7/12 flex flex-col justify-between relative overflow-hidden shrink-0 shadow-lg">
        {/* Decorative background glows */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-sky-400/10 rounded-full pointer-events-none blur-3xl" />
        <div className="absolute bottom-10 -left-20 w-80 h-80 bg-blue-600/10 rounded-full pointer-events-none blur-2xl" />

        {/* Top Navbar Row */}
        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold tracking-wide uppercase">Partner Portal • वर्कर ऐप</span>
          </div>

          {/* Language Switcher */}
          <button
            onClick={() => setLang(prev => (prev === 'en' ? 'hi' : 'en'))}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 text-xs font-bold transition-all"
            title="Toggle Language"
          >
            <Globe className="w-3.5 h-3.5 text-yellow-300" />
            <span>{lang === 'en' ? 'हिन्दी में बदलें' : 'Switch to English'}</span>
          </button>
        </div>

        {/* Brand Centerpiece */}
        <div className="relative z-10 my-auto py-4">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border-2 border-black shadow-sharp">
              <span className="text-[#0B3C5D] font-black text-2xl tracking-tighter">D•O</span>
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
                Demand O <span className="text-amber-400">Partner</span>
              </h1>
              <p className="text-sm text-sky-200 font-semibold">
                {t.tagline}
              </p>
            </div>
          </div>

          <p className="text-slate-200 text-sm lg:text-base max-w-lg mt-3 leading-relaxed hidden sm:block">
            {lang === 'hi'
              ? 'सफाईकर्मी, ड्राइवर, सुरक्षा गार्ड, शेफ और प्लंबर के लिए भारत का सबसे भरोसेमंद ऐप। रोजाना सीधा बैंक खाते में भुगतान और 0% कमीशन।'
              : 'Empowering India’s blue-collar workforce with guaranteed local bookings, daily instant UPI bank settlements, and dignity of work.'}
          </p>

          {/* Desktop/Tablet Feature Badges Grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-xl">
            <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-3.5">
              <Wallet className="w-5 h-5 text-amber-300 mb-1.5" />
              <p className="font-extrabold text-xs text-white">Daily Bank Payout</p>
              <p className="text-[11px] text-slate-300 mt-0.5">Direct UPI deposit every night</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-3.5">
              <ShieldCheck className="w-5 h-5 text-emerald-300 mb-1.5" />
              <p className="font-extrabold text-xs text-white">Free ₹5L Insurance</p>
              <p className="text-[11px] text-slate-300 mt-0.5">Accident cover for all on-duty</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-3.5">
              <HeartHandshake className="w-5 h-5 text-sky-300 mb-1.5" />
              <p className="font-extrabold text-xs text-white">0% Commission</p>
              <p className="text-[11px] text-slate-300 mt-0.5">Keep 100% of your earnings</p>
            </div>
          </div>
        </div>

        {/* Footer Trust Ticker */}
        <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-sky-200">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>25,000+ Active Partners Across India</span>
          </div>
          <span className="font-bold">Govt. Registered</span>
        </div>
      </div>

      {/* Auth Card Container - Slides up on Mobile, Right 45% on Laptop */}
      <div className="-mt-8 lg:mt-0 flex-1 lg:w-5/12 bg-white rounded-t-3xl lg:rounded-none border-t-2 lg:border-t-0 lg:border-l-2 border-black/80 px-6 sm:px-10 py-8 lg:py-16 flex flex-col justify-center shadow-2xl relative z-20">
        <div className="w-full max-w-md mx-auto">
          <AnimatePresence mode="wait">
            {step === 'phone' ? (
              <motion.div
                key="step-phone"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col justify-between"
              >
                <div>
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B3C5D] bg-blue-50 px-3 py-1 rounded-full mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Instant FTUX Registration</span>
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-snug">
                      {t.loginHeading}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1.5 font-medium leading-relaxed">
                      {t.loginSubheading}
                    </p>
                  </div>

                  {/* Mobile Phone Input Form */}
                  <form onSubmit={handlePhoneSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Mobile Number / मोबाइल नंबर
                      </label>

                      <div className="relative flex items-center border-2 border-black rounded-2xl bg-white focus-within:ring-4 focus-within:ring-[#0B3C5D]/20 focus-within:border-[#0B3C5D] transition-all overflow-hidden shadow-sharp-sm">
                        <div className="flex items-center gap-1.5 px-3.5 py-4 bg-slate-100 border-r-2 border-black text-slate-900 font-extrabold text-sm select-none">
                          <span className="text-base">🇮🇳</span>
                          <span>+91</span>
                        </div>
                        <input
                          type="tel"
                          inputMode="numeric"
                          maxLength={10}
                          autoFocus
                          value={phone}
                          onChange={(e) => {
                            const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
                            setPhone(digits);
                            if (errorMsg) setErrorMsg('');
                          }}
                          placeholder="98765 43210"
                          className="w-full px-4 py-4 text-xl font-bold tracking-widest text-slate-900 placeholder:text-slate-400 placeholder:tracking-normal focus:outline-none"
                        />
                        {phone.length === 10 && (
                          <div className="pr-4 text-emerald-600">
                            <CheckCircle2 className="w-6 h-6 fill-emerald-100" />
                          </div>
                        )}
                      </div>

                      {errorMsg && (
                        <p className="text-xs font-semibold text-rose-600 mt-2 flex items-center gap-1">
                          ⚠️ {errorMsg}
                        </p>
                      )}
                    </div>

                    {/* Trust Highlights card */}
                    <div className="bg-slate-50 border border-black/10 rounded-2xl p-4 flex items-start gap-3 mt-4">
                      <div className="w-9 h-9 rounded-xl bg-blue-100/80 text-[#0B3C5D] flex items-center justify-center shrink-0 font-bold text-sm">
                        ₹
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Direct to Bank / UPI Transfer</p>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                          Daily earnings credited directly to your bank account with zero platform delay.
                        </p>
                      </div>
                    </div>
                  </form>
                </div>

                {/* Massive Primary CTA Button (Min-height 56px) */}
                <div className="mt-8 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handlePhoneSubmit}
                    disabled={isSubmitting || phone.length < 10}
                    className={`w-full min-h-[56px] py-4 px-6 rounded-2xl border-2 border-black font-extrabold text-base flex items-center justify-center gap-2 shadow-sharp transition-all duration-150 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${
                      phone.length === 10
                        ? 'bg-[#0B3C5D] text-white hover:bg-[#07263b] cursor-pointer'
                        : 'bg-slate-200 text-slate-400 border-slate-400 cursor-not-allowed shadow-none'
                    }`}
                  >
                    {isSubmitting ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <span>{t.getOtp}</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  {onSwitchToEmployer && (
                    <div className="mt-3.5 text-center">
                      <button
                        type="button"
                        onClick={onSwitchToEmployer}
                        className="text-xs font-bold text-[#0B3C5D] hover:underline inline-flex items-center gap-1"
                      >
                        <span>Looking to hire workers? Switch to Employer Dashboard →</span>
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="step-otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col justify-between"
              >
                <div>
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-[#0B3C5D] bg-blue-50 px-3 py-1 rounded-full flex items-center gap-1">
                        <KeyRound className="w-3.5 h-3.5" />
                        OTP Verification
                      </span>
                      <button
                        onClick={() => setStep('phone')}
                        className="text-xs font-bold text-slate-600 underline hover:text-[#0B3C5D]"
                      >
                        {t.changeNumber}
                      </button>
                    </div>

                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                      {t.otpSentTo}
                    </h2>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-base font-black text-slate-900 tracking-wider">
                        +91 {phone}
                      </span>
                      <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                        SMS Sent
                      </span>
                    </div>
                  </div>

                  {/* 4-Digit OTP Boxes */}
                  <div className="my-6">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 text-center">
                      Enter 4-Digit Code
                    </label>
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
                          onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                          className={`w-14 h-16 sm:w-16 sm:h-18 text-center text-2xl font-black rounded-2xl border-2 transition-all shadow-sharp-sm ${
                            digit
                              ? 'border-[#0B3C5D] bg-blue-50/50 text-[#0B3C5D]'
                              : 'border-black bg-white text-slate-900 focus:border-[#0B3C5D] focus:ring-4 focus:ring-[#0B3C5D]/20'
                          }`}
                        />
                      ))}
                    </div>

                    {errorMsg && (
                      <p className="text-xs font-semibold text-rose-600 mt-3 text-center">
                        ⚠️ {errorMsg}
                      </p>
                    )}

                    {/* Demo Helper Shortcut */}
                    <div className="mt-6 flex justify-center">
                      <button
                        type="button"
                        onClick={handleAutoFillDemo}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B3C5D] bg-amber-50 hover:bg-amber-100 border border-amber-300 px-3.5 py-2 rounded-full transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>Demo Auto-fill: <strong>1234</strong></span>
                      </button>
                    </div>
                  </div>

                  {/* Resend Logic */}
                  <div className="text-center text-xs text-slate-500 font-medium mt-4">
                    {countdown > 0 ? (
                      <p>
                        {t.resendIn} <span className="font-bold text-slate-800">00:{countdown.toString().padStart(2, '0')}</span>
                      </p>
                    ) : (
                      <button
                        onClick={() => setCountdown(30)}
                        className="font-bold text-[#0B3C5D] underline inline-flex items-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3" />
                        {t.resendNow}
                      </button>
                    )}
                  </div>
                </div>

                {/* Massive Action Button */}
                <div className="mt-8 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={isSubmitting || otp.join('').length < 4}
                    className={`w-full min-h-[56px] py-4 px-6 rounded-2xl border-2 border-black font-extrabold text-base flex items-center justify-center gap-2 shadow-sharp transition-all duration-150 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${
                      otp.join('').length === 4
                        ? 'bg-[#0B3C5D] text-white hover:bg-[#07263b] cursor-pointer'
                        : 'bg-slate-200 text-slate-400 border-slate-400 cursor-not-allowed shadow-none'
                    }`}
                  >
                    {isSubmitting ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <span>{t.verifyAndContinue}</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
