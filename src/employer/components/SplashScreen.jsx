import React, { useEffect, useState } from 'react';
import { ArrowRight, Shield, Zap, Sparkles } from 'lucide-react';

export default function SplashScreen({ onFinish }) {
  const [showHire, setShowHire] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Stage 1: Demand O logo appears immediately
    // Stage 2: "Hire" fades in underneath after 600ms
    const hireTimer = setTimeout(() => {
      setShowHire(true);
    }, 550);

    // Stage 3: Tagline fades in after 1100ms
    const tagTimer = setTimeout(() => {
      setShowTagline(true);
    }, 1100);

    // Progress bar animation over ~2.2 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2.5;
      });
    }, 50);

    // Auto transition after ~2.3 seconds
    const finishTimer = setTimeout(() => {
      onFinish();
    }, 2400);

    return () => {
      clearTimeout(hireTimer);
      clearTimeout(tagTimer);
      clearTimeout(finishTimer);
      clearInterval(interval);
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0A2342] text-white overflow-hidden select-none">
      {/* Background industrial geometric grid & subtle radial illumination */}
      <div 
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Subtle ambient blur glow */}
      <div className="absolute w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

      {/* Main Animated Branding Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg">
        
        {/* Animated Brand Emblem */}
        <div className="relative mb-6">
          <div className="w-20 h-20 bg-[#0B3C5D] border-2 border-white rounded-2xl flex items-center justify-center shadow-brutal transition-transform transform duration-700 ease-out scale-100 hover:rotate-3">
            <div className="relative flex items-center justify-center">
              {/* Outer ring */}
              <div className="w-12 h-12 rounded-full border-4 border-white flex items-center justify-center animate-pulse">
                {/* Core energetic dot */}
                <div className="w-4 h-4 rounded-full bg-[#00D26A] shadow-[0_0_12px_#00D26A]" />
              </div>
            </div>
          </div>
          {/* Accent badge */}
          <span className="absolute -top-2 -right-3 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-black border border-white text-emerald-400 rounded">
            B2B PORTAL
          </span>
        </div>

        {/* Brand Name "Demand O" */}
        <div className="flex flex-col items-center">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white flex items-center justify-center drop-shadow-md">
            <span>Demand</span>
            <span className="ml-3 inline-flex items-center justify-center w-11 h-11 rounded-full border-4 border-white text-3xl font-extrabold text-[#00D26A] bg-[#07192f]">
              O
            </span>
          </h1>

          {/* "Hire" text fading in underneath */}
          <div 
            className={`transition-all duration-700 ease-out transform ${
              showHire 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 -translate-y-4 scale-95'
            }`}
          >
            <div className="inline-block mt-2 px-4 py-1 bg-white text-[#0A2342] border-2 border-black font-black text-2xl md:text-3xl tracking-widest uppercase shadow-brutal-sm">
              HIRE
            </div>
          </div>
        </div>

        {/* Secondary description & value proposition */}
        <div 
          className={`mt-6 space-y-2 transition-all duration-700 ${
            showTagline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <p className="text-sm md:text-base font-medium text-slate-300">
            The "Amazon" of Service & Blue-Collar Workforce
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0f2d52] border border-slate-700 rounded-full text-xs text-emerald-300 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            First 30 Days: Zero Commission for Employers
          </div>
        </div>

        {/* Loading Progress Bar & Skip Button */}
        <div className="mt-10 w-full max-w-xs flex flex-col items-center">
          <div className="w-full bg-[#07192f] border-2 border-black h-3 rounded-full overflow-hidden p-0.5 shadow-brutal-sm">
            <div 
              className="bg-emerald-400 h-full rounded-full transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          <button
            onClick={onFinish}
            className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white transition-colors py-1.5 px-4 rounded border border-slate-700 hover:border-white bg-[#0f2d52]/60 hover:bg-[#0f2d52]"
          >
            <span>Enter Portal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Footer Industrial accreditation */}
      <div className="absolute bottom-4 text-center text-[11px] text-slate-400 font-mono">
        <span>ISO-9001 Compliant Workforce Infrastructure</span>
        <span className="mx-2">•</span>
        <span>Aadhaar & Police Verified</span>
      </div>
    </div>
  );
}
