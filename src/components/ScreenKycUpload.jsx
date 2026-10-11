import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, 
  UploadCloud, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  UserCheck, 
  FileText, 
  RotateCcw,
  Sparkles,
  Lock,
  Globe
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TRANSLATIONS } from '../data/categories';

export default function ScreenKycUpload({ onNext, onBack, lang, setLang, workerData, setWorkerData }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  
  const [aadhaarFile, setAadhaarFile] = useState(workerData.aadhaarPreview || null);
  const [selfieFile, setSelfieFile] = useState(workerData.selfiePreview || null);
  const [fullName, setFullName] = useState(workerData.name || 'Ramesh Kumar');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const aadhaarInputRef = useRef(null);
  const selfieInputRef = useRef(null);

  const handleAadhaarUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAadhaarFile(url);
    }
  };

  const handleSelfieUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelfieFile(url);
    }
  };

  // Demo auto-fill sample files for instant testing
  const handleQuickDemoUpload = () => {
    const sampleAadhaar = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="180" viewBox="0 0 300 180"><rect width="300" height="180" rx="12" fill="%23FFFFFF" stroke="%230B3C5D" stroke-width="4"/><rect x="20" y="20" width="60" height="70" rx="6" fill="%230B3C5D"/><circle cx="50" cy="45" r="16" fill="%23FFB800"/><rect x="95" y="25" width="160" height="12" rx="3" fill="%230B3C5D"/><rect x="95" y="45" width="120" height="10" rx="3" fill="%2394A3B8"/><rect x="95" y="65" width="140" height="10" rx="3" fill="%2394A3B8"/><text x="150" y="140" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="%230F172A">XXXX-XXXX-9021</text><rect x="0" y="165" width="300" height="15" fill="%2322C55E"/></svg>';
    
    const sampleSelfie = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" rx="100" fill="%230B3C5D"/><circle cx="100" cy="80" r="38" fill="%23FFD8A8"/><path d="M40 180 C 40 135, 160 135, 160 180" fill="%23FFB800"/><circle cx="85" cy="78" r="4" fill="%23000000"/><circle cx="115" cy="78" r="4" fill="%23000000"/><path d="M92 94 Q 100 102 108 94" stroke="%23B45309" stroke-width="3" fill="none" stroke-linecap="round"/></svg>';

    setAadhaarFile(sampleAadhaar);
    setSelfieFile(sampleSelfie);
  };

  const isFormComplete = Boolean(aadhaarFile && selfieFile && fullName.trim());

  const handleSubmit = () => {
    if (!isFormComplete) return;
    setIsSubmitting(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0B3C5D', '#22C55E', '#FFB800', '#38BDF8'],
      });
    } catch {
      // fallback
    }

    setWorkerData(prev => ({
      ...prev,
      name: fullName,
      aadhaarPreview: aadhaarFile,
      selfiePreview: selfieFile,
      isVerified: true,
      isOnline: true,
    }));

    setTimeout(() => {
      setIsSubmitting(false);
      onNext();
    }, 800);
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-slate-50">
      {/* Top Bar */}
      <header className="bg-white border-b-2 border-black px-4 sm:px-8 py-4 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-xl border-2 border-black bg-white flex items-center justify-center hover:bg-slate-100 active:scale-95 transition-all shadow-sharp-sm"
              title="Back"
            >
              <ArrowLeft className="w-5 h-5 text-slate-800" />
            </button>
            <div>
              <span className="text-xs font-black text-[#0B3C5D] uppercase tracking-wider block">
                Demand O Partner
              </span>
              <span className="text-sm font-extrabold text-slate-800">
                Step 3 of 3 • Identity KYC
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 bg-emerald-50 border border-emerald-400 px-3 py-1.5 rounded-full text-emerald-800 text-xs font-bold">
              <Lock className="w-3.5 h-3.5" />
              <span>256-Bit Encrypted & UIDAI Compliant</span>
            </div>

            <button
              onClick={() => setLang(prev => (prev === 'en' ? 'hi' : 'en'))}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-black/20 text-xs font-bold transition-all"
            >
              <Globe className="w-3.5 h-3.5 text-[#0B3C5D]" />
              <span>{lang === 'en' ? 'हिन्दी' : 'EN'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Responsive Body */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-32">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Govt. Approved Onboarding</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            {t.kycHeading}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium leading-relaxed">
            {t.kycSubheading}
          </p>
        </div>

        {/* Worker Full Name Input Card */}
        <div className="mb-8 bg-white border-2 border-black rounded-2xl p-5 sm:p-6 shadow-sharp-sm">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
            Your Full Legal Name / पूरा नाम
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. Ramesh Kumar"
            className="w-full px-4 py-3.5 rounded-xl border-2 border-black/40 font-bold text-slate-900 text-base focus:border-black focus:outline-none"
          />
          <p className="text-xs text-slate-500 mt-2">
            Must match your Aadhaar card name for verified instant bank transfers.
          </p>
        </div>

        {/* 2-Column Side-by-Side Upload Cards on Laptop / Stacked on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Upload Zone 1: Aadhaar Card or Govt ID */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#0B3C5D]" />
                <span>1. {t.uploadAadhaar}</span>
              </label>
              {aadhaarFile && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Ready
                </span>
              )}
            </div>

            <input
              ref={aadhaarInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAadhaarUpload}
            />

            {!aadhaarFile ? (
              <button
                type="button"
                onClick={() => aadhaarInputRef.current?.click()}
                className="flex-1 p-8 sm:p-10 border-2 border-dashed border-black rounded-2xl bg-white hover:bg-blue-50/50 flex flex-col items-center justify-center text-center transition-all cursor-pointer shadow-sharp-sm group min-h-[220px]"
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-50 border-2 border-black flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Camera className="w-8 h-8 text-[#0B3C5D]" />
                </div>
                <p className="font-extrabold text-base text-slate-900">
                  Tap to Take Picture or Upload
                </p>
                <p className="text-xs text-slate-500 mt-1 max-w-xs font-medium">
                  {t.uploadAadhaarDesc}
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#0B3C5D] bg-blue-100/60 px-3 py-1 rounded-full">
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>Front Side of Card</span>
                </div>
              </button>
            ) : (
              <div className="border-2 border-black rounded-2xl bg-white p-4 shadow-sharp-sm flex flex-col justify-between flex-1">
                <div className="relative rounded-xl overflow-hidden border border-black/20 bg-slate-100 flex items-center justify-center min-h-[160px] p-2">
                  <img
                    src={aadhaarFile}
                    alt="Aadhaar Preview"
                    className="w-full h-auto object-contain max-h-48"
                  />
                  <div className="absolute top-2 right-2 bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Uploaded
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Aadhaar_Document.jpg</span>
                  <button
                    type="button"
                    onClick={() => aadhaarInputRef.current?.click()}
                    className="text-xs font-bold text-[#0B3C5D] hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    {t.reupload}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Upload Zone 2: Take a Selfie */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-[#0B3C5D]" />
                <span>2. {t.takeSelfie}</span>
              </label>
              {selfieFile && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Ready
                </span>
              )}
            </div>

            <input
              ref={selfieInputRef}
              type="file"
              accept="image/*"
              capture="user"
              className="hidden"
              onChange={handleSelfieUpload}
            />

            {!selfieFile ? (
              <button
                type="button"
                onClick={() => selfieInputRef.current?.click()}
                className="flex-1 p-8 sm:p-10 border-2 border-dashed border-black rounded-2xl bg-white hover:bg-amber-50/40 flex flex-col items-center justify-center text-center transition-all cursor-pointer shadow-sharp-sm group min-h-[220px]"
              >
                <div className="w-16 h-16 rounded-full bg-amber-50 border-2 border-black flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Camera className="w-8 h-8 text-amber-600" />
                </div>
                <p className="font-extrabold text-base text-slate-900">
                  Tap to Take Live Selfie
                </p>
                <p className="text-xs text-slate-500 mt-1 max-w-xs font-medium">
                  {t.takeSelfieDesc}
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-100/70 px-3 py-1 rounded-full">
                  <span>Front camera photo</span>
                </div>
              </button>
            ) : (
              <div className="border-2 border-black rounded-2xl bg-white p-4 shadow-sharp-sm flex flex-col justify-between flex-1">
                <div className="relative rounded-xl overflow-hidden border border-black/20 bg-slate-100 flex items-center justify-center min-h-[160px] p-2">
                  <img
                    src={selfieFile}
                    alt="Selfie Preview"
                    className="w-36 h-36 object-cover rounded-full my-2 border-3 border-[#0B3C5D]"
                  />
                  <div className="absolute top-2 right-2 bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Face Matched
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Live_Selfie.jpg</span>
                  <button
                    type="button"
                    onClick={() => selfieInputRef.current?.click()}
                    className="text-xs font-bold text-[#0B3C5D] hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    {t.reupload}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Demo Autofill Helper Button */}
        {(!aadhaarFile || !selfieFile) && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={handleQuickDemoUpload}
              className="inline-flex items-center gap-2 text-xs font-extrabold text-[#0B3C5D] bg-blue-100/70 hover:bg-blue-100 border border-[#0B3C5D]/30 px-4 py-2 rounded-full transition-colors shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Auto-load Sample Aadhaar & Selfie (Demo)</span>
            </button>
          </div>
        )}
      </main>

      {/* Sticky Bottom Action Bar on Mobile / Docked on Laptop */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-black p-4 z-40 shadow-2xl">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <p className="text-xs font-bold text-slate-600">
              Identity documents are stored safely with bank-grade encryption.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isFormComplete || isSubmitting}
            className={`w-full sm:w-auto sm:min-w-[320px] min-h-[56px] py-4 px-8 rounded-2xl border-2 border-black font-extrabold text-base flex items-center justify-center gap-2 shadow-sharp transition-all duration-150 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${
              isFormComplete
                ? 'bg-[#0B3C5D] text-white hover:bg-[#07263b] cursor-pointer'
                : 'bg-slate-200 text-slate-400 border-slate-400 cursor-not-allowed shadow-none'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                Verifying & Creating Partner Account...
              </span>
            ) : (
              <>
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>{t.submitGoOnline}</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
