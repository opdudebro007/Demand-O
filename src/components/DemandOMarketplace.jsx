'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smartphone, 
  Monitor, 
  RotateCcw, 
  Sparkles, 
  Building2, 
  UserCheck, 
  Briefcase 
} from 'lucide-react';
import ScreenLoginOTP from './ScreenLoginOTP';
import ScreenCategorySelection from './ScreenCategorySelection';
import ScreenKycUpload from './ScreenKycUpload';
import ScreenRadarDashboard from './ScreenRadarDashboard';
import EmployerApp from '../employer/App';

export default function DemandOMarketplace({
  initialPortal = 'partner',
  initialPartnerScreen = 1,
  initialEmployerScreen = 'dashboard'
}) {
  // Global Portal Mode: 'partner' | 'employer'
  const [portal, setPortal] = useState(initialPortal);

  // Navigation Screens inside Partner Portal: 1 | 2 | 3 | 4
  const [currentScreen, setCurrentScreen] = useState(initialPartnerScreen);
  const [direction, setDirection] = useState(1);
  const [lang, setLang] = useState('en');

  // Device view testing helper: 'responsive' (full width, adapting to laptop or mobile) vs 'mobile-simulation'
  const [viewMode, setViewMode] = useState('responsive');

  // FTUX Brand-new Worker Profile State
  const [workerData, setWorkerData] = useState({
    phone: '',
    name: 'Ramesh Kumar',
    category: null,
    experience: '1-3 years',
    aadhaarPreview: null,
    selfiePreview: null,
    isVerified: false,
    isOnline: true,
  });

  const goToScreen = (screenNumber) => {
    setDirection(screenNumber > currentScreen ? 1 : -1);
    setCurrentScreen(screenNumber);
  };

  const handleReset = () => {
    setWorkerData({
      phone: '',
      name: 'Ramesh Kumar',
      category: null,
      experience: '1-3 years',
      aadhaarPreview: null,
      selfiePreview: null,
      isVerified: false,
      isOnline: true,
    });
    setDirection(-1);
    setCurrentScreen(1);
  };

  // Animation variants for smooth screen transitions
  const pageVariants = {
    initial: (dir) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 350, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (dir) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 350, damping: 30 },
        opacity: { duration: 0.15 },
      },
    }),
  };

  return (
    <div className="min-h-screen w-full bg-slate-100 text-slate-900 flex flex-col font-sans selection:bg-[#0B3C5D] selection:text-white relative">
      {/* Sticky Top Marketplace Switcher Bar (Present across all views) */}
      <div className="bg-[#07263b] text-white px-3 sm:px-6 py-2.5 text-xs border-b-2 border-black flex items-center justify-between sticky top-0 z-50 shadow-md">
        {/* Brand identity */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#0B3C5D] border border-amber-400 flex items-center justify-center font-black text-amber-400 text-xs shadow-sm">
            DO
          </div>
          <span className="font-black text-amber-400 tracking-wider uppercase text-xs">
            Demand O
          </span>
          <span className="hidden md:inline text-slate-400 text-[11px]">
            • Dual Marketplace Portal
          </span>
        </div>

        {/* Center: Segmented Portal Switcher Pills */}
        <div className="flex items-center bg-black/50 p-1 rounded-xl border border-white/20 shadow-inner">
          <button
            type="button"
            onClick={() => setPortal('partner')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-black text-xs transition-all cursor-pointer ${
              portal === 'partner'
                ? 'bg-[#0B3C5D] text-white shadow-sharp-sm border border-sky-400 ring-1 ring-sky-400/40'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Worker / Partner App</span>
            <span className="sm:hidden">Partner</span>
          </button>

          <button
            type="button"
            onClick={() => setPortal('employer')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-black text-xs transition-all cursor-pointer ${
              portal === 'employer'
                ? 'bg-[#0B3C5D] text-white shadow-sharp-sm border border-sky-400 ring-1 ring-sky-400/40'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Employer Dashboard</span>
            <span className="sm:hidden">Employer</span>
          </button>
        </div>

        {/* Right Controls: Stage Navigator & View Mode */}
        <div className="flex items-center gap-2">
          {/* Partner Stage Jumpers (When in Partner mode) */}
          {portal === 'partner' && (
            <div className="hidden sm:flex items-center gap-1 bg-white/10 px-2 py-1 rounded-lg border border-white/15">
              <span className="text-[10px] text-slate-300 font-bold mr-0.5">Partner:</span>
              {[1, 2, 3, 4].map((step) => (
                <button
                  key={step}
                  type="button"
                  onClick={() => goToScreen(step)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-colors cursor-pointer ${
                    currentScreen === step 
                      ? 'bg-amber-400 text-slate-950 font-black' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Step {step}
                </button>
              ))}
            </div>
          )}

          {/* View Mode Toggle */}
          <button
            type="button"
            onClick={() => setViewMode(viewMode === 'responsive' ? 'mobile-simulation' : 'responsive')}
            className="hidden lg:flex items-center gap-1 text-[11px] text-slate-300 hover:text-white bg-white/10 px-2.5 py-1 rounded-lg border border-white/15 cursor-pointer"
            title="Toggle Full Laptop Width vs. 440px Mobile Phone Frame"
          >
            {viewMode === 'responsive' ? (
              <>
                <Smartphone className="w-3 h-3 text-emerald-400" />
                <span>Mobile Frame</span>
              </>
            ) : (
              <>
                <Monitor className="w-3 h-3 text-sky-400" />
                <span>Full Width</span>
              </>
            )}
          </button>

          {portal === 'partner' && (
            <button
              type="button"
              onClick={handleReset}
              className="p-1 rounded text-slate-300 hover:text-rose-400 cursor-pointer"
              title="Reset FTUX State"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Responsive Wrapper */}
      <div
        className={`flex-1 w-full flex flex-col transition-all duration-300 ${
          viewMode === 'mobile-simulation'
            ? 'max-w-[440px] mx-auto my-6 bg-white border-4 border-slate-800 rounded-[36px] shadow-2xl overflow-hidden min-h-[820px]'
            : 'min-h-[calc(100vh-46px)]'
        }`}
      >
        {/* CONDITIONAL RENDERING BASED ON ACTIVE PORTAL */}
        {portal === 'employer' ? (
          <motion.div
            key="portal-employer"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col w-full"
          >
            <EmployerApp
              onSwitchToPartner={() => setPortal('partner')}
              initialScreen={initialEmployerScreen}
            />
          </motion.div>
        ) : (
          <AnimatePresence custom={direction} mode="wait">
            {currentScreen === 1 && (
              <motion.div
                key="screen-1"
                custom={direction}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex-1 flex flex-col w-full"
              >
                <ScreenLoginOTP
                  onNext={() => goToScreen(2)}
                  lang={lang}
                  setLang={setLang}
                  workerData={workerData}
                  setWorkerData={setWorkerData}
                  onSwitchToEmployer={() => setPortal('employer')}
                />
              </motion.div>
            )}

            {currentScreen === 2 && (
              <motion.div
                key="screen-2"
                custom={direction}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex-1 flex flex-col w-full"
              >
                <ScreenCategorySelection
                  onNext={() => goToScreen(3)}
                  onBack={() => goToScreen(1)}
                  lang={lang}
                  setLang={setLang}
                  workerData={workerData}
                  setWorkerData={setWorkerData}
                />
              </motion.div>
            )}

            {currentScreen === 3 && (
              <motion.div
                key="screen-3"
                custom={direction}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex-1 flex flex-col w-full"
              >
                <ScreenKycUpload
                  onNext={() => goToScreen(4)}
                  onBack={() => goToScreen(2)}
                  lang={lang}
                  setLang={setLang}
                  workerData={workerData}
                  setWorkerData={setWorkerData}
                />
              </motion.div>
            )}

            {currentScreen === 4 && (
              <motion.div
                key="screen-4"
                custom={direction}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex-1 flex flex-col w-full"
              >
                <ScreenRadarDashboard
                  workerData={workerData}
                  setWorkerData={setWorkerData}
                  lang={lang}
                  setLang={setLang}
                  onResetToLogin={handleReset}
                  onSwitchToEmployer={() => setPortal('employer')}
                />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
