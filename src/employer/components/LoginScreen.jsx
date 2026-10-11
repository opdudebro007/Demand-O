import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Lock, 
  Mail, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Eye, 
  EyeOff,
  Building2,
  Users2,
  Zap
} from 'lucide-react';

export default function LoginScreen({ onCompleteLogin }) {
  const [isSignUp, setIsSignUp] = useState(true);
  const [workEmail, setWorkEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onCompleteLogin({
        email: workEmail || 'admin@enterprise.com',
        companyName: companyName || 'Grand Horizon Hospitality'
      });
    }, 700);
  };

  const handleGoogleAuth = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onCompleteLogin({
        email: 'workspace@google.com',
        companyName: 'Apex Logistics Corp'
      });
    }, 600);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white selection:bg-[#0B3C5D] selection:text-white">
      
      {/* ================= LEFT SIDE: RICH DEEP BLUE WITH ABSTRACT GLOW ================= */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="lg:w-1/2 bg-[#0B3C5D] relative overflow-hidden flex flex-col justify-between p-8 sm:p-12 lg:p-16 text-white min-h-[420px] lg:min-h-screen"
      >
        {/* Subtle glowing abstract patterns & gradients */}
        <div className="absolute inset-0 bg-dot-pattern-light opacity-20 pointer-events-none" />
        
        {/* Dynamic ambient blur orbs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-400/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-80 h-80 rounded-full bg-[#00D26A]/15 blur-3xl pointer-events-none" />
        
        {/* Geometric subtle SVG contour grid */}
        <svg 
          className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>

        {/* Top Branding */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white text-[#0B3C5D] flex items-center justify-center font-black text-xl shadow-glow-sm border border-white/20">
              D
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight">Demand O</span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-[#00D26A] text-slate-950">
                  Hire
                </span>
              </div>
              <span className="text-[11px] font-medium text-blue-200/80 tracking-wide">
                Next-Gen Blue-Collar Marketplace
              </span>
            </div>
          </div>
        </div>

        {/* Center Hero Value Proposition (Linear / Vercel style) */}
        <div className="relative z-10 my-10 lg:my-auto max-w-lg">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-blue-100 font-medium backdrop-blur-md mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00D26A]" />
            <span>AI-Powered Autonomous Talent Matching</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15]"
          >
            The on-demand workforce infrastructure for modern business.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-4 text-sm sm:text-base text-blue-100/90 leading-relaxed font-normal"
          >
            Deploy verified cleaners, security guards, drivers, chefs, and technicians in under 20 minutes with zero contractor lock-in.
          </motion.p>

          {/* Social Proof Badges */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 pt-8 border-t border-white/15 grid grid-cols-3 gap-4"
          >
            <div>
              <div className="text-xl sm:text-2xl font-bold tracking-tight text-white">&lt; 18 min</div>
              <div className="text-[11px] text-blue-200/80 mt-0.5">Average dispatch ETA</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold tracking-tight text-[#00D26A]">100%</div>
              <div className="text-[11px] text-blue-200/80 mt-0.5">Aadhaar & Police Vetted</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold tracking-tight text-white">0% Fee</div>
              <div className="text-[11px] text-blue-200/80 mt-0.5">First 30 days active</div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Security Assurance */}
        <div className="relative z-10 flex items-center gap-2 text-xs text-blue-200/70 font-medium">
          <ShieldCheck className="w-4 h-4 text-[#00D26A]" />
          <span>Enterprise-grade encryption • ISO-9001 Compliant Escrow</span>
        </div>
      </motion.div>

      {/* ================= RIGHT SIDE: CLEAN WHITE CANVAS FORM ================= */}
      <motion.div 
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-white"
      >
        <div className="w-full max-w-md space-y-6">
          
          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {isSignUp ? 'Create your employer account' : 'Welcome back to Demand O'}
            </h2>
            <p className="text-sm text-slate-500">
              {isSignUp 
                ? 'Start hiring verified blue-collar workforce for your facility.' 
                : 'Sign in to access your jobs, rosters, and dispatch portal.'}
            </p>
          </div>

          {/* Social Sign In (Google) */}
          <div>
            <button
              type="button"
              onClick={handleGoogleAuth}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-black bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm transition-all duration-200 hover:shadow-subtle active:scale-[0.99]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-slate-200" />
            <span className="absolute bg-white px-3 text-xs text-slate-400 font-medium uppercase tracking-wider">
              Or with work email
            </span>
          </div>

          {/* Login / Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Entity or Hirer Name (only on Sign Up) */}
            {isSignUp && (
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                  Business / Household Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Grand Horizon Hotel or Sharma Villa"
                    className="ai-input w-full px-3.5 py-2.5 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 bg-white"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={workEmail}
                  onChange={(e) => setWorkEmail(e.target.value)}
                  placeholder="name@company.com or personal@gmail.com"
                  className="ai-input w-full px-3.5 py-2.5 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 bg-white"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-800">
                  Password
                </label>
                {!isSignUp && (
                  <button 
                    type="button"
                    className="text-xs text-[#0B3C5D] font-medium hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="ai-input w-full pl-3.5 pr-10 py-2.5 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Primary Action Button (Deep Blue with soft glowing drop shadow) */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-[#0B3C5D] hover:bg-[#09324e] text-white font-bold text-sm flex items-center justify-center gap-2 border border-black shadow-glow transition-all duration-200"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>{isSignUp ? 'Create Business Account' : 'Sign In to Portal'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          {/* Toggle between Sign Up and Login */}
          <div className="text-center pt-2">
            <p className="text-xs text-slate-600">
              {isSignUp ? 'Already registered on Demand O?' : "Don't have an enterprise account?"}{' '}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="font-bold text-[#0B3C5D] hover:underline"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>

          {/* Terms info */}
          <p className="text-[11px] text-slate-400 text-center leading-normal">
            By continuing, you agree to Demand O's Enterprise Service Agreement and acknowledge our verified compliance standards.
          </p>

        </div>
      </motion.div>

    </div>
  );
}
