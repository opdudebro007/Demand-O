import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Radio,
  Power,
  Wallet,
  Briefcase,
  User,
  Home,
  BellRing,
  MapPin,
  Clock,
  CheckCircle2,
  PhoneCall,
  Navigation,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  CreditCard,
  Building,
  Globe,
  LogOut,
  Sparkles,
  Volume2,
  VolumeX,
  X,
  SlidersHorizontal,
  Flame,
  ArrowUpRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { TRANSLATIONS } from '../data/categories';

export default function ScreenRadarDashboard({
  workerData,
  setWorkerData,
  lang,
  setLang,
  onResetToLogin,
  onSwitchToEmployer
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Active Tab: 'home' | 'jobs' | 'earnings' | 'profile'
  const [activeTab, setActiveTab] = useState('home');
  const [isOnline, setIsOnline] = useState(workerData.isOnline ?? true);
  
  // Real-time radar radar sweep angle / radius
  const [radarRadius, setRadarRadius] = useState(5); // 5 km
  const [audioEnabled, setAudioEnabled] = useState(true);

  // Incoming Job Alert Simulation State
  const [incomingJob, setIncomingJob] = useState(null);
  const [alertSeconds, setAlertSeconds] = useState(15);
  const [activeJobsList, setActiveJobsList] = useState([]);
  const [earningsTotal, setEarningsTotal] = useState(0);

  // Linked Bank State
  const [showBankModal, setShowBankModal] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [isUpiSaved, setIsUpiSaved] = useState(false);

  // Countdown timer for incoming job simulation
  useEffect(() => {
    let timer;
    if (incomingJob && alertSeconds > 0) {
      timer = setInterval(() => {
        setAlertSeconds((s) => s - 1);
      }, 1000);
    } else if (incomingJob && alertSeconds <= 0) {
      // Missed job
      setIncomingJob(null);
    }
    return () => clearInterval(timer);
  }, [incomingJob, alertSeconds]);

  // Audio tone simulation using Web Audio API for job alert
  const playAlertTone = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.45);
    } catch {
      // Audio not permitted or blocked
    }
  };

  const triggerJobAlert = () => {
    if (!isOnline) {
      setIsOnline(true);
    }
    setAlertSeconds(15);
    const mockOrder = {
      id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
      customerName: 'Priya Sharma',
      address: 'Flat 402, Green Glen Layout, Bellandur',
      distance: '1.4 km away',
      service: workerData.category?.title || 'Home Service',
      payout: 450,
      tip: 50,
      timestamp: 'Just now',
      urgent: true,
    };
    setIncomingJob(mockOrder);
    if (audioEnabled) {
      playAlertTone();
    }
  };

  const handleAcceptJob = () => {
    if (!incomingJob) return;
    setActiveJobsList((prev) => [incomingJob, ...prev]);
    setIncomingJob(null);
    setActiveTab('jobs');
  };

  const handleRejectJob = () => {
    setIncomingJob(null);
  };

  const handleCompleteJob = (jobId, payout) => {
    setActiveJobsList((prev) => prev.filter((j) => j.id !== jobId));
    setEarningsTotal((prev) => prev + payout);
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-slate-100 text-slate-900 relative">
      {/* Top Header Bar - Responsive on both Desktop & Mobile */}
      <header className="bg-white border-b-2 border-black px-4 sm:px-8 py-3.5 shrink-0 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Brand Logo & Profile Avatar */}
          <div className="flex items-center gap-3">
            <div 
              onClick={() => setActiveTab('profile')}
              className="flex items-center gap-2.5 cursor-pointer hover:opacity-85 transition-opacity"
            >
              <div className="relative">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#0B3C5D] text-white flex items-center justify-center font-black border-2 border-black shadow-sharp-sm overflow-hidden">
                  {workerData.selfiePreview ? (
                    <img src={workerData.selfiePreview} alt="Worker" className="w-full h-full object-cover" />
                  ) : (
                    <span>{workerData.name?.charAt(0) || 'W'}</span>
                  )}
                </div>
                {isOnline && (
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white ring-1 ring-emerald-500 animate-pulse" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight leading-none line-clamp-1">
                    {workerData.name || 'Ramesh Kumar'}
                  </span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                </div>
                <span className="text-xs font-bold text-slate-500 block leading-tight mt-0.5">
                  {workerData.category?.title || 'Partner'} ({workerData.category?.hindiTitle || 'वर्कर'})
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Tabs (Hidden on mobile, shown on laptop) */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1.5 rounded-2xl border-2 border-black shadow-sharp-sm">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-xs transition-all ${
                activeTab === 'home'
                  ? 'bg-[#0B3C5D] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>{t.home}</span>
            </button>

            <button
              onClick={() => setActiveTab('jobs')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-xs relative transition-all ${
                activeTab === 'jobs'
                  ? 'bg-[#0B3C5D] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>{t.myJobs}</span>
              {activeJobsList.length > 0 && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('earnings')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-xs transition-all ${
                activeTab === 'earnings'
                  ? 'bg-[#0B3C5D] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Wallet className="w-4 h-4" />
              <span>{t.earnings}</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-xs transition-all ${
                activeTab === 'profile'
                  ? 'bg-[#0B3C5D] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-4 h-4" />
              <span>{t.profile}</span>
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Toggle */}
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              className="hidden sm:flex p-2.5 rounded-xl border-2 border-black bg-white hover:bg-slate-100 text-slate-700 shadow-sharp-sm transition-all"
              title={audioEnabled ? "Alert Sound ON" : "Alert Sound Muted"}
            >
              {audioEnabled ? (
                <Volume2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {/* Earnings Pill (₹0 initially) */}
            <button
              onClick={() => setActiveTab('earnings')}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-amber-50 border-2 border-black text-slate-900 shadow-sharp-sm hover:bg-amber-100 transition-colors"
            >
              <Wallet className="w-4 h-4 text-amber-600" />
              <div className="text-left">
                <span className="text-[10px] font-extrabold uppercase text-slate-500 block leading-none">
                  {t.totalEarnings}
                </span>
                <span className="text-sm sm:text-base font-black text-slate-900 leading-tight">
                  ₹{earningsTotal}
                </span>
              </div>
            </button>

            {/* Large Online/Offline Toggle Switch */}
            <button
              onClick={() => setIsOnline(!isOnline)}
              type="button"
              className={`flex items-center gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-xl border-2 border-black font-black text-xs sm:text-sm transition-all shadow-sharp-sm ${
                isOnline
                  ? 'bg-emerald-500 text-white shadow-glow-green ring-2 ring-emerald-400/40'
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              <Power className={`w-4 h-4 ${isOnline ? 'animate-pulse text-white' : 'text-slate-500'}`} />
              <span>{isOnline ? t.online : t.offline}</span>
            </button>

            {/* Switch to Employer Portal Button */}
            {onSwitchToEmployer && (
              <button
                onClick={onSwitchToEmployer}
                className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm border-2 border-black flex items-center gap-1.5 shadow-sharp transition-all"
                title="Switch to Employer Portal"
              >
                <Building className="w-4 h-4 text-[#0B3C5D]" />
                <span className="hidden sm:inline">Employer Portal</span>
                <span className="sm:hidden">Employer</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area - Full Screen Responsive */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28 md:pb-12">
        {/* TAB 1: HOME / RADAR */}
        {activeTab === 'home' && (
          <div className="flex flex-col gap-6">
            {/* Status Strip */}
            <div className={`p-4 rounded-2xl border-2 border-black shadow-sharp-sm text-xs sm:text-sm font-bold flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-colors ${
              isOnline 
                ? 'bg-emerald-50 text-emerald-950 border-emerald-900' 
                : 'bg-amber-50 text-amber-950 border-amber-900'
            }`}>
              <div className="flex items-center gap-2.5">
                <span className={`w-3 h-3 rounded-full ${isOnline ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'}`} />
                <span className="font-black text-sm">
                  {isOnline 
                    ? (lang === 'hi' ? 'आप ऑनलाइन हैं • 5 किमी के दायरे में काम की खोज जारी है' : 'You are Online • Actively scanning for bookings in your area')
                    : (lang === 'hi' ? 'आप ऑफलाइन हैं • नए ऑर्डर प्राप्त करने के लिए ड्यूटी ऑन करें' : 'You are Offline • Turn on duty to start receiving bookings')
                  }
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-black">
                <MapPin className="w-4 h-4 text-[#0B3C5D]" />
                <span>Coverage: {radarRadius} km Range</span>
              </div>
            </div>

            {/* Widescreen 2-Column Dashboard on Laptop / Stacked on Mobile */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Pulsing Radar Canvas (7 Cols) */}
              <div className="lg:col-span-7 bg-white border-2 border-black rounded-3xl p-6 sm:p-10 shadow-sharp flex flex-col items-center justify-center text-center relative overflow-hidden">
                {/* Radar Graphical Centerpiece */}
                <div className="relative my-4 flex flex-col items-center justify-center">
                  <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full border-4 border-black bg-[#0B3C5D]/95 flex items-center justify-center overflow-hidden shadow-sharp-lg">
                    {/* Grid Lines */}
                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff22_1px,transparent_1px)] [background-size:20px_20px]" />
                    <div className="absolute w-full h-[1px] bg-sky-300/25" />
                    <div className="absolute h-full w-[1px] bg-sky-300/25" />

                    {/* Concentric Radar Rings */}
                    <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-sky-400/35" />
                    <div className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full border border-sky-400/30" />
                    <div className="absolute w-60 h-60 sm:w-76 sm:h-76 rounded-full border border-sky-400/25" />

                    {/* Dynamic Pulsing Sonar Waves (Framer Motion) */}
                    {isOnline && (
                      <>
                        <motion.div
                          className="absolute w-28 h-28 rounded-full border-2 border-emerald-400 bg-emerald-400/10 pointer-events-none"
                          animate={{
                            scale: [1, 3.2],
                            opacity: [0.85, 0],
                          }}
                          transition={{
                            duration: 2.8,
                            repeat: Infinity,
                            ease: 'easeOut',
                          }}
                        />
                        <motion.div
                          className="absolute w-28 h-28 rounded-full border-2 border-sky-300 bg-sky-300/10 pointer-events-none"
                          animate={{
                            scale: [1, 3.2],
                            opacity: [0.85, 0],
                          }}
                          transition={{
                            duration: 2.8,
                            repeat: Infinity,
                            ease: 'easeOut',
                            delay: 1.4,
                          }}
                        />

                        {/* Rotating Radar Sweep Cone */}
                        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                          <div 
                            className="w-full h-full animate-radar-sweep origin-center"
                            style={{
                              background: 'conic-gradient(from 0deg at 50% 50%, rgba(34, 197, 94, 0.45) 0deg, rgba(34, 197, 94, 0) 65deg, transparent 65deg)',
                            }}
                          />
                        </div>
                      </>
                    )}

                    {/* Center Worker Beacon Marker */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-white border-2 border-black flex items-center justify-center shadow-sharp text-[#0B3C5D]">
                        <Radio className="w-8 h-8 text-[#0B3C5D]" />
                      </div>
                      <span className="mt-1 px-2.5 py-0.5 rounded-full bg-black/90 text-[10px] font-black text-white tracking-wider uppercase border border-white/20">
                        GPS LIVE
                      </span>
                    </div>

                    {/* Simulated Ambient Surrounding Service Demand Hotspots */}
                    {isOnline && (
                      <>
                        <div className="absolute top-14 left-20 w-3.5 h-3.5 rounded-full bg-amber-400 animate-ping" />
                        <div className="absolute bottom-16 right-16 w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                        <div className="absolute bottom-24 left-16 w-2.5 h-2.5 rounded-full bg-sky-400" />
                      </>
                    )}
                  </div>
                </div>

                {/* Radar Status Heading */}
                <div className="mt-4 max-w-md">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    {isOnline ? t.radarScanning : 'Duty is Currently Offline'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 leading-relaxed">
                    {isOnline
                      ? (lang === 'hi' 
                          ? 'रडार सक्रिय है। 5 किमी के भीतर ग्राहकों के काम की तलाश की जा रही है। नया काम आने पर फोन बजेगा।' 
                          : 'Scanning within 5 km of your location. When a nearby customer posts a booking, your phone will ring instantly!')
                      : (lang === 'hi' 
                          ? 'काम शुरू करने के लिए ऊपर दिए गए बटन से ऑनलाइन जाएं।' 
                          : 'Toggle duty switch on to receive high-paying nearby orders.')}
                  </p>
                </div>
              </div>

              {/* Right Column: Duty Controls, Simulation Trigger & FTUX Info (5 Cols) */}
              <div className="lg:col-span-5 space-y-6">
                {/* Simulation Trigger Card */}
                <div className="bg-white border-2 border-black rounded-3xl p-6 shadow-sharp">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 border-2 border-black flex items-center justify-center text-amber-700 shrink-0">
                      <BellRing className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-base text-slate-900">
                        Interactive Simulation
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        Test receiving an instant order alert
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium mb-4">
                    Experience the complete partner order loop: instant ringtone chime, accept/decline timer, fare breakdown, customer address, and job completion.
                  </p>

                  <button
                    type="button"
                    onClick={triggerJobAlert}
                    className="w-full min-h-[52px] py-3.5 px-6 rounded-2xl bg-[#0B3C5D] hover:bg-[#07263b] text-white font-extrabold text-sm border-2 border-black flex items-center justify-center gap-2 shadow-sharp-sm active:translate-y-0.5 transition-all"
                  >
                    <BellRing className="w-4 h-4 text-amber-400" />
                    <span>Simulate Incoming Job Alert 🔔</span>
                  </button>
                </div>

                {/* FTUX Mode Info Card */}
                <div className="bg-white border-2 border-black rounded-3xl p-6 shadow-sharp">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border-2 border-black flex items-center justify-center text-[#0B3C5D] shrink-0">
                      <Sparkles className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-slate-900">
                          Pristine FTUX Session
                        </span>
                        <span className="text-[10px] font-black bg-blue-100 text-[#0B3C5D] px-2 py-0.5 rounded">
                          0 Fake Data
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                        All worker metrics start fresh at ₹0 earnings and 0 completed jobs. Your state is ready for seamless backend and WebSocket integration.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Daily Streak Milestone */}
                <div className="bg-white border-2 border-black rounded-3xl p-6 shadow-sharp">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Flame className="w-5 h-5 text-amber-500" />
                      <span className="font-extrabold text-sm text-slate-900">
                        Daily Incentive Bonus
                      </span>
                    </div>
                    <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      + ₹200 Extra
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    Complete 3 orders today to unlock your ₹200 Daily Fuel & Meal Allowance.
                  </p>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mt-3 border border-black/20">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: earningsTotal > 0 ? '33%' : '0%' }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] font-bold text-slate-500 mt-1">
                    <span>{earningsTotal > 0 ? '1 of 3 orders completed' : '0 of 3 orders completed'}</span>
                    <span>3 orders target</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MY JOBS */}
        {activeTab === 'jobs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  {t.myJobs}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Active orders and completed job history
                </p>
              </div>
              <span className="text-xs sm:text-sm font-extrabold bg-blue-50 border-2 border-black text-[#0B3C5D] px-3 py-1 rounded-xl shadow-sharp-sm">
                {activeJobsList.length} Active Orders
              </span>
            </div>

            {/* List of active jobs or Empty State */}
            {activeJobsList.length === 0 ? (
              <div className="bg-white border-2 border-black rounded-3xl p-10 sm:p-14 text-center shadow-sharp my-6 max-w-2xl mx-auto">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-100 border-2 border-black flex items-center justify-center mx-auto mb-4 text-slate-400">
                  <Briefcase className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
                <h3 className="font-black text-lg sm:text-xl text-slate-900">
                  No Active Jobs Yet
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mt-2 leading-relaxed">
                  As soon as you accept an incoming radar request, full customer details, live GPS route, and payment collection will appear here.
                </p>
                <button
                  onClick={triggerJobAlert}
                  className="mt-6 px-6 py-3 rounded-2xl bg-[#0B3C5D] text-white font-extrabold text-sm border-2 border-black shadow-sharp hover:bg-[#07263b] transition-all"
                >
                  Receive a Test Order Now
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeJobsList.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white border-2 border-black rounded-3xl p-6 shadow-sharp"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                          Order in Progress
                        </span>
                        <h4 className="text-lg font-black text-slate-900 mt-1">
                          {job.service}
                        </h4>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-black text-emerald-600">
                          ₹{job.payout}
                        </span>
                        <span className="text-xs text-slate-400 block font-bold">
                          +{job.tip} Tip
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs sm:text-sm text-slate-600 bg-slate-50 p-3.5 rounded-2xl border border-black/10 my-4">
                      <p className="font-bold text-slate-900 flex items-center gap-2">
                        <User className="w-4 h-4 text-[#0B3C5D]" />
                        {job.customerName}
                      </p>
                      <p className="flex items-center gap-2 text-slate-600">
                        <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                        <span className="truncate">{job.address}</span>
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <button
                        onClick={() => alert(`Calling Customer ${job.customerName}...`)}
                        className="py-3 px-4 rounded-xl border-2 border-black font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 bg-white hover:bg-slate-50 transition-colors shadow-sharp-sm"
                      >
                        <PhoneCall className="w-4 h-4 text-emerald-600" />
                        <span>Call Customer</span>
                      </button>
                      <button
                        onClick={() => handleCompleteJob(job.id, job.payout + job.tip)}
                        className="py-3 px-4 rounded-xl border-2 border-black font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 bg-emerald-600 text-white hover:bg-emerald-700 shadow-sharp-sm transition-all"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Finish & Collect ₹{job.payout + job.tip}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: EARNINGS */}
        {activeTab === 'earnings' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {t.earnings} & Payouts
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Track your direct bank deposits and incentives
              </p>
            </div>

            {/* Total Balance Card */}
            <div className="bg-[#0B3C5D] text-white border-2 border-black rounded-3xl p-6 sm:p-10 shadow-sharp relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
                <div>
                  <span className="text-xs font-bold text-sky-200 uppercase tracking-wider">
                    Available Wallet Balance
                  </span>
                  <div className="text-4xl sm:text-5xl font-black tracking-tight mt-1">
                    ₹{earningsTotal}
                  </div>
                  <span className="text-xs text-emerald-300 font-semibold block mt-1.5">
                    Daily Settlement at 11:59 PM directly to your bank
                  </span>
                </div>
                <button
                  onClick={() => setShowBankModal(true)}
                  className="px-5 py-3 rounded-2xl bg-amber-400 text-slate-950 font-black text-sm border-2 border-black shadow-sharp hover:bg-amber-300 transition-colors"
                >
                  {isUpiSaved ? 'UPI Linked ✓' : '+ Link Bank UPI'}
                </button>
              </div>

              {/* Weekly Earnings breakdown */}
              <div className="mt-8 pt-6 border-t border-white/20 grid grid-cols-3 gap-4 text-center relative z-10">
                <div>
                  <span className="text-xs text-sky-200 block">Today's Jobs</span>
                  <span className="text-xl font-black">{earningsTotal > 0 ? '1' : '0'}</span>
                </div>
                <div>
                  <span className="text-xs text-sky-200 block">Tips Received</span>
                  <span className="text-xl font-black">₹{earningsTotal > 0 ? '50' : '0'}</span>
                </div>
                <div>
                  <span className="text-xs text-sky-200 block">Incentives</span>
                  <span className="text-xl font-black">₹0</span>
                </div>
              </div>
            </div>

            {/* Bank Linking Card */}
            <div className="bg-white border-2 border-black rounded-3xl p-6 shadow-sharp flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border-2 border-black flex items-center justify-center text-[#0B3C5D] shrink-0">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-black text-base text-slate-900">
                    {isUpiSaved ? upiId : 'Direct Bank / UPI Transfer'}
                  </p>
                  <p className="text-xs text-slate-500 font-medium">
                    {isUpiSaved ? 'Verified for Instant Auto-Payout' : 'Add GooglePay / PhonePe / Paytm UPI ID'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowBankModal(true)}
                className="px-4 py-2 rounded-xl border-2 border-black text-xs font-black bg-slate-100 hover:bg-slate-200"
              >
                {isUpiSaved ? 'Edit' : 'Add UPI'}
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: PROFILE */}
        {activeTab === 'profile' && (
          <div className="space-y-6 max-w-3xl">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {t.profile}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Your partner credentials and configuration
              </p>
            </div>

            {/* Profile Overview Card */}
            <div className="bg-white border-2 border-black rounded-3xl p-6 sm:p-8 shadow-sharp">
              <div className="flex items-center gap-5 mb-6">
                <div className="w-20 h-20 rounded-2xl bg-[#0B3C5D] border-2 border-black overflow-hidden flex items-center justify-center text-white text-2xl font-black shadow-sharp-sm shrink-0">
                  {workerData.selfiePreview ? (
                    <img src={workerData.selfiePreview} alt="Selfie" className="w-full h-full object-cover" />
                  ) : (
                    <span>{workerData.name?.charAt(0) || 'W'}</span>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-black text-slate-900 leading-tight">
                      {workerData.name || 'Ramesh Kumar'}
                    </h3>
                  </div>
                  <p className="text-sm font-bold text-slate-500 mt-0.5">
                    +91 {workerData.phone || '98765 43210'}
                  </p>
                  <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-extrabold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-lg border border-emerald-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>Aadhaar KYC Verified</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 text-xs sm:text-sm">
                <div className="bg-slate-50 p-4 rounded-2xl border border-black/10">
                  <span className="text-slate-500 block text-xs font-bold">Trade Category</span>
                  <span className="font-extrabold text-slate-900 text-base">
                    {workerData.category?.title || 'Driver'} ({workerData.category?.hindiTitle})
                  </span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-black/10">
                  <span className="text-slate-500 block text-xs font-bold">Partner Status</span>
                  <span className="font-extrabold text-emerald-600 text-base">Active & Ready</span>
                </div>
              </div>
            </div>

            {/* Settings & Language */}
            <div className="bg-white border-2 border-black rounded-3xl p-6 shadow-sharp space-y-4">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
                Preferences & Help
              </h4>

              {/* Language Switch */}
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#0B3C5D]" />
                  <span className="text-sm font-extrabold text-slate-800">App Language</span>
                </div>
                <button
                  onClick={() => setLang((l) => (l === 'en' ? 'hi' : 'en'))}
                  className="px-4 py-1.5 rounded-xl border-2 border-black text-xs font-bold bg-slate-100 hover:bg-slate-200"
                >
                  {lang === 'en' ? 'English (Change to हिन्दी)' : 'हिन्दी (Change to EN)'}
                </button>
              </div>

              {/* Audio Alert Switch */}
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  {audioEnabled ? (
                    <Volume2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-slate-400" />
                  )}
                  <span className="text-sm font-extrabold text-slate-800">Job Ringtone Chime</span>
                </div>
                <button
                  onClick={() => setAudioEnabled(!audioEnabled)}
                  className={`px-4 py-1.5 rounded-xl border-2 border-black text-xs font-bold ${
                    audioEnabled ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {audioEnabled ? 'Sound ON' : 'Muted'}
                </button>
              </div>

              {/* Emergency SOS */}
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span className="text-sm font-extrabold text-slate-800">24x7 Worker Helpline</span>
                </div>
                <span className="text-xs font-black text-rose-600 bg-rose-50 px-3 py-1 rounded-lg border border-rose-200">
                  1800-DEMAND-O
                </span>
              </div>
            </div>

            {/* Reset / Sign Out */}
            <button
              onClick={onResetToLogin}
              className="w-full py-4 px-6 rounded-2xl border-2 border-black bg-rose-50 hover:bg-rose-100 text-rose-700 font-extrabold text-sm flex items-center justify-center gap-2 shadow-sharp-sm transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out & Reset Partner FTUX Session</span>
            </button>
          </div>
        )}
      </main>

      {/* INCOMING JOB ALERT MODAL (SIMULATION POPUP) */}
      <AnimatePresence>
        {incomingJob && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed inset-x-0 bottom-24 md:bottom-10 max-w-md mx-auto px-4 z-50 pointer-events-auto"
          >
            <div className="bg-white border-3 border-black rounded-3xl p-6 shadow-2xl ring-4 ring-[#0B3C5D]/20">
              {/* Alert Header */}
              <div className="flex items-center justify-between pb-3 border-b-2 border-black/10">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    New Job Request!
                  </span>
                </div>
                <div className="flex items-center gap-1 font-black text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full text-xs border border-rose-200">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{alertSeconds}s</span>
                </div>
              </div>

              {/* Job Details */}
              <div className="my-4 flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">
                    {incomingJob.service}
                  </h3>
                  <p className="text-xs text-slate-600 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#0B3C5D]" />
                    <span>{incomingJob.distance}</span> • {incomingJob.address}
                  </p>
                  <p className="text-xs font-bold text-slate-700 mt-1">
                    Customer: {incomingJob.customerName}
                  </p>
                </div>

                <div className="text-right shrink-0 ml-3">
                  <div className="text-2xl sm:text-3xl font-black text-[#0B3C5D]">
                    ₹{incomingJob.payout}
                  </div>
                  <span className="text-xs font-bold text-emerald-600">
                    +₹{incomingJob.tip} tip
                  </span>
                </div>
              </div>

              {/* Progress bar countdown */}
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden my-3">
                <motion.div
                  className="bg-rose-500 h-full"
                  initial={{ width: '100%' }}
                  animate={{ width: `${(alertSeconds / 15) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Action Buttons (Accept vs Decline) */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <button
                  type="button"
                  onClick={handleRejectJob}
                  className="py-3.5 px-4 rounded-xl border-2 border-black font-extrabold text-xs sm:text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 shadow-sharp-sm transition-all"
                >
                  Pass / Reject
                </button>
                <button
                  type="button"
                  onClick={handleAcceptJob}
                  className="py-3.5 px-4 rounded-xl border-2 border-black font-black text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-sharp-sm flex items-center justify-center gap-1.5 active:translate-y-0.5 transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Accept (₹{incomingJob.payout})</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LINK BANK / UPI MODAL */}
      <AnimatePresence>
        {showBankModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border-2 border-black rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-black text-lg text-slate-900">
                  Link Bank Account / UPI
                </h3>
                <button
                  onClick={() => setShowBankModal(false)}
                  className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-slate-500 font-medium mb-4 leading-relaxed">
                Enter your VPA / UPI ID for direct daily auto-payouts credited to your bank account after every completed job.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                    UPI ID (GooglePay / PhonePe / Paytm)
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="e.g. 9876543210@paytm"
                    className="w-full px-4 py-3 rounded-xl border-2 border-black text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]"
                  />
                </div>

                <div className="flex items-center gap-2.5 p-3 bg-slate-50 border border-black/10 rounded-xl text-xs text-slate-600 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Secure NPCI Verified Auto-Payout Gateway</span>
                </div>

                <button
                  onClick={() => {
                    if (upiId.trim()) {
                      setIsUpiSaved(true);
                      setShowBankModal(false);
                    }
                  }}
                  disabled={!upiId.trim()}
                  className={`w-full py-4 rounded-xl border-2 border-black font-black text-sm shadow-sharp transition-all ${
                    upiId.trim()
                      ? 'bg-[#0B3C5D] text-white hover:bg-[#07263b]'
                      : 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed shadow-none'
                  }`}
                >
                  Save & Verify UPI
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* APP-STYLE BOTTOM NAVIGATION BAR (VISIBLE ON MOBILE ONLY) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-black px-4 py-2 z-40 shadow-2xl flex items-center justify-around">
        {/* Home / Radar */}
        <button
          onClick={() => setActiveTab('home')}
          type="button"
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            activeTab === 'home'
              ? 'text-[#0B3C5D] font-black scale-105'
              : 'text-slate-400 hover:text-slate-700 font-bold'
          }`}
        >
          <div className={`p-1.5 rounded-xl ${activeTab === 'home' ? 'bg-blue-100/70 border border-black/30' : ''}`}>
            <Home className="w-5 h-5 stroke-[2.4]" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">{t.home}</span>
        </button>

        {/* My Jobs */}
        <button
          onClick={() => setActiveTab('jobs')}
          type="button"
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl relative transition-all ${
            activeTab === 'jobs'
              ? 'text-[#0B3C5D] font-black scale-105'
              : 'text-slate-400 hover:text-slate-700 font-bold'
          }`}
        >
          <div className={`p-1.5 rounded-xl ${activeTab === 'jobs' ? 'bg-blue-100/70 border border-black/30' : ''}`}>
            <Briefcase className="w-5 h-5 stroke-[2.4]" />
          </div>
          {activeJobsList.length > 0 && (
            <span className="absolute top-1 right-3 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          )}
          <span className="text-[10px] mt-0.5 tracking-tight">{t.myJobs}</span>
        </button>

        {/* Earnings */}
        <button
          onClick={() => setActiveTab('earnings')}
          type="button"
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            activeTab === 'earnings'
              ? 'text-[#0B3C5D] font-black scale-105'
              : 'text-slate-400 hover:text-slate-700 font-bold'
          }`}
        >
          <div className={`p-1.5 rounded-xl ${activeTab === 'earnings' ? 'bg-blue-100/70 border border-black/30' : ''}`}>
            <Wallet className="w-5 h-5 stroke-[2.4]" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">{t.earnings}</span>
        </button>

        {/* Profile */}
        <button
          onClick={() => setActiveTab('profile')}
          type="button"
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            activeTab === 'profile'
              ? 'text-[#0B3C5D] font-black scale-105'
              : 'text-slate-400 hover:text-slate-700 font-bold'
          }`}
        >
          <div className={`p-1.5 rounded-xl ${activeTab === 'profile' ? 'bg-blue-100/70 border border-black/30' : ''}`}>
            <User className="w-5 h-5 stroke-[2.4]" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">{t.profile}</span>
        </button>

        {/* Quick Portal Switch to Employer on Mobile Nav */}
        {onSwitchToEmployer && (
          <button
            onClick={onSwitchToEmployer}
            type="button"
            className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-amber-600 hover:text-amber-700 font-bold transition-all"
          >
            <div className="p-1.5 rounded-xl bg-amber-50 border border-amber-300">
              <Building className="w-5 h-5 stroke-[2.4]" />
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight font-black">Employer</span>
          </button>
        )}
      </nav>
    </div>
  );
}
