import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Monitor, RotateCcw, Sparkles, Building2, UserCheck, Briefcase } from 'lucide-react';
import ScreenLoginOTP from './components/ScreenLoginOTP';
import ScreenCategorySelection from './components/ScreenCategorySelection';
import ScreenKycUpload from './components/ScreenKycUpload';
import ScreenRadarDashboard from './components/ScreenRadarDashboard';
import EmployerApp from './employer/App';

export default function App() {
  // Global Portal Mode: 'partner' | 'employer'
  const [portal, setPortal] = useState('partner');

  // Navigation Screens inside Partner Portal: 1 | 2 | 3 | 4
  const [currentScreen, setCurrentScreen] = useState(1);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for back
  const [lang, setLang] = useState('en'); // 'en' | 'hi'

  // Device view testing helper: 'responsive' (full width, adapting to laptop or mobile) vs 'mobile-simulation'
  const [viewMode, setViewMode] = useState('responsive'); // 'responsive' | 'mobile-simulation'

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
      {/* Global Two-Sided Marketplace Portal Switcher Bar */}
      <div className="bg-[#07263b] text-white px-4 py-2 text-xs border-b border-black/40 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-2">
          <span className="font-black text-amber-400 tracking-wider uppercase text-[11px] sm:text-xs">
            Demand O
          </span>
          <span className="hidden sm:inline text-slate-400 text-[11px]">
            • Dual Marketplace Portal
          </span>
        </div>

        {/* Segmented Switcher Pills */}
        <div className="flex items-center bg-black/40 p-1 rounded-xl border border-white/20 shadow-inner">
          <button
            onClick={() => setPortal('partner')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-black text-[11px] transition-all ${
              portal === 'partner'
                ? 'bg-[#0B3C5D] text-white shadow-sharp-sm border border-sky-400/50'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5 text-amber-300" />
            <span>Worker / Partner App</span>
          </button>

          <button
            onClick={() => setPortal('employer')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-black text-[11px] transition-all ${
              portal === 'employer'
                ? 'bg-[#0B3C5D] text-white shadow-sharp-sm border border-sky-400/50'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-amber-300" />
            <span>Employer Dashboard</span>
          </button>
        </div>

        {/* Right Dev / View Controls */}
        <div className="hidden sm:flex items-center gap-2">
          {portal === 'partner' && (
            <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-lg border border-white/15">
              {[1, 2, 3, 4].map((step) => (
                <button
                  key={step}
                  onClick={() => goToScreen(step)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    currentScreen === step ? 'bg-amber-400 text-slate-950 font-black' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Step {step}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={() => setViewMode(viewMode === 'responsive' ? 'mobile-simulation' : 'responsive')}
            className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white bg-white/10 px-2 py-1 rounded-lg border border-white/15"
            title="Toggle Full Laptop Width vs. 440px Mobile Phone Frame"
          >
            {viewMode === 'responsive' ? (
              <>
                <Smartphone className="w-3 h-3 text-emerald-400" />
                <span className="hidden md:inline">Mobile Frame</span>
              </>
            ) : (
              <>
                <Monitor className="w-3 h-3 text-sky-400" />
                <span className="hidden md:inline">Full Width</span>
              </>
            )}
          </button>

          {portal === 'partner' && (
            <button
              onClick={handleReset}
              className="p-1 rounded text-slate-300 hover:text-rose-400"
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
            : 'min-h-[calc(100vh-42px)]'
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
