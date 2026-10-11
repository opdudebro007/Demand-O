import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Users,
  Search,
  Plus,
  Briefcase,
  MapPin,
  Clock,
  CheckCircle2,
  PhoneCall,
  CreditCard,
  TrendingUp,
  Star,
  ShieldCheck,
  Filter,
  ArrowRight,
  Sparkles,
  Radio,
  SlidersHorizontal,
  X,
  ChevronDown,
  Calendar,
  AlertCircle,
  Smartphone,
  Eye,
  Check
} from 'lucide-react';

export default function ScreenEmployerDashboard({ onSwitchToPartner, lang }) {
  // Employer active tab: 'overview' | 'hire' | 'postings' | 'billing'
  const [activeTab, setActiveTab] = useState('overview');
  
  // Job Post Modal State
  const [showPostModal, setShowPostModal] = useState(false);
  const [postCategory, setPostCategory] = useState('Driver');
  const [postLocation, setPostLocation] = useState('Indiranagar, Bengaluru');
  const [postWage, setPostWage] = useState('500');
  const [postDuration, setPostDuration] = useState('Full Day (8 hrs)');
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);

  // Active Employer Job Orders List
  const [activeOrders, setActiveOrders] = useState([
    {
      id: 'JOB-9021',
      title: 'Commercial Van Driver',
      category: 'Driver',
      workerName: 'Ramesh Kumar',
      workerRating: 4.9,
      status: 'On Duty',
      location: 'Bellandur to Whitefield',
      wage: '₹650',
      timing: '9:00 AM - 5:00 PM',
      phone: '+91 98765 43210',
    },
    {
      id: 'JOB-9022',
      title: 'Warehouse Helper (Loading)',
      category: 'Helper',
      workerName: 'Sunil Yadav',
      workerRating: 4.8,
      status: 'En Route',
      location: 'HSR Layout Sector 2',
      wage: '₹450',
      timing: '2:00 PM - 6:00 PM',
      phone: '+91 98451 12390',
    },
    {
      id: 'JOB-9023',
      title: 'Office Deep Cleaning Sweeper',
      category: 'Sweeper',
      workerName: 'Manjula Devi',
      workerRating: 5.0,
      status: 'Completed',
      location: 'Koramangala 4th Block',
      wage: '₹400',
      timing: 'Morning Shift',
      phone: '+91 97412 88712',
    },
  ]);

  // Nearby Available Workers in 5km pool
  const nearbyWorkers = [
    {
      id: 'W-1',
      name: 'Ramesh Kumar',
      category: 'Driver',
      experience: '4 yrs exp',
      distance: '0.8 km away',
      rating: 4.9,
      reviews: 142,
      hourlyRate: '₹120/hr',
      verified: true,
      status: 'Ready Now',
      avatarBg: 'bg-[#0B3C5D]',
    },
    {
      id: 'W-2',
      name: 'Santosh Rawat',
      category: 'Security Guard',
      experience: '6 yrs exp',
      distance: '1.2 km away',
      rating: 4.8,
      reviews: 98,
      hourlyRate: '₹95/hr',
      verified: true,
      status: 'Ready Now',
      avatarBg: 'bg-emerald-700',
    },
    {
      id: 'W-3',
      name: 'Geeta Bai',
      category: 'Sweeper',
      experience: '5 yrs exp',
      distance: '1.5 km away',
      rating: 5.0,
      reviews: 215,
      hourlyRate: '₹90/hr',
      verified: true,
      status: 'Ready Now',
      avatarBg: 'bg-amber-600',
    },
    {
      id: 'W-4',
      name: 'Chef Anil Verma',
      category: 'Chef / Cook',
      experience: '7 yrs exp',
      distance: '2.1 km away',
      rating: 4.9,
      reviews: 180,
      hourlyRate: '₹180/hr',
      verified: true,
      status: 'Ready Now',
      avatarBg: 'bg-[#0B3C5D]',
    },
  ];

  const handleBroadcastJob = (e) => {
    e.preventDefault();
    setIsBroadcasting(true);

    setTimeout(() => {
      setIsBroadcasting(false);
      setBroadcastSuccess(true);

      const newOrder = {
        id: 'JOB-' + Math.floor(1000 + Math.random() * 9000),
        title: `${postCategory} Shift Needed`,
        category: postCategory,
        workerName: 'Broadcasted to 18 Nearby Workers',
        workerRating: 4.9,
        status: 'Awaiting Acceptance',
        location: postLocation,
        wage: `₹${postWage}`,
        timing: postDuration,
        phone: 'Instant dispatch',
      };

      setActiveOrders([newOrder, ...activeOrders]);

      setTimeout(() => {
        setBroadcastSuccess(false);
        setShowPostModal(false);
      }, 1200);
    }, 900);
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-slate-100 text-slate-900 font-sans">
      {/* Top Employer Ops Header Bar */}
      <header className="bg-white border-b-2 border-black px-4 sm:px-8 py-3.5 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Logo & Employer Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#0B3C5D] text-white flex items-center justify-center font-black border-2 border-black shadow-sharp-sm">
              <Building2 className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-none">
                  Demand O <span className="text-[#0B3C5D]">Employer</span>
                </h1>
                <span className="hidden sm:inline text-[10px] font-black uppercase tracking-wider bg-blue-100 text-[#0B3C5D] px-2 py-0.5 rounded border border-blue-300">
                  Business Ops
                </span>
              </div>
              <p className="text-xs text-slate-500 font-bold mt-0.5">
                Green Valley Enterprises • Indiranagar Hub
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1.5 rounded-2xl border-2 border-black shadow-sharp-sm">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-xs transition-all ${
                activeTab === 'overview'
                  ? 'bg-[#0B3C5D] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('hire')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-xs transition-all ${
                activeTab === 'hire'
                  ? 'bg-[#0B3C5D] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Live Worker Radar</span>
            </button>

            <button
              onClick={() => setActiveTab('postings')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-xs transition-all ${
                activeTab === 'postings'
                  ? 'bg-[#0B3C5D] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Active Shifts</span>
            </button>

            <button
              onClick={() => setActiveTab('billing')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-xs transition-all ${
                activeTab === 'billing'
                  ? 'bg-[#0B3C5D] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Billing & Escrow</span>
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Post Job CTA Button */}
            <button
              onClick={() => setShowPostModal(true)}
              className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-[#0B3C5D] hover:bg-[#07263b] text-white font-extrabold text-xs sm:text-sm border-2 border-black flex items-center gap-1.5 shadow-sharp-sm active:translate-y-0.5 transition-all"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span className="hidden sm:inline">Request Worker</span>
              <span className="sm:hidden">Hire</span>
            </button>

            {/* SWITCH TO PARTNER PORTAL BUTTON */}
            <button
              onClick={onSwitchToPartner}
              className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm border-2 border-black flex items-center gap-1.5 shadow-sharp transition-all"
              title="Switch to Worker / Partner Portal"
            >
              <Smartphone className="w-4 h-4 text-[#0B3C5D]" />
              <span className="hidden sm:inline">Switch to Partner Portal</span>
              <span className="sm:hidden">Partner App</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28 md:pb-12">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Top Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white border-2 border-black rounded-3xl p-5 shadow-sharp">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-black uppercase tracking-wider">Workers On-Duty</span>
                  <div className="w-8 h-8 rounded-xl bg-blue-50 border border-black/20 flex items-center justify-center text-[#0B3C5D]">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-slate-900">12</div>
                <p className="text-xs font-bold text-emerald-600 mt-1 flex items-center gap-1">
                  <span>● 3 shifts active right now</span>
                </p>
              </div>

              <div className="bg-white border-2 border-black rounded-3xl p-5 shadow-sharp">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-black uppercase tracking-wider">Live Radar Pool</span>
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-black/20 flex items-center justify-center text-emerald-600">
                    <Radio className="w-4 h-4 animate-pulse" />
                  </div>
                </div>
                <div className="text-3xl font-black text-slate-900">28+</div>
                <p className="text-xs font-bold text-slate-500 mt-1">
                  Sweepers, Drivers, Guards in 5 km
                </p>
              </div>

              <div className="bg-white border-2 border-black rounded-3xl p-5 shadow-sharp">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-black uppercase tracking-wider">Month Payouts</span>
                  <div className="w-8 h-8 rounded-xl bg-amber-50 border border-black/20 flex items-center justify-center text-amber-600">
                    <CreditCard className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-slate-900">₹24,850</div>
                <p className="text-xs font-bold text-slate-500 mt-1">
                  100% Direct to Worker Bank
                </p>
              </div>

              <div className="bg-white border-2 border-black rounded-3xl p-5 shadow-sharp">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-black uppercase tracking-wider">Fulfillment Rate</span>
                  <div className="w-8 h-8 rounded-xl bg-sky-50 border border-black/20 flex items-center justify-center text-sky-600">
                    <Star className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-slate-900">99.4%</div>
                <p className="text-xs font-bold text-emerald-600 mt-1">
                  Avg arrival in 18 minutes
                </p>
              </div>
            </div>

            {/* Main Section: 2 Columns (Live Active Shifts + Live Nearby Radar) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Active Shifts & Hires (7 Cols) */}
              <div className="lg:col-span-7 bg-white border-2 border-black rounded-3xl p-6 shadow-sharp">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="font-black text-lg text-slate-900 tracking-tight">
                      Active Shifts & Worker Status
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Real-time attendance & dispatch tracking
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('postings')}
                    className="text-xs font-black text-[#0B3C5D] hover:underline"
                  >
                    View All ({activeOrders.length})
                  </button>
                </div>

                <div className="space-y-3">
                  {activeOrders.map((order) => (
                    <div
                      key={order.id}
                      className="border-2 border-black rounded-2xl p-4 bg-slate-50/60 hover:bg-slate-50 transition-colors shadow-sharp-sm"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-[#0B3C5D] bg-blue-100/80 px-2 py-0.5 rounded">
                              {order.category}
                            </span>
                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                              order.status === 'On Duty'
                                ? 'bg-emerald-100 text-emerald-800'
                                : order.status === 'En Route'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-slate-200 text-slate-700'
                            }`}>
                              ● {order.status}
                            </span>
                          </div>
                          <h4 className="font-extrabold text-base text-slate-900 mt-1">
                            {order.title}
                          </h4>
                          <p className="text-xs text-slate-600 flex items-center gap-1.5 mt-0.5">
                            <MapPin className="w-3.5 h-3.5 text-[#0B3C5D]" />
                            <span>{order.location}</span>
                          </p>
                        </div>

                        <div className="text-right">
                          <span className="font-black text-lg text-[#0B3C5D]">
                            {order.wage}
                          </span>
                          <span className="text-[11px] text-slate-500 block font-semibold">
                            {order.timing}
                          </span>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 font-bold text-slate-800">
                          <div className="w-6 h-6 rounded-lg bg-[#0B3C5D] text-white flex items-center justify-center font-bold text-[10px]">
                            {order.workerName.charAt(0)}
                          </div>
                          <span>{order.workerName}</span>
                          {order.workerRating && (
                            <span className="text-amber-600 flex items-center gap-0.5 text-[11px]">
                              ⭐ {order.workerRating}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => alert(`Calling Partner ${order.workerName}...`)}
                            className="px-2.5 py-1 rounded-lg border border-black bg-white hover:bg-slate-100 font-bold text-slate-800 flex items-center gap-1 text-[11px]"
                          >
                            <PhoneCall className="w-3 h-3 text-emerald-600" />
                            <span>Call</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Live Radar Preview (5 Cols) */}
              <div className="lg:col-span-5 space-y-6">
                {/* Instant Radar Callout */}
                <div className="bg-[#0B3C5D] text-white border-2 border-black rounded-3xl p-6 shadow-sharp relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-extrabold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-full text-sky-200 flex items-center gap-1.5">
                        <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
                        <span>Live Radar Available</span>
                      </span>
                      <span className="text-xs font-bold text-amber-300">5 km Search</span>
                    </div>

                    <h3 className="text-xl font-black text-white tracking-tight leading-tight">
                      Need an Instant Replacement?
                    </h3>
                    <p className="text-xs text-sky-200 mt-1 leading-relaxed">
                      Tap below to broadcast a job request. Nearby verified sweepers, drivers, and guards get alerted with an instant audio chime!
                    </p>

                    <button
                      onClick={() => setShowPostModal(true)}
                      className="mt-5 w-full py-3.5 px-6 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm border-2 border-black shadow-sharp-sm flex items-center justify-center gap-2 transition-all"
                    >
                      <Plus className="w-4 h-4 stroke-[3]" />
                      <span>Broadcast Worker Request</span>
                    </button>
                  </div>
                </div>

                {/* Nearby Available Workers Mini-Directory */}
                <div className="bg-white border-2 border-black rounded-3xl p-6 shadow-sharp">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                    <h4 className="font-black text-base text-slate-900">
                      Nearby Available Workers
                    </h4>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Online Now
                    </span>
                  </div>

                  <div className="space-y-3">
                    {nearbyWorkers.slice(0, 3).map((w) => (
                      <div
                        key={w.id}
                        className="flex items-center justify-between p-3 rounded-2xl border border-black/15 bg-slate-50 hover:bg-slate-100 transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-10 h-10 rounded-xl ${w.avatarBg} text-white flex items-center justify-center font-black text-sm border border-black shadow-sharp-sm`}>
                            {w.name.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-1">
                              <span className="font-extrabold text-sm text-slate-900">{w.name}</span>
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            </div>
                            <span className="text-xs text-slate-500 font-bold block">
                              {w.category} • {w.distance}
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="font-black text-xs text-[#0B3C5D] block">
                            {w.hourlyRate}
                          </span>
                          <button
                            onClick={() => {
                              setPostCategory(w.category);
                              setShowPostModal(true);
                            }}
                            className="mt-1 px-2.5 py-1 rounded-lg bg-[#0B3C5D] text-white font-extrabold text-[11px] border border-black shadow-sharp-sm hover:bg-[#07263b]"
                          >
                            Hire Now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LIVE WORKER RADAR DIRECTORY */}
        {activeTab === 'hire' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Live Worker Radar Directory
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Verified blue-collar partners on duty within your 5 km radius
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1 rounded-xl flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Live GPS Active
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {nearbyWorkers.map((w) => (
                <div
                  key={w.id}
                  className="bg-white border-2 border-black rounded-3xl p-5 shadow-sharp hover:translate-y-[-2px] transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl ${w.avatarBg} text-white flex items-center justify-center font-black text-lg border-2 border-black shadow-sharp-sm`}>
                        {w.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-black text-base text-slate-900">{w.name}</h4>
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span className="text-xs font-bold text-[#0B3C5D] block">
                          {w.category} • {w.experience}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      {w.status}
                    </span>
                  </div>

                  <div className="mt-4 p-3 bg-slate-50 border border-black/10 rounded-2xl grid grid-cols-3 gap-2 text-center text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold">Proximity</span>
                      <span className="font-extrabold text-slate-900">{w.distance}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold">Rating</span>
                      <span className="font-extrabold text-amber-600">⭐ {w.rating}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-bold">Rate</span>
                      <span className="font-extrabold text-[#0B3C5D]">{w.hourlyRate}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <button
                      onClick={() => alert(`Viewing Aadhaar & Police Verification report for ${w.name}`)}
                      className="flex-1 py-2.5 rounded-xl border-2 border-black font-extrabold text-xs bg-slate-100 hover:bg-slate-200"
                    >
                      View KYC
                    </button>
                    <button
                      onClick={() => {
                        setPostCategory(w.category);
                        setShowPostModal(true);
                      }}
                      className="flex-1 py-2.5 rounded-xl border-2 border-black font-extrabold text-xs bg-[#0B3C5D] text-white hover:bg-[#07263b] shadow-sharp-sm"
                    >
                      Direct Hire
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ACTIVE SHIFTS & POSTINGS */}
        {activeTab === 'postings' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Job Shifts & Hires
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Track ongoing work, complete jobs, and release payouts
                </p>
              </div>

              <button
                onClick={() => setShowPostModal(true)}
                className="px-4 py-2.5 rounded-xl bg-[#0B3C5D] text-white font-extrabold text-xs sm:text-sm border-2 border-black shadow-sharp-sm flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Post New Shift</span>
              </button>
            </div>

            <div className="space-y-4">
              {activeOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white border-2 border-black rounded-3xl p-6 shadow-sharp"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-slate-500">{order.id}</span>
                        <span className="text-xs font-black text-[#0B3C5D] bg-blue-100 px-2.5 py-0.5 rounded-full">
                          {order.category}
                        </span>
                        <span className="text-xs font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                          {order.status}
                        </span>
                      </div>
                      <h3 className="text-lg font-black text-slate-900 mt-1">{order.title}</h3>
                      <p className="text-xs text-slate-500 mt-0.5 font-bold">
                        Location: {order.location} • Schedule: {order.timing}
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-2xl font-black text-[#0B3C5D]">{order.wage}</span>
                      <span className="text-xs text-slate-400 block font-semibold">Total Escrow Reserved</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                      <span>Assigned Partner: <strong>{order.workerName}</strong></span>
                      <span className="text-xs text-slate-500">({order.phone})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => alert(`Contacting ${order.workerName}`)}
                        className="px-4 py-2 rounded-xl border-2 border-black text-xs font-extrabold bg-slate-100 hover:bg-slate-200"
                      >
                        Contact Worker
                      </button>
                      <button
                        onClick={() => alert(`Shift verified and approved. Payout of ${order.wage} released directly to partner UPI!`)}
                        className="px-4 py-2 rounded-xl border-2 border-black text-xs font-extrabold bg-emerald-600 text-white hover:bg-emerald-700 shadow-sharp-sm"
                      >
                        Approve & Release Payout
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: BILLING & ESCROW */}
        {activeTab === 'billing' && (
          <div className="space-y-6 max-w-4xl">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Billing & Worker Escrow
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Automated daily payouts, GST invoices, and pre-funded hiring balance
              </p>
            </div>

            <div className="bg-[#0B3C5D] text-white border-2 border-black rounded-3xl p-6 sm:p-10 shadow-sharp">
              <span className="text-xs font-bold text-sky-200 uppercase tracking-wider">
                Current Employer Escrow Balance
              </span>
              <div className="text-4xl sm:text-5xl font-black tracking-tight mt-1">
                ₹15,000.00
              </div>
              <p className="text-xs text-emerald-300 font-semibold mt-2">
                Funds are held safely in escrow and automatically credited to the worker upon job completion.
              </p>

              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={() => alert('Add Funds modal simulation')}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs sm:text-sm border-2 border-black shadow-sharp-sm hover:bg-amber-300"
                >
                  + Add Escrow Funds
                </button>
                <button
                  onClick={() => alert('Downloading GST Invoices PDF...')}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/30"
                >
                  Download GST Invoices
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* POST JOB / BROADCAST MODAL */}
      <AnimatePresence>
        {showPostModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border-2 border-black rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative"
            >
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-[#0B3C5D] flex items-center justify-center font-bold">
                    <Plus className="w-4 h-4 stroke-[3]" />
                  </div>
                  <h3 className="font-black text-lg text-slate-900">
                    Request / Broadcast Worker
                  </h3>
                </div>
                <button
                  onClick={() => setShowPostModal(false)}
                  className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {broadcastSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 border-2 border-black flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  <h4 className="text-xl font-black text-slate-900">Broadcast Sent!</h4>
                  <p className="text-xs text-slate-500 font-medium max-w-xs mx-auto">
                    Alerted verified {postCategory}s in a 5 km radius. Nearby workers are receiving the incoming radar chime now!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBroadcastJob} className="space-y-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                      Worker Category Needed
                    </label>
                    <select
                      value={postCategory}
                      onChange={(e) => setPostCategory(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl border-2 border-black font-bold text-slate-900 bg-white"
                    >
                      <option value="Driver">Driver (Commercial & Personal)</option>
                      <option value="Sweeper">Sweeper / Cleaning Staff</option>
                      <option value="Security Guard">Security Guard</option>
                      <option value="Chef / Cook">Chef / Cook</option>
                      <option value="Helper">Helper / Labour</option>
                      <option value="Plumber">Plumber / Maintenance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                      Work Location / Address
                    </label>
                    <input
                      type="text"
                      value={postLocation}
                      onChange={(e) => setPostLocation(e.target.value)}
                      placeholder="e.g. Indiranagar, Bengaluru"
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black font-bold text-slate-900 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                        Wage Offer (₹)
                      </label>
                      <input
                        type="number"
                        value={postWage}
                        onChange={(e) => setPostWage(e.target.value)}
                        placeholder="500"
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black font-bold text-slate-900 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                        Duration / Shift
                      </label>
                      <input
                        type="text"
                        value={postDuration}
                        onChange={(e) => setPostDuration(e.target.value)}
                        placeholder="Full Day (8 hrs)"
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black font-bold text-slate-900 text-sm"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 border border-black/10 rounded-2xl text-xs text-[#0B3C5D] font-medium flex items-start gap-2">
                    <Radio className="w-4 h-4 text-[#0B3C5D] shrink-0 mt-0.5" />
                    <span>
                      This broadcast will alert all matching active partners within a 5 km radius on the <strong>Demand O Partner Radar</strong> instantly.
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isBroadcasting}
                    className="w-full py-4 rounded-2xl bg-[#0B3C5D] hover:bg-[#07263b] text-white font-black text-sm border-2 border-black shadow-sharp transition-all flex items-center justify-center gap-2"
                  >
                    {isBroadcasting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        Pinging Nearby Partners...
                      </span>
                    ) : (
                      <>
                        <Radio className="w-4 h-4" />
                        <span>Broadcast to Nearby Workers</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MOBILE BOTTOM NAVIGATION (EMPLOYER VIEW) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-black px-4 py-2 z-40 shadow-2xl flex items-center justify-around">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            activeTab === 'overview' ? 'text-[#0B3C5D] font-black' : 'text-slate-400 font-bold'
          }`}
        >
          <TrendingUp className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('hire')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            activeTab === 'hire' ? 'text-[#0B3C5D] font-black' : 'text-slate-400 font-bold'
          }`}
        >
          <Users className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Radar</span>
        </button>

        <button
          onClick={() => setActiveTab('postings')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            activeTab === 'postings' ? 'text-[#0B3C5D] font-black' : 'text-slate-400 font-bold'
          }`}
        >
          <Briefcase className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Shifts</span>
        </button>

        <button
          onClick={() => setActiveTab('billing')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            activeTab === 'billing' ? 'text-[#0B3C5D] font-black' : 'text-slate-400 font-bold'
          }`}
        >
          <CreditCard className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Billing</span>
        </button>

        {/* Quick Portal Switch on Mobile Nav */}
        <button
          onClick={onSwitchToPartner}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-amber-600 font-black"
        >
          <Smartphone className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Partner</span>
        </button>
      </nav>
    </div>
  );
}
